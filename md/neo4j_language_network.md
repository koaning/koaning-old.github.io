# neo4j advanced language graphs 

Check out the data file.

```
$ head w3c.txt
48	a	B.A.	degree	at1	nn1	nn1
56	a	B.A.	in	at1	nn1	ii
41	a	B.S.	in	at1	np1	ii
33	a	BA	in	at1	nn1	ii
28	a	babble	of	at1	nn1	io
31	a	babe	in	at1	nn1	ii
308	a	baby	and	at1	nn1	cc
70	a	baby	at	at1	nn1	ii
50	a	baby	bird	at1	nn1	nn1
47	a	baby	boomer	at1	nn1	nn1
```

This means we could run the following query 

```
MATCH (n)
OPTIONAL MATCH (n)-[r]-()
DELETE n,r;

CREATE CONSTRAINT ON (b:Bigram) ASSERT b.words IS UNIQUE;
CREATE CONSTRAINT ON (w:Word) ASSERT w.word IS UNIQUE;
CREATE CONSTRAINT ON (p:Pos) ASSERT p.pos IS UNIQUE;

USING PERIODIC COMMIT
LOAD CSV FROM
  "file:/Users/code/Downloads/xab"
  AS l
  FIELDTERMINATOR '\t'
MERGE (w1:Word {word: l[1]})
MERGE (w2:Word {word: l[2]})
MERGE (w3:Word {word: l[3]})
MERGE (pos1:Pos {type: l[4]})
MERGE (pos2:Pos {type: l[5]})
MERGE (pos3:Pos {type: l[6]})
MERGE (w1)-[:POSTYPE]->(pos1)
MERGE (w2)-[:POSTYPE]->(pos2)
MERGE (w3)-[:POSTYPE]->(pos3)

MERGE (b1:Bigram {words: l[1]+","+l[2], w1: l[1], w2: l[2]})
MERGE (b2:Bigram {words: l[2]+","+l[3], w1: l[2], w2: l[3]})

CREATE (b1)-[:FIRSTWORD]->(w1)
CREATE (b2)-[:SECONDWORD]->(w2)
CREATE (b1)-[:FIRSTWORD]->(w2)
CREATE (b2)-[:SECONDWORD]->(w3)
CREATE (b1)-[:LINK {value : toInt(l[0])}]->(b2);
```

This upload takes a while 

```
+-------------------+
| No data returned. |
+-------------------+
Nodes created: 39790
Relationships created: 217273
Properties set: 145696
Labels added: 39790
1639278 ms ~ 27 mins
```


Then these queries become very fun. 

```
match p=(b1)-[*4]->(b2) 
where b1.w1 = 'financial'
return extract( n in nodes(p) | n.w1 ) + b2.w2 as words 
limit 5;
```