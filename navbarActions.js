$(document).ready(function() {
//navbar hover menu
$('ul.nav li.dropdown').hover(function () {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500); //hover shows menu
}, function () {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);  //hide dropdown after hover
});
});