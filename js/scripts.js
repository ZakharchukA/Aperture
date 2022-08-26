$(document).ready(function(){
    $( function() {
        $( "#accordion" ).accordion({
            collapsible: true
        });
    } );

    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:0,
        nav:true,
        navText: [ '', ' ' ],

        responsive:{
            0:{
                items:1
            },
            
            616:{
                items:3
            },
            
            1000:{
                items:5
            }
        }
    });
});