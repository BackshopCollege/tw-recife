var fs = require('fs');

var fileStream = fs.createReadStream('./big.txt', { encoding: 'utf8' });

var line = 0;
fileStream.on('data', function(data) {
  line = line + data.split('\n').length - 1;
});

fileStream.on('end', function(){
  console.log('Numero de linhas ', line); 
});


