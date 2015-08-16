function square(number, callback) {
  setTimeout(function() {
    callback(null, number * number);
  }, Math.floor(Math.random() * 100));
}
var numbers = [ 1, 2, 3, 4, 5];

map(numbers, square, function(err, result) {
  if (err)
    return console.error('Failed ', err);

  console.log(result); // [ 1, 4, 9, 16, 25 ]
});

function map(array, mapFn, callback) {
  var length = array.length;
  var result = [];

  array.forEach(function(item, index) {
    mapFn(item, iteratorFn);
    
    function iteratorFn(err, squareNumber){
      if (err) {
        callback(err);
        callback = function() {};
        return;
      }
      
      result[index] = squareNumber;
      length--;

      if (length === 0)
        callback(null, result);
    }
  });
}
