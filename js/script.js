'use strict';
//main-menu
var mainMenuBlog = document.getElementById('main-menu__blog');
var submenuBlog = document.getElementById('submenu__blog');
mainMenuBlog.addEventListener('mouseover', function(){
    submenuBlog.classList.remove("submenu_invisible");
    submenuBlog.classList.add("submenu_visible");
});
submenuBlog.addEventListener('mouseover', function(){
    submenuBlog.classList.remove("submenu_invisible");
    submenuBlog.classList.add("submenu_visible");
});
mainMenuBlog.addEventListener('mouseout', function(){
    submenuBlog.classList.remove("submenu_visible");
    submenuBlog.classList.add("submenu_invisible");
});
//slider
var arrowLeft = document.getElementById('slider-block-arrow-left');
var arrowRight = document.getElementById('slider-block-arrow-right');
var sliderRadios = document.getElementsByName('slider');

arrowLeft.addEventListener('click', function(){
    var i;
    for(i = 0; i < sliderRadios.length; i++) {
        if(sliderRadios[i].checked === true){
            break;
        }
    }
    if(i === 0) {
        sliderRadios[sliderRadios.length-1].checked = true;
    }
    else {
        sliderRadios[i - 1].checked = true;
    }
});
arrowRight.addEventListener('click', function(){
    var i;
    for(i = 0; i < sliderRadios.length; i++) {
        if(sliderRadios[i].checked === true){
            break;
        }
    }
    if((i+1) === sliderRadios.length) {
        sliderRadios[0].checked = true;
    }
    else {
        sliderRadios[i + 1].checked = true;
    }
});
