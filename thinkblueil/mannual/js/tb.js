$(document).ready(function() {
		
		var $about = $('#about');
		var $getInformed = $('#get-informed');
		var $getStarted = $('#get-started');
		var $helpfulMaterials = $('#helpful-materials');
		var $externalResources = $('#external-resources');

		if ( $('#about-page').length ){
			$about.addClass('active');
		 }
		else if ( $('#getInformed-page').length ){
			$getInformed.addClass('active');
		 }
		else if ( $('#getStarted-page').length ){
			$getStarted.addClass('active');
		 }
		else if ( $('#downloadableMaterials-page').length ){
			$helpfulMaterials.addClass('active');
		 }
		else if ( $('#externalResources-page').length ){
			$externalResources.addClass('active');
		 }

		else {};

		

		
 });
 
 
 if ($('#back-to-top').length) {
    var scrollTrigger = 100, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
};






