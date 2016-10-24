(function() {
    "use strict";

    angular.module('common')
        .component('loader', {
            template: '<img src="images/spinner.svg" ng-if="$ctrl.show">',
            controller: LoadingController
        });

    LoadingController.$inject = ['$rootScope'];

    function LoadingController($rootScope) {
        var $ctrl = this;
        var listenerDestroy;

        $ctrl.$onInit = function() {
            $ctrl.show = false;
            listenerDestroy = $rootScope.$on('spinner:activate', $ctrl.$onSpinnerActivate);
        };

        $ctrl.$onDestroy = function() {
            listenerDestroy();
        };

        $ctrl.$onSpinnerActivate = function(event, data) {
            $ctrl.show = data.on;
        };
    };
})();