function navSwap() {

	$(".about_us_nav").load("includes/navigation/about_us.html");
	$(".total_rewards_nav").load("includes/navigation/total_rewards.html");
	$(".career_areas_nav").load("includes/navigation/career_areas.html");
	$(".getting_hired_nav").load("includes/navigation/getting_hired.html");
	$(".locations_nav").load("includes/navigation/locations.html");

}

function boxHeight() {
	//Invoke Equal Height Function
	equalHeight($(".box"));

	//Window Resize Function
	$(window).resize(function () {
		//Equal Height 

		equalHeight($(".box"));

	});

};
// END DOCUMENT READY FUNCTION //////////////////////////////
/////////////////////////////////////////////////////////////	



//Equal Height Function
function equalHeight(group) {
	group.css("height", "auto");
	group.css("padding", "1em 2em");
	tallest = 0;
	var windowWidth = window.innerWidth;
	//console.log(windowWidth);

	if (windowWidth >= 640 && windowWidth < 1024) {
		group.each(function () {
			thisHeight = $(this).height();
			if (thisHeight > tallest) {
				tallest = thisHeight;
			}
		});
	} else {
		tallest = "auto";
	}
	group.height(tallest + 20);
}