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

  if(!localStorage.getItem('isLocked')) {
    localStorage.setItem('isLocked', false);
  }

  if(localStorage.getItem('isLocked') === "true") {
    $('.container-form').hide();
    $('.container-form-password').show();
    // clear out divs in data container so can't view from console during lock
    $('.container-data').text('');
    $('.lock').text('Enter Password to Unlock Data');
  }else {
    $('.container-form-password').hide();
    generateList();
  }

  $('.pwd-submit').click(function() {
    var input_pwd = $('.input-pwd').val();

    if(localStorage.getItem('password') === input_pwd) {
      localStorage.setItem('isLocked', false);
      $('.container-data').text('');
      $('.container-form').show();
      $('.container-form-password').hide();
      $('.input-pwd').val('');
      $('.lock').text('Lock Data');
      generateList();
    }else {
      $('.input-pwd').val('');
      $('.container-data').html('Password is incorrect!');
    }
  });

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
  
      $('.container-data').append('<div class="display-data-item" data-keyValue="' + keyData + '">'+valueData+'</div>');
    }
  });

  $('.btn-delete').click(function() {  
    $(this).parent().remove();
    var targetKey = $(this).closest('div').find('.display-data-item').attr('data-keyValue');
    localStorage.removeItem(targetKey);
  })

  // click to lock user from seeing data
  $('.lock').click(function() {
      if($('.container-form').css('display') !== 'none')  {
        localStorage.setItem('isLocked', true);
        $('.container-form').hide();
        $('.container-form-password').show();
        // clear out divs in data container so can't view from console during lock
        $('.container-data').text('');
        $('.lock').text('Enter Password to Unlock Data');
      }
  });

  // delete all data and rest password to "factory" setting
  $('.btn-clear').click(function(){
    localStorage.clear();
    $('.container-data').text('');
    localStorage.setItem('password', 12345);
    localStorage.setItem('isLocked', false);
  });


  // function for generating list of data from localStorage
  function generateList() {
    var keys_LS = Object.keys(localStorage);

    if(keys_LS.length !== 1){
      for(var i=0; i < keys_LS.length; i++) {
        if(keys_LS[i] !== 'password' && keys_LS[i] !== 'isLocked' ) {
          $('.container-data').
            append('<div class="value-box">' + 
                      '<div class="display-data-item" data-keyValue="'+ keys_LS[i] +'">' + localStorage[keys_LS[i]] + '</div>' + 
                      '<button class="btn btn-danger btn-delete">Delete</button>' + 
                    '</div>');
        }           
      }
    }
  }

});