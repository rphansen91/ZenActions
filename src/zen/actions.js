(function (window, angular) {

    angular.module('ngZen', [])
    .provider('ngZenActions', ZenActionsProvider)

    function ZenActionsProvider () {

        var provider = {}

        provider.Mixins = {}

        provider.registerMixin = function (name, object) {
            if (!_.isUndefined(provider.Mixins[name])) {
                throw new Error("A Mixin with the name: '"+ name +"' has already been registered")
            }
            provider.Mixins[name] = object;
            return;
        }

        provider.getActions = function (mixins) {
            mixins = provider.filterStrings(mixins)

            if (_.isEmpty(mixins)) {
                return;
            }

            var zenMixins = {};
            _.each(mixins, function (mixin) {
                
                if (provider.checkMixin(mixin)) {
                    _.extend(zenMixins, provider.Mixins[mixin]);
                }

            })
            
            return zenMixins;
        }

        provider.checkMixin = function (mixin) {
            if (!provider.Mixins[mixin]) {
                throw new Error("ERROR: No Mixin with the name: '" + mixin + "'");
            } else {
                return true;
            }
        }

        provider.filterStrings = function (arr) {
            return _.filter(arr, _.isString)
        }

        provider.list = function () {
            return _.allKeys(provider.Mixins)
        }

        provider.$get = [function () {

            var Actions = {}

            Actions.registerMixin = provider.registerMixin;
            Actions.checkMixin = provider.checkMixin;
            Actions.getActions = provider.getActions;
            Actions.list = provider.list;

            return Actions;

        }]

        return provider;

    }

})(window, window.angular)