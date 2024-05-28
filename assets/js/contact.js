// $(function () {
//     $("#contact-form").su(function(e){
//       e.preventDefault()
//       formData = $("#contact-form").serializeArray()
//       let formObject = {}
//       formData.forEach(
//         x=>formObject.hasOwnProperty(x.name)?formObject[x.name]=[formObject[x.name],x.value].flat():formObject[x.name]=x.value
//       );

//         url = "https://gm3qajl4b3agacpekadckh35240mppwj.lambda-url.ap-south-1.on.aws/"
//         console.log(formObject)
//         $.post({
//         url : url,  
//         data : JSON.stringify(formObject),       
//         contentType: "application/json",
//         }).done(function(response) {// success callback
//                   $(".sent-message").text(JSON.stringify(response));
//           })
//      })
//   });