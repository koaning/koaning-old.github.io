
# Neo4j Language Network

So lets do something fun with big graphs. We are going to do a quick install of neo4j. We will then create a graph of the most common bigrams in the english language and perform some queries on it. 

> If you don't know what neo4j is, it is a graph database. It acts like a database in the sense that you can query it but the underlying datastructure is not a table or a document store but a graph. More information [here](http://neo4j.org/learn). 

This document is intended both as a bare minimum introduction on cypher, the neo4j query language as well as an introduction to bigram analysis. In this document I only assume that you know what a graph is and that you know what a database is.  

# What we will make. 

In reality we will make the following in a database, but essentially the database will represent an object that can be modelled as a graph like below. 

In this graph a node represents a word and a link represents a bigram. A sentence can then be represented through a path over the network. The likeliness of a sentence could be calculated by keeping the likelihood of individual bigrams in mind. We will explore the boundaries of using such a network as a language model in neo4j. 

# Setup 

### Neo4j Setup

1. Go to neo4j.org and press the big download button.
2. Unzip contents to a folder and cd to it via terminal.
3. From the folder you just unzipped, type:

 ```➜  ./bin/neo4j start```
 
 This will start the neo4j server from the ```bin``` folder.  
 
4. Now that the server has started you can type ```localhost:7474``` in your webbrowser to confirm that the neo4j server has been successfully set up. 

### Download Bigrams  

1. Go to [http://www.ngrams.info](http://www.ngrams.info) and download 1000000 non case sensitive bigrams found. 
2. Unzip this file and check that the file contains the following first lines; 

```
➜  head -15 w2.txt
275	a	a
31	a	aaa
29	a	all
45	a	an
192	a	and
39	a	another
25	a	at
82	a	b
45	a	b+
26	a	b-17
31	a	b-2
54	a	b-52
39	a	b-movie
40	a	b-plus
168	a	b.a
```

The ```w2.txt``` file contains a tab seperated file that has three columns; the frequency of the bigram, the first word and the second word. We will use this file to contruct a tree. 

### Upload data to Neo 

##### 1. Start the neo4j shell by typing: 

```
➜  ./bin/neo4j-shell
Welcome to the Neo4j Shell! Enter 'help' for a list of commands
NOTE: Remote Neo4j graph database service 'shell' at port 1337

neo4j-sh (?)$
```

##### 2. Pass the following import script into the shell. 

Copy and paste the following snippet. 

```
CREATE CONSTRAINT ON (w:Word) ASSERT w.value IS UNIQUE;
USING PERIODIC COMMIT
LOAD CSV FROM
  "file:/Users/code/Downloads/w2.txt"
  AS line
  FIELDTERMINATOR '\t'
MERGE (w1:Word { value: toString(line[1]) })
MERGE (w2:Word { value: toString(line[2]) })
CREATE (w1)-[:LINK { value : toInt(line[0])} ]->(w2);
```
This is not a cheap operation. I have the latest macbook and it takes about 2-3 minutes to load. Be humble though, we've just uploaded most of the english language in our little local database. 

# Cypher 

Cypher is the query language that Neo4j uses. It will feel familiar to SQL but more flexible. For more info, check the [syntax reference](http://docs.neo4j.org/refcard/1.9/).

All of the queries below can be passed in either the neo4j console or the localhost:7474 website you already opened. 

### Basic Queries 

These queries will look for a node in the network that is connected to another node. We can add ```where``` statements to only consider certain nodes or edges in the graph. In effect these queries look for bigrams. 

##### Find 10 bigrams that start with "a"
```
match (w1)-[l1]->(w2) 
where w1.value='a' 
return w1,l1,w2 
limit 10;
```

##### Find 10 bigrams that start with "zoo"
```
match (w1)-[l1]->(w2) 
where w1.value='zoo' 
return w1,l1,w2 
limit 10;
```

##### Find 10 bigrams that don't start with "a" and have a frequency that is larger than 35000
```
match (w1)-[l1]->(w2) 
where l1.value>35000 and NOT w1.value = 'a'
return w1,l1,w2 
limit 20;
```
### Basic Queries 

##### Find the most frequently used bigrams
```
match (w1:Word)-[l1]->(w2:Word) 
return w1.value,w2.value
order by l1.value descending
limit 20;
```
###### Output:

```
+---------------------+
| w1.value | w2.value |
+---------------------+
| "of"     | "the"    |
| "in"     | "the"    |
| "to"     | "the"    |
| "on"     | "the"    |
| "and"    | "the"    |
| "to"     | "be"     |
| "at"     | "the"    |
| "for"    | "the"    |
| "in"     | "a"      |
| "do"     | "n't"    |
| "with"   | "the"    |
| "from"   | "the"    |
| "it"     | "was"    |
| "of"     | "a"      |
| "that"   | "the"    |
| "as"     | "a"      |
| "is"     | "a"      |
| "going"  | "to"     |
| "by"     | "the"    |
| "and"    | "i"      |
+---------------------+
20 rows
3510 ms
```
The output seems logical as all the bigrams seem like common constructs in a sentence. 

##### Find the least common bigrams
```
match (w1:Word)-[l1]->(w2:Word) 
return w1.value,l1.value, w2.value
order by l1.value ascending
limit 20;
```
###### Output:

```
+------------------------------------------+
| w1.value | l1.value | w2.value           |
+------------------------------------------+
| "a"      | 23       | "zucchini"         |
| "a"      | 23       | "zit"              |
| "a"      | 23       | "year-to-year"     |
| "a"      | 23       | "yeoman"           |
| "a"      | 23       | "zinger"           |
| "a"      | 23       | "wetsuit"          |
| "a"      | 23       | "whetstone"        |
| "a"      | 23       | "white-owned"      |
| "a"      | 23       | "woefully"         |
| "a"      | 23       | "wrecker"          |
| "a"      | 23       | "vp"               |
| "a"      | 23       | "w"                |
| "a"      | 23       | "warmonger"        |
| "a"      | 23       | "washed"           |
| "a"      | 23       | "washerwoman"      |
| "a"      | 23       | "water-soluble"    |
| "a"      | 23       | "wealthier"        |
| "a"      | 23       | "week-old"         |
| "a"      | 23       | "well-constructed" |
| "a"      | 23       | "westward"         |
+------------------------------------------+
20 rows
3250 ms
```

The output seems pausible enough. It might seem slightly suspisious that all these links have a value of 23 but we need to keep in mind that we don't have all bigrams but that we have the top 1000000 bigrams. 


##### Find the least common words

```
match p = (w1:Word)-[*1..5]->(w2:Word)
where w2.value='fence' 
return extract( n in nodes(p) | n.value ) 
limit 20;
```


