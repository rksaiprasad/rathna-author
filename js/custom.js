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
          url: "http://author-backend.herokuapp.com/author_methods/subscribe",
          method: "POST",
          data: { author_method : addy },
          dataType: "json"
        });
        
        request.done(function( msg ) {            
            $("#connectResponse").text("Thanks, " + addy + "! I got your email and will be in touch!"); 
            $("#email").val('');
        });
         
        request.fail(function( jqXHR, textStatus ) {
          //alert( "Request failed: " + textStatus );
          $("#connectResponse").text("Thanks so much, " + addy + "! I got your email and will be in touch."); 
          $("#email").val('');
        });

        event.preventDefault();
    });
});