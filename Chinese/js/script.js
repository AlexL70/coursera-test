$(function () {		//	Same as document.addEventListener("DomContentLoadedx")
	//	Same as document.querySelector("#navbarToggle").addEventListener("blur")
	$("#navbarToggle").blur(function (event) {
		var screenWidth = window.innerWidth;
		//console.log("first");
		if (screenWidth < 768) {
			$("#collapsable-nav").collapse("hide");
		}
	});
});

(function (global) {
	var dc = {};

	var homeHtml = "snippets/home-snippet.html";
	var allCategoriesUrl = "http://davids-restaurant.herokuapp.com/categories.json";
	var categoriesTitleHtml = "snippets/categories-title-snippet.html";
	var categoryHtml = "snippets/category-snippet.html";
	var menuItemsUrl = "http://davids-restaurant.herokuapp.com/menu_items.json?category=";
	var menuItemsTitleHtml = "snippets/menu-items-title.html";
	var menuItemHtml = "snippets/menu-item.html";

	//	Convenience function for inserting innerHtml for 'select'
	var insertHtml = function (selector, html) {
		var targetElem = document.querySelector(selector);
		//console.log(targetElem);
		targetElem.innerHTML = html;
		//console.log(html);
	};

	//	Show loading icon inside element identified by 'selector'
	var showLoading = function (selector) {
		var html = "<div class='text-center'><img src='images/ajax-loader.gif'></div>";
		insertHtml(selector, html);
	};

	var insertProperty = function (string, propName, propValue) {
		var propToReplace = "{{" + propName + "}}";
		string = string.replace(new RegExp(propToReplace, "g"), propValue);
		return string;
	};

	//	Remove the class 'active' from home and switch to Menu button
	var switchMenuToActive = function () {
		//	Remove 'active' from home button
		var classes = document.querySelector("#navHomeButton").className;
		classes = classes.replace(new RegExp("active", "g"), "");
		document.querySelector("#navHomeButton").className = classes;
		//	Add 'active' to Menu button if not already there
		classes = document.querySelector("#navMenuButton").className;
		if (classes.indexOf("active") == -1) {
			classes += " active";
			document.querySelector("#navMenuButton").className = classes;
		}
	}

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

		//	Load the menu categories view
		dc.loadMenuCategories = function () {
			//console.log("second");
			showLoading("#main-content");
			switchMenuToActive();
			$ajaxUtils.sendGetRequest(
				allCategoriesUrl,
				buildAndShowCategoriesHtml);
		};

		//	Load menu items view
		//	'categoryShort' is a short name of a category
		dc.loadMenuItems = function (categoryShort) {
			showLoading("#main-content");
			switchMenuToActive();
			$ajaxUtils.sendGetRequest(
				menuItemsUrl + categoryShort,
				buildAndShowMenuItemsHtml);
		}

		//	Builds HTML for the categories page based on the data from the server
		function buildAndShowCategoriesHtml(categories) {
			//	Load title snippet of categories page
			$ajaxUtils.sendGetRequest(
				categoriesTitleHtml,
				function (categoriesTitleHtml) {
					//	Retrieve single category snippet
					$ajaxUtils.sendGetRequest(
						categoryHtml,
						function (categoryHtml) {
							var categoriesViewHtml = 
								buildCategoriesViewHtml(categories,
														categoriesTitleHtml,
														categoryHtml);
							//console.log(categoriesViewHtml);
							insertHtml("#main-content", categoriesViewHtml);
						}, false);
				}, false);
		}

		//	Using categories data and snippets html
		//	build categories view HTML to be inserted into page
		function buildCategoriesViewHtml(categories,
										categoriesTitleHtml,
										categoryHtml) {
			var finalHtml = categoriesTitleHtml;
			finalHtml += "<section class='row'>";

			//	Loop over categories
			for (var i = 0; i < categories.length; i++) {
				//	Insert category values
				var html = categoryHtml;
				var name = "" + categories[i].name;
				var short_name = categories[i].short_name;
				html = insertProperty(html, "name", name);
				html = insertProperty(html, "short_name", short_name);
				finalHtml += html;
			}
			finalHtml += "</section>";
			return finalHtml;
		}
	});

	//	Build HTML for the single category page based on the data
	//	from the server
	function buildAndShowMenuItemsHtml (categoryMenuItems) {
		//	Load title snippet of menu items page
		$ajaxUtils.sendGetRequest(
			menuItemsTitleHtml,
			function (menuItemsTitleHtml) {
				//	Retrieve single menu item snippet
				$ajaxUtils.sendGetRequest(
					menuItemHtml,
					function (menuItemHtml) {
						var menuItemsViewHtml = 
							buildMenuItemsViewHtml(categoryMenuItems,
													menuItemsTitleHtml,
													menuItemHtml);
							//console.log(menuItemsViewHtml);
							insertHtml("#main-content", menuItemsViewHtml);
					},
					false);
			},
			false);
	}


	//	Using category and menu items data and snippets HTML
	//	build menu item view HTML to be inserted into page
	function buildMenuItemsViewHtml(categoryMenuItems,
									menuItemsTitleHtml,
									menuItemHtml) {
		menuItemsTitleHtml = insertProperty(
			menuItemsTitleHtml, "name", categoryMenuItems.category.name);
		menuItemsTitleHtml = insertProperty(
			menuItemsTitleHtml, "special_instructions",
			categoryMenuItems.category.special_instructions);
		var finalHtml = menuItemsTitleHtml;
		finalHtml += "<section class='row'>";

		//	Loop over menu items
		var menuItems = categoryMenuItems.menu_items;
		var catShortName = categoryMenuItems.category.short_name;
		for (var i = 0; i < menuItems.length; i++) {
			var html = menuItemHtml;
			html = insertProperty(
				html, "short_name", menuItems[i].short_name);
			html = insertProperty(
				html, "catShortName", catShortName);
			html = insertItemPrice(
				html, "price_small", menuItems[i].price_small);
			html = insertItemPortionName(
				html, "small_portion_name", 
				menuItems[i].small_portion_name);
			html = insertItemPrice(
				html, "price_large", menuItems[i].price_large);
			html = insertItemPortionName(
				html, "large_portion_name",
				menuItems[i].large_portion_name);
			html = insertProperty(
				html, "name", menuItems[i].name);
			html = insertProperty(
				html, "description", menuItems[i].description);
			//	Add clearfix after every second menu item
			if (i % 2 != 0) {
				html += "<div class='clearfix visible-lg-block visible-md-block'></div>";
			}

			finalHtml += html;
			console.log("--------------------------------------------------------------------------------");
			console.log(html);
			console.log("--------------------------------------------------------------------------------");
		}

		finalHtml += "</section>";

		return finalHtml;
	}

	function insertItemPrice(html, pricePropName, priceValue) {
		//	if not specified, replace with empty string
		if (!priceValue) {
			return insertProperty(html, pricePropName, "");
		}

		priceValue = "$" + priceValue.toFixed(2);
		return insertProperty(html, pricePropName, priceValue);
	}

	function insertItemPortionName(html, portionPropName, portionValue) {
		//	if not specified, replace with empty string
		if (!portionValue) {
			return insertProperty(html, portionPropName, "");
		} else {
			return insertProperty(html, portionPropName, portionValue);
		}
	}

	global.$dc = dc;
})(window);