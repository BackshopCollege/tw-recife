function webService(id) {
  // simulando um pedido ao webservice xyz
  setTimeout(function(){
    var body = 'webService response payload ' + id;
    return body;
  }, 1000);
}

var response = webService(100);
console.log(response);
