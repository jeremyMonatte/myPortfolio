"use strict";
var lien;
var hauteurscroll;
var jobHeader=true;

window.addEventListener("load",function() {
    $('#load').animate({top: '200vh'}, 600);
    hauteurscroll=window.pageYOffset;
    $(window).scroll(menuApear);
    $('body a[href^="#"]').click(smoothscroll);
    $('.menuToggle,nav a').click(toggleMenu);
    menuApear();
})

function menuApear(){
    if((document.body.scrollTop || document.documentElement.scrollTop)!=0){
        $(".menuToggle").css('opacity', '1');
    }else{
        $(".menuToggle").css('opacity', '0')
    }
}

function toggleMenu(){
    $(".menuToggle").toggleClass('open');
    $("nav").toggleClass('open');
}
function smoothscroll(){
    var hreff = $(this).attr("href");
    if (hreff === '#') {
        return;
    }
    console.log($(hreff).offset().top);
    $('html, body').animate({
        scrollTop:($(hreff).offset().top)
    }, 'slow'); 
    return false;
}
