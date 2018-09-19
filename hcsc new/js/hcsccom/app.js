$(window).load(function () {
	$(document).foundation()
});

$(document).foundation()

//Leftnav accordion menu
$(document).ready(accMenuOpenClose);

$(window).resize(accMenuOpenClose);


function accMenuOpenClose() {
	if ($(window).width() > 1024) {
		//alert("above 1024");

		//Left Nav will "show" all links
		$("#leftnav-pages").css("display", "flex");
		$("#leftnav-page-levels").css("display", "flex");

	} else {
		$("#leftnav-pages").css("display", "none");
		$("#leftnav-page-levels").css("display", "flex");

	}
}

//Footer accordion menu
$(document).ready(accFootMenuOpenClose);

$(window).resize(accFootMenuOpenClose);

function accFootMenuOpenClose() {
	if ($(window).width() >= 640) {
		//alert("640");

		//Left Nav will "show" all links
		$(".footnav-pages").css("display", "flex");

	} else {
		$(".footnav-pages").css("display", "none");

	}
}

//Newsroom url update
if (window.location.href.indexOf("-2016") > -1) {
	//alert("2016");
	$(window).load(function () {
		$("#news-widget2").removeClass("active");
		$("#year-2016").addClass("active");
	});

} else if (window.location.href.indexOf("-2015") > -1) {
	// alert("2015");
	$(window).load(function () {
		$("#news-widget2").removeClass("active");
		$("#year-2015").addClass("active");
	});
	$("#year-2015").addClass("active");
} else if (window.location.href.indexOf("-2014") > -1) {
	//alert("2014");
	$(window).load(function () {
		$("#news-widget2").removeClass("active");
		$("#year-2014").addClass("active");
	});
}

$("#search-results li:nth-child(2n)").addClass("odd");