// shared state 

var sharedVariable = 0;

function inc() {
  sharedVariable = sharedVariable + 1;
}

var loop = 100;
while(loop--) 
  setTimeout(inc, 1000);

setTimeout(function(){
  console.log(sharedVariable);
}, 1000);


// cpu intensive  
//function slow() {
//  var start = Date.now();
//  while (Date.now() < start + 3e3);
//}
//
//function fast() {
//  console.log('fast finished');
//}
//
//setTimeout(slow, 1e3);
//setTimeout(fast, 1e3);
