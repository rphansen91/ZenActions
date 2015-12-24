(function (window, angular) {

    var ngZen = angular.module('ngZen', [])
    .provider('ngZenActions', ZenActionsProvider)

    function ZenActionsProvider () {

        var provider = {}

        provider.Mixins = {}

        provider.$get = [function () {

            var Actions = {}

            Actions.registerMixin = function (name, object) {
                if (!_.isUndefined(provider.Mixins[name])) {
                    throw new Error("A Mixin with the name: '"+ name +"' has already been registered")
                }
                provider.Mixins[name] = object;
                return;
            }

            Actions.getActions = function (mixins) {
                mixins = _.filter(mixins, _.isString)
                console.log(mixins)

                if (_.isEmpty(mixins)) {
                    return;
                }

                var zenMixins = {};
                _.each(mixins, function (mixin) {
                    if (!provider.Mixins[mixin]) {
                        throw new Error("ERROR: No Mixin with the name: '" + mixin + "'");
                    }
                    _.extend(zenMixins, provider.Mixins[mixin]);
                })
                
                return zenMixins;
            }

            return Actions;

        }]

        return provider;

    }

})(window, window.angular)