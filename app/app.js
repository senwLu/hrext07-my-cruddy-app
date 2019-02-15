/*
Init app
interact with DOM
interact with localstorage

 */


$(document).ready(function(){

  // setup factory password
  // if key does not have password, yet password as key and value as 12345
  if(!localStorage.getItem('password')) {
    localStorage.setItem('password', 12345);
  }

  if(!localStorage.getItem('lockChecker')) {
    localStorage.setItem('lockChecker', false);
  }
  

  var keys_LS = Object.keys(localStorage);

  generateList();


  $('.btn-add').on('click', function(){
    var valueData = $('.input-data').val();

    if(valueData.length === 0 || valueData === " ") {
      console.log('Input something');
    }else {
      var keyData = Math.floor(Math.random() * (100 - 1)) + 1; 

      while(keyData.toString() == localStorage.getItem(keyData.toString())){
        var keyData = Math.floor(Math.random() * (100 - 1)) + 1; 
      }
  
      // write to db
      localStorage.setItem(keyData, valueData);
  
      $('.container-data').append('<div class="display-data-item">'+valueData+'</div>');
    }

  });

  // click to lock user from seeing data
  $('.lock').click(function() {
      if($('.container-form').css('display') == 'none') {
        $('.container-form').show();
        $('.lock').text('Lock Data');
        generateList();
      }else {
        $('.container-form').hide();
        // clear out divs in data container so can't view from console during lock
        $('.container-data').text('');
        $('.lock').text('Unlock Data');
      }
  })

  // delete all data and rest password to "factory" setting
  $('.btn-clear').click(function(){
    localStorage.clear();
    $('.container-data').text('');
    localStorage.setItem('password', 12345);
    localStorage.setItem('lockChecker', false);
  });

  function generateList() {
    if(keys_LS.length !== 1){
      for(var i=0; i < keys_LS.length; i++) {
        if(keys_LS[i] !== 'password' && keys_LS[i] !== 'lockChecker' ) {
          $('.container-data').append('<div class="display-data-item" data-keyValue="'+ keys_LS[i] +'">' + localStorage[keys_LS[i]] + '</div>');
        }
      }
    }
  }

});