var EventEmitter = require('events').EventEmitter;

var Server = new EventEmitter();

Server.on('connection', handlerConnection);
Server.on('disconnect', closeConnection);

function handlerConnection(){
  console.log('New Connection');

  setTimeout(function(){
    Server.emit('disconnect');
  }, 4000);
}

function closeConnection(){
  console.log('disconnecting');
}

Server.emit('connection');
