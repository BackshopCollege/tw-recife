//// shared state 
//
//var sharedVariable = 0;
//
//function inc() {
//  sharedVariable = sharedVariable + 1;
//}
//
//var loop = 100;
//while(loop--) 
//  var t1 = setTimeout(inc, Math.floor(Math.random() * 1000));
//
//var t2 = setTimeout(function(){
//  console.log(sharedVariable);
//}, 5000);

// cpu intensive  
//
//
//
//








































function slow() {
  var start = Date.now();
  while (Date.now() < start + 3e3);
}

function fast() {
  console.log('fast finished');
}

setTimeout(slow, 1000);
setTimeout(fast, 1000);















