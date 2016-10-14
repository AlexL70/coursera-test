(function() {
    'use strict';
    angular.module('MenuApp').config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {
        //  Default routing
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home', {
                url: '/',
                template: '<h3 class="text-center" ui-sref="categories"><a href="">View categories</a></h3>'
            })
            .state('categories', {
                url: '/categories',
                template: '<categories-component></categories-component>'
            })
            .state('items', {
                url: '/items/{categoryId}',
                template: '<items-cmp></items-cmp>'
            });
    }
})();