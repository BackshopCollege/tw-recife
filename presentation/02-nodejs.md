#Introdução

![node](images/node.png)


![you-diy](images/you-can-read-tutorials-all-day-but-youll-only-improve-by-doing-large.jpg)
Note:
  Antes de iniciarmos, acredito que para termos um maior proveito de hoje, vamos tentar ao maximo fazer/sentir como as coisas funcionam ao inves de estarmos o dia todo sentado e assistindo. Ok ?


##Instalação

[Node JS](https://nodejs.org/)   
[Documentação](https://nodejs.org/api/)


## Version Manager

[NVM](https://github.com/creationix/nvm)   
[N](https://github.com/tj/n)


# O que é o Node.Js ?


## Javascript no lado do Servidor

> Node allows you to build scalable network applications using JavaScript on the server-side.


### JavaScript: V8 Javascript engine

![V8](images/v8.jpg)


### Cross-platforma: libuv

![Libuv](images/libuv.png)


![nodejs-libuv](images/nodejs-libuv.png)


### Modelo Síncrono vs Assíncrono


## Síncrono

### Ruby / Java / Python  ....


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

#### Bate e Volta

```
function webService(id) {
  setTimeout(function(){
    var body = 'webService response payload ' + id;
    return body;
  }, 1000);
}

var response = webService(100);
console.log(response);
```


## Real World
```
var userId = 239;
User.by(userId, function(err, user) {
  if (err)
    return console.error(err);

  Mailer.welcome(user, console.log);
});

console.log('Email Sent');
```

Note:
  - Numa função asincrona ( AJAX por exemplo ) 
  como recuperamos o valor da chamada ? 
  No sincrono sabemos que o 'return' faz este papel.


## Metáfora Event Loop

![garcon](images/waiter.jpg)


## Fluxo de Trabalho

* Cliente chega ao restaurante e senta em uma mesa.
* O Garçom atende apenas uma vez por vez.
* O Garçom recolhe o pedido e leva o pedido a cozinha.
* Quando o Pedido está pronto, a cozinha toca o sino. Quando o Garçom estiver livre, pega o pedido e leva a respectiva mesa.


![assincrono](images/assincrono.png)


## Pseudo-código

```
 while(queue.waitForMessage()) {
    queue.processNextMessage();
 }
```

Note:
  Event Loop é o modelo de concorrencia do JS.   
  Podemos pensar como se todo nosso codigo fosse implicitamente sincronizado.   

  Actor Model Analogia

  - Apresentar o codigo de Single Threaded


 Qual o sistema de modulos que JS possui ?


## JS não tem um built-in module system
   ##### Workaround da Comunidade

* CommonJS
* Asynchronous Module Definition (AMD)


### Node Module System
![commonJS](images/commonjs.jpg)


## Let's
![do-it](images/do-it.jpg)

<<<<<<< HEAD

=======
>>>>>>> update slide
 - repl
 - command line arguments
 - ler um ficheiro
 - criando um módulo
 - downloading módulos externos ( npm )
  - install
  - criando package.json ( init )
  - install versão especifica
  - install github
  - install dev dependencies
 - contar linhas de um ficheiro grande
 - raw HTTP server


 ![nodeschool](images/nodeschool.png)


## Instalação
 
 ```
  $ npm install -g learnyounode
  $ learnyounode
 ```
