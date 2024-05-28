/**
* PHP Email Form Validation - v3.2
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      // let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
      // if( ! action ) {
      //   displayError(thisForm, 'The form action property is not set!')
      //   return;
      // }
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      
      let formData = $("#"+ thisForm.getAttribute("id")).serializeArray();
      console.log(formData)

      if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formData.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formData);
              })
            } catch(error) {
              displayError(thisForm, error)
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        php_email_form_submit(thisForm, formData);
      }
    });
  });

  function php_email_form_submit(thisForm, formData) {
  
    let formObject = {}
    formData.forEach(
      x=>formObject.hasOwnProperty(x.name)?formObject[x.name]=[formObject[x.name],x.value].flat():formObject[x.name]=x.value
    );

    let url = "https://gm3qajl4b3agacpekadckh35240mppwj.lambda-url.ap-south-1.on.aws/"
    $.post({
      url : url,  
      data : JSON.stringify(formObject),       
      contentType: "application/json",
      }).done(function(response) {// success callback
              console.log(JSON.stringify(response))
              thisForm.querySelector('.loading').classList.remove('d-block');
              thisForm.querySelector('.sent-message').classList.add('d-block');
              thisForm.reset(); 
           
        }).fail(function( jqXHR, textStatus ) {
          let error = "Error in submitting the form"
          displayError(thisForm, error);
        })
 
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
