var example = angular.module('example', ['ngZen'])

example.config(['ngZenActionsProvider', function (ngZenActionsProvider) {

	var Mixins = {
		"SET_GET_ACTIONS":     new SetAndGetActions(),
		"VISIBILITY_ACTIONS":  new VisibilityActions(),
		"EVENT_GET_ACTIONS":   new EventGetActions(),
		"COLLECTION_ACTIONS":  new CollectionActions(),
		"ELEMENT_GET_ACTIONS": new ElementGetActions()
	}
	_.mapObject(Mixins, function (value, key) {
		ngZenActionsProvider.registerMixin(key, value)
	})
	

	function VisibilityActions () {
		this.visible = true;

		this.toggle = function () {
			this.visible = !this.visible
		}
	}

	function SetAndGetActions () {
		this.get = function (key) {
			return this[key]
		}

		this.set = function (key, value) {
			this[key] = value
		}
	}

	function EventGetActions () {

		this.getInputValue = function (event) {
			var value;
			if (event && event.target) {
				value = event.target.value
			}
			return value
		}

		this.inputValueSet = function (key, event) {
			var value = this.getInputValue(event)
			this[key] = value
		}
	}

	function CollectionActions (collection) {
		this.collection = (_.isArray(collection))?collection:[]

		this.remove = function (index) {
			if (this.collection && this.collection[index]) {
				this.collection.splice(index, 1)
			}
		}

		this.add = function (item) {
			this.collection.push(item)
		}
	}

	function ElementGetActions () {
		this.getChild = function (element, child) {
			if (_.isFunction(element.children)) {
				return element.children().eq(child)
			}
		}
	}
}])

