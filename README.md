# ngZenActions

Fork of [ZenActions (Blaze, React)](https://github.com/abhiaiyer91/ZenActions) by [Abhi Aiyer](https://github.com/abhiaiyer91) into Angular

A simple, yet powerful tool to reuse business logic in the view layer.

`ZenActions` is the first of 2 packages to help build your Meteor app in a `"Flux"-like manner`. `ZenActions` allow you to
abstract business logic from your views into digestable chunks to use between `Blaze` Templates or `React` Components.

Abhi wrote a blog post about this package here [ZenActions](https://medium.com/@abhiaiyer/zenactions-972e5c61c30c#.h55t6cxye)

Example app (BLAZE) here [ZenActions example](https://github.com/abhiaiyer91/ZenScope-Blaze)

## Table of Contents

* [Getting Started](#getting-started)
* [Mixins](#mixins)
* [Actions](#actions)
* [Dependencies](#dependencies)

### Getting Started

Add `ngZenActions` to your app:

angular.module('YOUR_MODULE', ['ngZen'])

### Mixins

```js
angular.factory('YOUR_TOP_LEVEL_FACTORY', function (ngZenActions) {
  var actions = {}
  
  actions.visible = false
  actions.toggle = function () {
    actions.visible = !actions.visible;
  } 

  ngZenActions.registerMixin("VISIBILITY_ACTIONS", actions)
})
```

### Actions

```js
angular.directive("YOUR_DIRECTIVE", function (ngZenActions) {
  return function (scope, element, attrs) {
    scope.actions = ngZenActions.getActions(["VISIBILITY_ACTIONS"])
  }
})
```

### Template

```html
<div your-directive>
  <button ng-click="actions.toggle()"></button>

  <div ng-show="actions.visible">
    {{YOUR_DATA}}
  </div>
</div>
```

### Dependencies

- Lodash or Undersore
- Angular

