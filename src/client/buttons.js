example.directive('iconButton', function (ngZenActions) {
	return {
		restrict: "A",
		template: 
			"<button class='btn btn-default'>" +
				"<span class='glyphicon'></span>" +
			"</button>"
		,
		link: function (scope, element, attrs) {
			element.css("display", "inline-block")

			element.on('click', function () {
				scope.$apply(function () {
					scope.$eval(attrs.iconButton)
				})
			})

			var elementHelper = ngZenActions.getActions(["ELEMENT_GET_ACTIONS"])
			
			var buttonElement = elementHelper.getChild(element, 0)
			var iconElement = elementHelper.getChild(buttonElement, 0)

			if (attrs.size) { 
				buttonElement.addClass("btn-" + attrs.size)
			}
			if (attrs.type) {
				buttonElement.addClass("btn-" + attrs.type)
			}
			if (attrs.icon) {
				iconElement.addClass("glyphicon-" + attrs.icon)
			}
		}
	}
})
	