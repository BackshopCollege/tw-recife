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
