
function square(number, callback) {
  setTimeout(function future(){
    console.log('square of ', number);
    var result = number * number;
    return callback(null, result);
  }, 100);  
}

var numbers = [2,3,5];

map(numbers, square, function print(err, result){
  console.log(result);
});

function map(array, fnSquare, callback) {
  var length = array.length;
  var result = [];

  array.forEach(function(item, index) {
    fnSquare(item, squareResult);
    
    function squareResult(err, squareNumber){
      result[index] = squareNumber;
      length--;

      if (length === 0)
        callback(null, result);
    }
  });
}
