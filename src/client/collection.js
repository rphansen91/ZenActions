example.directive('collection', function () {
	return {
		restrict: "EA",
		template:
			"<div class='container'>" +
				"<br><br><br>" +

				"<div class='row col-sm-4 col-sm-offset-4 text-center'>" +

					"<div icon-button='items.newItem()' size='lg' type='primary' icon='plus'></div>" +
					"<div icon-button='items.toggle()' size='lg' icon='eye-open'></div>" +
					
				"</div>" +
				
				"<div clss='row' ng-show='items.visible'>" +

					"<br><br>" +

					"<div class='jumbotron col-sm-4 text-center' ng-repeat='item in items.collection'>" +
					
						"<h1 ng-show='item.visible' ng-bind='item.name'></h1>" +
						"<input ng-show='item.visible' ng-keyup='items.setItemName(item, $event)'>" +

						"<br><br>" +

						"<div icon-button='item.toggle()' size='lg' type='primary' icon='eye-open'></div>" +
						"<div icon-button='items.remove($index)' size='lg' type='danger' icon='remove'></div>" +
						
					"</div>" +
				"</div>" +
			"</div>"
		,
		link: function (scope, element, attrs, collectionCtrl) {
			// Subscribe to navbar events
			scope.$on("add-new-item", function () { collectionCtrl.newItem() })
			scope.$on("toggle-items-visibility", function () { collectionCtrl.toggle() })

			// Build starting collection
			for (var i = 0; i < 6; i++) {
				collectionCtrl.newItem()
			}
		},
		controller: function (ngZenActions) {
			var items = this

			_.extend(items, ngZenActions.getActions(["COLLECTION_ACTIONS", "VISIBILITY_ACTIONS"]))
			
			items.newItem = function () {
				var item = ngZenActions.getActions(["SET_GET_ACTIONS", "VISIBILITY_ACTIONS", "EVENT_GET_ACTIONS"])
				item.set("name", items.collection.length)

				items.add(item)
			}

			items.setItemName = function (item, event) {
				item.inputValueSet("name", event)
			}
		},
		controllerAs: "items"
	}
})
	