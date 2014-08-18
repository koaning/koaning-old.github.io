# Place All The Holders 

When designing a webpage it is actually quite common that you need assets while you are doing your desig

#### Pictures 

placekitten.com 
placebear.com 
placeape.com
placebee.co.uk 
baconmockup.com 
placehold.it
placebox.es
placeskull.com 
fillmurray.com 

#### Texts 

http://ipsum-generators.com/
http://slipsum.com/
http://startupipsum.io/

### Videos 

### People 

Yes, people ipsums also exist. If you want to mimic users in a database or interaction on a commenting system, having a person placeholder might be useful. 

##### randomuser.me 

Here you can generate a list of random users. 

###### request 

```
$.ajax({
  url: 'http://api.randomuser.me/',
  dataType: 'json',
  success: function(data){
    console.log(data);
  }
});
```

###### result 

```
{
  "results": [
    {
      "user": {
        "gender": "female",
        "name": {
          "title": "ms",
          "first": "carla",
          "last": "washington"
        },
        "location": {
          "street": "5475 wheeler ridge dr",
          "city": "dayton",
          "state": "kansas",
          "zip": "66155"
        },
        "email": "carla.washington59@example.com",
        "username": "crazyladybug464",
        "password": "chevy",
        "salt": "ksgF7gzq",
        "md5": "3ae21e2d596777b9b0de52cc3fddc332",
        "sha1": "01c61edb0ac3fbc59e9daac53d39592b497dbba2",
        "sha256": "d0c51a4a5673c9f7d5fb01ed0f797d81b4b823b64c8e2c4f3947209be273da9c",
        "registered": "1036101125",
        "dob": "226640461",
        "phone": "(680)-238-3856",
        "cell": "(715)-534-4126",
        "SSN": "206-70-8054",
        "picture": "http://api.randomuser.me/portraits/women/61.jpg"
      },
      "seed": "6c4bda7f54ab5d5",
      "version": "0.4"
    }
  ]
}
```

Note that the API will even supply a link to some pictures. Here is a small list. 

<img height="100" width="100" src="http://api.randomuser.me/portraits/men/1.jpg">
<img height="100" width="100" src="http://api.randomuser.me/portraits/men/2.jpg">
<img height="100" width="100" src="http://api.randomuser.me/portraits/men/3.jpg">
<img height="100" width="100" src="http://api.randomuser.me/portraits/men/4.jpg">
<img height="100" width="100" src="http://api.randomuser.me/portraits/men/5.jpg">
<br> 
<img height="100" width="100" src="http://api.randomuser.me/portraits/women/1.jpg">
<img height="100" width="100" src="http://api.randomuser.me/portraits/women/2.jpg">
<img height="100" width="100" src="http://api.randomuser.me/portraits/women/3.jpg">
<img height="100" width="100" src="http://api.randomuser.me/portraits/women/4.jpg">
<img height="100" width="100" src="http://api.randomuser.me/portraits/women/5.jpg">

###### fakenamegenerator.com 

This site does not offer an API but they do offer a service that can be parsed easiliy with a scraper. It is actually slightly scary to see to what level of detail this service will create a user for you. They cover age, nationality, email, credit card, social security numbers and occupation. 

