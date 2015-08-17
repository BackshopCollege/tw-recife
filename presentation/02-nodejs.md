#Introdução

![node](images/node.png)


##Instalação

[Node JS](https://nodejs.org/)   
[Documentação](https://nodejs.org/api/)


## Version Manager

[NVM](https://github.com/creationix/nvm)   
[N](https://github.com/tj/n)


# O que é o Node.Js ?


## Server-side JavaScript

> Node allows you to build scalable network applications using JavaScript on the server-side.


### JavaScript: V8 Javascript engine

![V8](images/v8.jpg)


### Cross-platforma: libuv

![Libuv](images/libuv.png)


![nodejs-libuv](images/nodejs-libuv.png)


### Modelo Síncrono vs Assíncrono


## Síncrono

### Ruby / Java / Python / Rust  ...


### Síncrono
```
userId = 293;
user = User.by(userId); // 100ms
 // WAITING ....
Mailer.welcome(user);
puts 'Email Sent'
```


## Síncrono
#### Como atender múltiplas requisições em simultâneo ?


> Threads / Processos


![sincrono-model](images/sincrono.png)


## Assíncrono

```
var userId = 239;
User.by(userId, function(err, user) {
  if (err)
    return console.error(err);

  Mailer.welcome(user, console.log);
});

console.log('Email Sent');
```


![assincrono](images/assincrono.png)


## Metafora Event Loop

![garcon](images/waiter.jpg)


## Pseudo-código

```
 while(queue.waitForMessage()) {
    queue.processNextMessage();
 }
```


## Event loop Demo

  [DEMO](http://latentflip.com/loupe/)
