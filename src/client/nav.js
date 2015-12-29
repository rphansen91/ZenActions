example.directive('navbar', function ($rootScope, ngZenActions) {
	return {
		restrict: "EA",
		template: 
			"<nav class='navbar navbar-default navbar-fixed-top'>" +
				"<div class='container-fluid'>" +
					"<div class='navbar-header'>" +
						"<a class='navbar-brand' href='https://medium.com/modern-user-interfaces'>" +
							"<img style='height: 27px' src='https://cdn-images-1.medium.com/max/1000/1*m-YkRgb5OO8Wr6GzkCUllw.jpeg'>" +
						"</a>" +
					"</div>" +
					"<div class='navbar-header navbar-right'>" +
						"<div icon-button='addMoreButton.toggleItems()' icon='eye-open'></div>" +
						"<div icon-button='addMoreButton.newItem()' icon='plus'></div>" +
					"</div>" +
				"</div>" +
			"</nav>",
		link: function (scope, element, attrs) {

			var newItem = function () {
				$rootScope.$broadcast("add-new-item")
			}
			var toggleItems = function () {
				$rootScope.$broadcast("toggle-items-visibility")
			}

			scope.addMoreButton = ngZenActions.getActions(["SET_GET_ACTIONS"])
			scope.addMoreButton.set("newItem", newItem)
			scope.addMoreButton.set("toggleItems", toggleItems)
		}
	}
})
	