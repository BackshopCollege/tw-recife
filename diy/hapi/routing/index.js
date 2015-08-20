var Hapi = require('hapi');
var Joi = require('joi');

var server = new Hapi.Server({});

server.connection({
  host: 'localhost',
  port: 8000
});

server.route({
  method: 'GET',
  path:'/',
  handler: function(request, reply) {
    reply('hello world');
  }
});

server.route({
  method: 'GET',
  path:'/json',
  handler: function(request, reply) {
    reply({ msg: 'welcome KF crew' });
  }
});

server.route({
  method: 'GET',
  path: '/kf/{name}',
  handler: function(request, reply) {
    reply('Hello: ' + request.params.name);
  }
});

server.route({
  method: 'GET',
  path: '/search',
  handler: function(request, reply) {
    var term = request.query.term;
    reply({
      q: request.query,
      results: [ 'Your Term was: ' + term ]
    });
  }
});

/*
 * Valid Request
 * curl -H "Content-Type: application/json" -X POST -d '{"name":"yld kf training"}' http://localhost:8000/users
 *
 * Invalid Request ( without name )
 * curl -D- -H "Content-Type: application/json" -X POST -d '{"noNameField":"yld kf training"}' http://localhost:8000/users
 *
 * Invalid Content Type
 * curl -D- -H "Content-Type: application/xml" -X POST -d '{"namex":"yld kf training"}' http://localhost:8000/users
 *
 */

var userDatabase = [];
function uuid() {
  return Math.random().toString(36).substring(2);
}

server.route({
  method: 'POST',
  path: '/users',
  config:{
    payload: {
      allow: 'application/json'
    }
  },
  handler: function(request, reply) {
    var payload = request.payload;

    if (!payload.name)
      return reply('name is required').code(400);

    var user = { id: uuid(), name: payload.name };
    userDatabase.push(user);

    reply(user);
  }
});

/*
 *  Using Joi to validate complex payload out of the box.
 *
 *  Valid Request
 *  curl -D- -XPOST -H 'Content-Type: application/json' -d '{ "name": "kf", "email": "kf@domain.com" }'
 *
 *  Invalid Email
 *  curl -D- -XPOST -H 'Content-Type: application/json' -d '{ "name": "kf", "email": "kfdomain.com" }' localhost:8000/account
 */
server.route({
  method: 'POST',
  path: '/account',
  handler: function(request, reply) {
    var payload = request.payload;
    reply().code(201);
  },
  config: {
    validate: {
      payload: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        description: Joi.string()
      })
    }
  }
});

/*
 * https://github.com/hapijs/hapi-auth-basic
 *
 */

var BasicAuth = require('hapi-auth-basic');
var USERNAME = 'kf';
var PASSWORD = 'secret';

function validate(username, password, callback) {
  // fetch  user by username
  if (username !== USERNAME  || password !== PASSWORD)
    return callback(null, false);

  callback(null, true, { name: username });
}

/*
 *  Valid Authentication
 * curl --user kf:secret -H 'Content-Type: application/json' localhost:8000/restricted
 * */

var lout = require('lout');

server.register([ BasicAuth, { register: lout } ], function(err) {
  if (err)
    throw err;

  /*
   * strategy name - the name that we are going to use when we define our route
   * scheme name - the scheme name ( must match with the scheme defined by  hapi-auth-basic module
   * options  - options passed to hapi-basic-auth
   * */

  server.auth.strategy('simple', 'basic', { validateFunc: validate });
  server.route({
    method:'GET',
    path: '/restricted',
    config: {
      auth: 'simple' // <--------- must match the strategy name defined above
    },
    handler: function(request, reply) {
      var user = request.auth.credentials;
      reply('Welcome back ' +  user.name);
    }
  });
});

server.start(function() {

  console.info("Server started!");

  console.info("ADDRESS:", server.info.address);
  console.info("PROTOCOL:", server.info.protocol);

  console.info("PORT:", server.info.port);
  console.info("HOST:", server.info.host);
  console.info("URL:", server.info.uri);
});
