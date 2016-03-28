$(function () {		//	Same as document.addEventListener("DomContentLoadedx")
	//	Same as document.querySelector("#navbarToggle").addEventListener("blur")
	$("#navbarToggle").blur(function (event) {
		var screenWidth = window.innerWidth;
		if (screenWidth < 768) {
			$("#collapsable-nav").collapse('hide');
		}
	});
});

(function (global) {
	var dc = {};

	var homeHtml = "snippets/home-snippet.html";

	//	Convenience function for inserting innerHtml for 'select'
	var insertHtml = function (selector, html) {
		var targetElem = document.querySelector(selector);
		targetElem.innerHtml = html;
		console.log(html);
	};

	//	Show loading icon inside element identified by 'selector'
	var showLoading = function (selector) {
		var html = "<div class='text-center'><img src='images/ajax-loader.gif'></div>";
		insertHtml(selector, html);
	};

	//	On page load (before images or CSS)
	document.addEventListener("DOMContentLoaded", function (event) {

		//	On first load, show home view
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(
			homeHtml,
			function (responseText) {
				var el = document.querySelector("#main-content");
				el.innerHTML = responseText;
			},
			false);
	});

	global.$dc = dc;
})(window);