# ngZenActions

Fork of [ZenActions (Blaze, React)](https://github.com/abhiaiyer91/ZenActions) by [Abhi Aiyer](https://github.com/abhiaiyer91) into Angular

A simple, yet powerful tool to reuse business logic in the view layer.


`ZenActions` was originally created as the first of 2 packages to help build Meteor apps in a `"Flux"-like manner`. However this basic pattern is very powerful in large scale `Angular` apps as well!

`ngZen` is a wrapper around `ZenActions` for `Angular` and allows you to
abstract business logic from your views into digestable chunks to use between `Directives` and `Controllers` templates.

Abhi wrote a blog post about this package here [ZenActions](https://medium.com/@abhiaiyer/zenactions-972e5c61c30c#.h55t6cxye)

Example app (BLAZE) here [ZenActions example](https://github.com/abhiaiyer91/ZenScope-Blaze)

## Table of Contents

* [Getting Started](#getting-started)
* [Mixins](#mixins)
* [Actions](#actions)
* [Dependencies](#dependencies)

### Getting Started

Add `ngZen` to your app:

var exampleApp = angular.module('YOUR_MODULE', ['ngZen'])

### Mixins

```js
exampleApp.config(function (ngZenActionsProvider) {
  
  // HINT: MIXINS CAN ALSO BE REGISTERED THROUGH A FACTORY OR SERVICE
  // ie: $inject(ngZenActions)
  var Mixins = {
    "VISIBILITY_ACTIONS":  new VisibilityActions()
  }
  
  // IMPORTANT!!!
  // HELPER FUNCTION TO REGISTER ALL CLASSES SPECIFIED
  _.mapObject(Mixins, function (value, key) {
    ngZenActionsProvider.registerMixin(key, value)
  })
  
  // ANY REUSABLE CLASS OR LOGIC
  function VisibilityActions () {
    this.visible = true;

    this.toggle = function () {
      this.visible = !this.visible
    }
  }
})
```

### Actions

```js
exampleApp.directive("YOUR_DIRECTIVE", function () {
  return {
    templateUrl: "template.html",
    controller: function (ngZenActions, dataService) {
      var actions = this; // HOLD REFERENCE

      // SPECIFY ACTIONS AND THEY WILL ALL BE 
      // MIXED INTO THE CONTROLLER INSTANCE 
      // AND BOUND TO `template.html`
      _.extend(actions, ngZenActions.getActions(["VISIBILITY_ACTIONS"]))

      // ADDITTIONAL INFO CAN BE EXTENDED ON
      dataService.get()
      .then(function (res) {
        actions.data = res
      })
      
    },
    controllerAs: "actions"
  }
})
```

### Template

```html
  <button ng-click="actions.toggle()"></button>

  <div ng-show="actions.visible">
    {{actions.data}}
  </div>
```

### Dependencies

- Lodash or Undersore
- Angular

