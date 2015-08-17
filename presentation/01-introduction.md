## Um dia no Node JS

![node](images/node.png)

  Thiago Dantas   
  github.com/tdantas  
  twitter.com/thiagochapa  


![node-ecosystem](images/node-ecosystem.png)
Note:  
 
  Linguagens de Programação ?

  Web Development familiarizado ?

  Experiência em Node ?


#RECAP


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


#Hoisting 


# Exercício

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
