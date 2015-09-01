![hapi](images/hapi.png)


![because](images/because-im-happy.jpg)


##  Quem utiliza o Hapi.JS ?

![walmart](images/logo-walmart.svg)
![paypal](images/logo-paypal.png)
![npm](images/logo-npm.png)
![auth0](images/logo-auth0.png)
![andYet](images/logo-andyet.png)

... 


![npm-newww](images/npm-newww.png)


# agenda

  Hands On

  * Rotas
  * Validação/Contrato endpoint
  * Server Methods
  * Exercícios


### Rotas

```
$ mkdir routing
$ cd routing
$ npm init .
$ <YOUR_EDITOR> index.js
```

Note:

<span style='font-size=9px;'>
```
 lets create our very first hapi server with one route 
```
</span>


Uma Rota de boas-vindas

```
var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply('Welcome'); 
  }
});

server.start(function() {
  console.log('Server Started', server.info.port);
});

```

Note:
<span style='font-size=9px;'>
```
 Questions ?   
 Great! now lets see how to reply with a custom header, statusCode, content-type and return JSON Data   

 -> The Reply returns a Response Object that has some methods like   
  code | header | type    

 - (me) After presenting the reply response, show in chain mode
  reply('welcome')  
   .code(201)  
   .type('application/json')  
   .header('x-track-token', 'track-12343');  

  btw: if you return on the reply function an object or array, the hapi will send a json representation of that object.   

  reply({ msg: 'welcome'});

```
</span>


  Custom Header, Status Code and Content-Type

```
 ...
server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    var response = reply('Welcome');

    response.code(201);
    response.header('kf-track-token', 'track-12839948');
    response.type('application/json');
  }
});
 ...
```

Note:
<span style='font-size=9px;'>
``` 
 awesome! 

 Now, how we get the data from query-string, path params and payload   
 now, lets suppose that our url is something like this   
  http://localhost:3000/search?q=facebook   
  
  How we could capture the q from the query string in our handler ?  

  just one thing:   
  Everuthing that comes from the user-agent/browser/client will be bounded to the request object, and everything that I want to send to the user, I have to use the reply object.   

  The request object has a property called query. request.query.   
  every query-string value will be bounded to request.query

```
</span>


 Capturing Query String 

```
...
server.route({
  method: 'GET',
  path: '/search',
  handler: function(request, reply) {
    var query = request.query;
    var q = query.q;
    
    if (!q) 
      return reply([]);

    return reply([q]);
  }
});
...
```

Note:
<span style='font-size=9px;'>

```
    Any question ?      

    Ok, so lets continue.

    on restfull applications it is quite common we pass the resource id on the paths   
    for instance: when we are going to update some user or retrieve user information, the path would be /users/{userId}   

    How capture the params from our path ?  

```
</span>


http://api.your-domain.com.br/users/179


http://api.your-domain.com.br/users/<span style='color:white'>179</span>  

note:
  Again, everything that comes from the user-agent/client   
  we have to verify the request object. 


Capturando paramentros da rota

<span style='font-size=9px;'>
```
...

function showUser(request, reply) {
  var params = request.params;
  var userId = params.userId;
  
  reply(userId);
}

server.route({
  method: 'GET',
  path: '/users/{userId}',
  handler: showUser
});

...
```
</span>

Note:

<span style='font-size=9px;'>
```
 Questions ?  

 lets add some spicy on the soup  
 Now we have to implement a simple business rule.  
 
 Create User
  POST /users

   request:
    method: POST
    content-type: application/json
    payload: { name: <name> }
     - name is required *
   
   response:
    fail: 
      status code: 400
      content-type: application/json
      payload: error message

    success:
     status code: 201
     content-type: application/json
     payload: 
      { name: <name> , id: <id> }
```
</span>


## Regra de Negócio

  O Gestor do produto diz:  
  Eu quero ser capaz de <span style='color: red;'>criar usuários</span> utilizando a api web.


SPEC

```
   request:
    path: '/users'
    method: POST
    content-type: application/json
    payload: { name: <name> }
     - name is required *
   
   response:
    invalid payload: 
      status code: 400
      content-type: application/json
      payload: < error message >

    invalid content-type
      status code: 415
      content-type application/json

    success:
     status code: 201
     content-type: application/json
     payload: 
      { name: <name> , id: <id> }
```

Note:
<span style='font-size=5px;'>
```
---> do not forget to change the show users to retrieve from memory database   
...   
var userDatabase = [];   

server.route({   
  method: 'POST',   
  path: '/users',   
  handler: function(request, reply) {   
     var contentType = request.headers['content-type'];  
     if (contentType !== 'application/json')   
      return reply().code(415).type('application.json'); // unsuported media type   

    var payload = request.payload;    
    if (!payload.name)   
      return reply('Name is required').code(400).type('application/json');   

    var id = Date.now();   
    var user = { name: payload.name, id: id };   

    userDatabase.push(user);   
    reply(user).code(201);   
  }
});     
---------------- SHOW HANDLER    ------------

  var user;  
  userDatabase.forEach(function(_user) {  
      if (_user.id === Number(userId)) {   
          user = _user;   
          return;   
      }   
     });    
...
``` 
</span>


## Solução

```
var userDatabase = [];   

server.route({   
  method: 'POST',   
  path: '/users',   
  handler: function(request, reply) {   
     var contentType = request.headers['content-type'];  
     if (contentType !== 'application/json')   
      return reply().code(415).type('application/json');   

    var payload = request.payload;    
    if (!payload.name)   
      return reply('Name is required').code(400).type('application/json');   

    var id = Date.now();   
    var user = { name: payload.name, id: id };   

    userDatabase.push(user);   
    reply(user).code(201);   
  }
});     
```

Note:
```
  questions ?   
  But wait, that solution is too cumbersome, could we do it better ?   

  YES , we can .. ! let me show you guys.   
  ---- open the code and lets replace line by line.   

  1) 
    How HAPI help us to avoid do this content-type validation ?  
      if (contentType !=== 'application/json')   
      there is one hapi configuration to allow specifics mime-type to the payload.   
      config: { payload: { allow: [] }  }   

  Great !!   
  2) There is any configuration to validate the payload contract ?   
   YES !!! Such amazing !   
    before going to the payload validation, lets dive into the JOI module.   
   
    The Joi Module (https://github.com/hapijs/joi) is a schema validator to js objects   
    Lets do some examples to you guys get the idea.  
    
     var john = { age: 13 };  
     var doe =  { age: 3 };  
     var james = { age: 'c' };  

     var schema = Joi.object({  
       age: Joi.number().max(20).min(5).required()  
     });  

     Joi.validate(mary, schema, function(err, objectValidated){  
       if (err)  
         return console.log(' is not valid', err.details);  

       console.log(' is valid', objectValidated);  
     });  
  
```


## Solução II

```
function createUser(request, reply) {
  var payload = request.payload;
  var id = Date.now();
  var user = { name: payload.name, id: id };

  userDatabase.push(user);
  reply(user).code(201);
}

server.route({
  method: 'POST',
  path: '/users',
  handler: createUser,
  config: {
    payload: {
      allow: [ 'application/json' ]
    },
    validate: {
      payload: {
        name: Joi.string().required()
      }
    }
  }
});
```


# Server Methods

 Um excelente candidato para colocarmos nossas regras de negócio

note:
```
 placing your business logic into a server methods make easier to share between your handlers.  
 lets take the previous example and translate to a server method.   
  
 server.method('users.create', function(name, callback) {  
    var id = Date.now(); //create an Unique User ID  
    var user = { name: name, id: id }; // build an user object  
    userDatabase.push(user); // save the user  

    return callback(null, user);  
  });  

  server.method('users.show', function(userId, callback) {  
    var user;  
    userDatabase.forEach(function(_user) {   
      if ( _user.id === Number(userId)) {   
        user = _user;   
        return;  
      }  
    });   
  
  return callback(null, user);  
  });  

```  


# Server method

Ao utilizarmos SM, ganhamos o poder de fazer caching out-of-the-box

note:
```
 it is very easy to add cache to our service layer using server methods.  
 ok lets do it !   

  server.method('add', function(a,b, callback) {   
    setTimeout(function() {  
      console.log('ADDD FUNCTION');  
      callback(null, a + b);  
    }, 300);  
  }, { cache: { expiresIn: 60000 } });  
```


## Tests


![bart-tests](images/bart-tests.png)


## Helpers

![lab](images/lab.png)  
![chai](images/chai.png)

Note:
var Lab = require('lab');  
var assert =  require('chai').assert;  
var lab = exports.lab = Lab.script();  

var describe = lab.describe;  
var it = lab.it;  
var before = lab.before;  
var after = lab.after;  
var beforeEach = lab.beforeEach;  
server.inject({ 
  method: 'POST', 
  url: '/url',
  payload: { name: 'thiago' },
  headers: { 'x-custom': 'thiago' }
 }), verify);

