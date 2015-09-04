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
  * Caching
  * Tests
  * Exercícios


### Rotas

```
$ mkdir web
$ cd web
$ npm init .
$ <YOUR_EDITOR> index.js
```


Uma Rota de boas-vindas

```
var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
  method: 'GET',
  path: '/ola',
  handler: function(request, reply) {
    reply('oi'); 
  }
});

server.start(function() {
  console.log('Server Started', server.info.port);
});

```


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


http://api.your-domain.com.br/users/179/show


http://api.your-domain.com.br/users/<span style='color:white'>179</span>/show  


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


## Solução

```

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

    reply(user).code(201);   
  }
});     
```


## Solução II

```
function createUser(request, reply) {
  var payload = request.payload;
  var id = Date.now();
  var user = { name: payload.name, id: id };
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

 Um excelente candidato para colocarmos nossas regras de negócio com o poder da cache


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

