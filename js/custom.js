$(document).ready(function () {
    $('li.parent').hover(function () {
        if ($(this).find('> ul').css('display') == "none") {
            $(this).find('> ul').slideDown(200);
            slide = true;
        }
    }, function () {
        if (slide == true) {
            $(this).find('> ul').slideUp();
            slide = false;
        }
    });
    $('nav strong').click(function () {
        $('nav ul').toggle();
    });


    $('button#subscribe').click(function(event){
        addy = $("#email").val();

        var request = $.ajax({
          url: "https://api.airtable.com/v0/appAxSg65jNgWhQln/Signups",
          beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer keyqXy9wVseyd2L6S");
          },
          type: "POST",
          processData: false,
          data: '{"fields": {"EmailAddress": "'+addy+'"}}',
          contentType: "application/json",
          dataType: "json"
        });
        request.done(function( msg ) {            
            $("#connectResponse").text("Thanks, " + addy + "! I got your email and will be in touch!"); 
            $("#email").val('');
            console.log(request);
            console.log(msg);
        });
         
        request.fail(function( jqXHR, textStatus ) {
          console.log(request);
          console.log(textStatus);
          console.log(jqXHR);
          //alert( "Request failed: " + textStatus );
          $("#connectResponse").text("Shucks!  Looks like there was an error. Can you please email me instead?"); 
          $("#email").val('');
        });

        event.preventDefault();
    });
});