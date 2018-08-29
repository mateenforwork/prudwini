

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "../connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/*
document.getElementsByClassName('fb-share-button').onclick = function() {
	console.log("clicked");
	
  FB.ui({
    method: 'share',
    display: 'popup',
    href: 'window.location.href',
  }, function(response){});
}
*/

var url = window.location.href;
var type = $('meta[name=category]').attr("content");	

	
if(type == 'health_and_wellness'){
	$('#header-healthandwellness').addClass('active');
} 

else if(url.indexOf('category=health_and_wellness') > 0){
	$('#header-healthandwellness').addClass('active');
} 
	
else if(url.indexOf('subcategory=') > 0){
	$('#header-healthandwellness').addClass('active');
} 
	
else if(type == 'benefits_and_coverage'){
	$('#header-benefitsandcoverage').addClass('active');
}
	
else if(url.indexOf('category=benefits_and_coverage') > 0){
	$('#header-benefitsandcoverage').addClass('active');
}
	
else {
	$('#header-home').addClass('active');
}
	


var menuOn = false;

$(document).ready(function(){

    $("#drop-down-menu").hide();
    
    $("#menu-button").click(function(){
	
	if (menuOn == false){
		$("#drop-down-menu").slideDown();
		menuOn = true;
	}
	else {
		$("#drop-down-menu").slideUp(); 
		menuOn = false;
		}
  });
    
});

$(".preview a img").hover(function(){
	$(this).attr("src","new-image.html")
});

$('.language-toggle').hover(function(){
	
		$('.language-toggle img').attr("src","images/lifetimes/lt-spanish-button-over.png")
	
	},function(){
		
		$('.language-toggle img').attr("src","images/lifetimes/lt-spanish-button-up.png")	
		
	});


$('.search-input').focus(
	function(){
		$(".search-button").addClass('focus-class');

	}).blur(
	function(){
		$(".search-button").addClass('focus-class');
	});
	
	
	
$('.search-input').focusout(
	function(){
		$(".search-button").removeClass('focus-class');

	}).blur(
	function(){
		$(".search-button").removeClass('focus-class');
	});


