var suggestCallBack; // global var for autocomplete jsonp
var url;

url = "/hcsccom/searchAutoComplete.page";


/**Search Function*/

function processSearch(url, mode) {
	//alert("Search Initiated "+url +" Mode"+ mode);
	var keyword, keywordID, resultsize;

	if (mode == "NAVIGATE") {
		keyword = $("#appendedInputButtonNavigate").val();
		keywordID = "#appendedInputButtonNavigate";
	} else if (mode == "NEW") {
		keyword = $("#appendedInputButtonLarge").val();
		keywordID = "#appendedInputButtonLarge";

	} else if (mode == "NEW_SMALL") {
		keyword = $("#appendedInputButtonSmall").val();
		keywordID = "#appendedInputButtonSmall";

	} else {
		keyword = $("#appendedInputButtonLarge").val();
		keywordID = "#appendedInputButtonLarge";
	}
	var requiredFieldTerm = "(title).(-primary:no)";
	//requiredfields
	//alert("keyword  "+keyword);
	if (keyword != '' && keyword != null && keyword != undefined) {
		console.log("keyword  Exact Value " + keyword);
		console.log(" Previous Keyword value " + keyword.replace(' ', '+'));
		keyword = keyword.replace(' ', '+');
		keyword = encodeURI(keyword);

		//keyword=keyword.replace(' ', '+');
		console.log("New keyword  Encoded value " + keyword);
		//Trim Spaces
	} else {
		//alert("3  Keyword is blank");
		//$("#keyword-error").show();
		$(keywordID).attr("placeholder", "Please enter keyword");
		$(keywordID).addClass("error");

		return false;
	}

	url = url + "?q=" + keyword;
	//alert(" URL "+url);
	//Add Page Size
	resultsize = $("#resultsize_large").val();
	url = url + "&num=" + resultsize;

	window.location = url;
}


$(document).ready(function () {

	$("#search-bar, #search-bar-leftnav").autocomplete({
		source: function (request, response) {
			$.ajax({
				type: "GET",
				url: url,
				dataType: 'jsonp',
				async: false,
				jsonpCallback: "suggestCallBack",
				data: {
					q: request.term
				},
				success: function (data) {
					console.log("Success");
				},
				error: function (XHR, textStatus, errorThrown) {
					console.log("error: " + XHR);
					console.log("error: " + textStatus);
					console.log("error: " + errorThrown);
				}
			});
			suggestCallBack = function (data) {
				//this.preventDefault();
				console.log("Test321");
				var suggestions = [];
				console.log("befor iteration suggestions.length >" + suggestions.length);
				$.each(data["results"], function (key, val) {
					suggestions.push({
						"value": val["name"]
					});
					//     alert("KEY>"+key +"  VAL>"+ val+"   vALUE IN json>"+val["name"] +"  suggestions.length>"+suggestions.length);
				});
				console.log("after iteration suggestions.length >" + suggestions.length);
				if (suggestions != null && suggestions.length >= 5)
					suggestions.length = 5; // prune suggestions list to only 5 items                                         
				response(suggestions);
			};
		},
	});


});