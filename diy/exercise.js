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


//dicas
// alterar a assinatura da square function.
// js é single threaded ;)
