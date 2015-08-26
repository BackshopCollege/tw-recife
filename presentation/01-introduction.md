## Um dia no Node JS

![node](images/node.png)


# Obrigado 

##Andrei Tognolo
![tw](images/thoughworks.png)  


## About me 
### Thiago Dantas   

  github.com/tdantas  
  twitter.com/thiagochapa  
  yld.io/team/thiago+dantas


## About you
![node-ecosystem](images/node-ecosystem.png)
Note:  
 
  Linguagens de Programação ?

  Web Development familiarizado ?

  Experiência em Node ?


#RECAP.JS 


### Qual o output e por quê?

```javascript
var name = 'https://www.yld.io';

function greetings() {
  if (!name) {
    var name = 'http://www.thoughtworks.com';
  }

  console.log(name);
}

greetings();
```


### Qual o output e por quê?
```javascript

function sayMyName() {
  iAm();
  return;
  
  function iAm() {
    console.log('thiago dantas');  
  }
}

sayMyName();
```


### Qual o output e por quê?

```
function whereAmIFrom() {
  city();
  country();

  var country = function() {
    console.log('Eu sou Brasileiro, entretanto vivo em Portugal');
  };

  function city() {
    console.log('Vivia em Recife e agora vivo em Lisboa');
  }
}

whereAmIFrom();
```


![question-mark](images/question-mark.png)


## Timers

````
function setTimeout(fn, ms) {}  

function sayHello() {
 console.log('hello');
}

setTimeout(sayHello, 1000);
  
  
````


 Qual o valor de sharedVariable ?

```
var sharedVariable = 0;

function inc() {
  sharedVariable = sharedVariable + 1;
}

var loop = 100;
while(loop--) 
  var t1 = setTimeout(inc, Math.floor(Math.random() * 1000));

var t2 = setTimeout(function(){
  console.log(sharedVariable); 
}, 5000);
```


## Qual o output ?

```
function slow() {
  var start = Date.now();
  while (Date.now() < start + 3e3);

  console.log('slow');
}

function fast() {
  console.log('fast');
}

setTimeout(slow, 1000);
setTimeout(fast, 1000);

```


![question-mark](images/question-mark.png)


## Qual o output ?
```
var person = {
 name: 'thiago dantas',
 age: 19,
 sayMyName: function() {
  if (!this.name)
   return console.log('there is no this in the context');

  console.log(this.name);
 }
};

 person.sayMayName(); <----------

 setTimeout(person.sayMyName, 1000); <---------

```


## Como fazer funcionar o exemplo anterior ?

Note:

```
 // bind
 setTimeout(person.sayMyName.bind(person), 1000);

```

# Exercício 1

Transformar esta funcão com uma interface sync em async

```

function getRemoteUser(id) {
 jQuery.ajax({
   url: 'http://api.somewhere.com/users/' + id,
   success: function(user) {
    
   }
 });
}

function printUser(user) {
 console.log(user);
}

var user = getRemoteUser(100);
printUser(user);

```

Exercicio 2

```
function square(number) {
  setTimeout(function() {
    return number * number;
  }, Math.floor(Math.random() * 100));
}
var numbers = [ 1, 2, 3, 4, 5];

map(numbers, square, function(err, result) {
  if (err)
    return console.error('Failed ', err);

  console.log(result); // [ 1, 4, 9, 16, 25 ]
});

```
Note:
 alterar a assinatura da square function.   
 js é single threaded ;)


#Agenda
 
 ### Manhã
 
 * Nodejs Intro
 * NodeSchool
 * Questões


#Agenda
 ### Tarde
   
 * HapiJS
 * Questões
 * BEER O'clock \0/

