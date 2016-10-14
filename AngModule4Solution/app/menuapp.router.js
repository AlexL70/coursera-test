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
                templateUrl: 'templates/showCategories.html',
                controller: 'CategoriesController as cCtrl'
            })
            .state('items', {
                url: '/items/{categoryShortName}',
                templateUrl: 'templates/showItems.html',
                controller: 'ItemsController as iCtrl',
                resolve: {
                    categoryShortName: ['$stateParams', function($stateParams) {
                        return $stateParams.categoryShortName;
                    }],
                    data: ['MenuDataService', '$stateParams',
                        function(MenuDataService, $stateParams) {
                            var iPromise = MenuDataService
                                .getItemsForCategory($stateParams.categoryShortName);
                            return iPromise.then(function(response) {
                                    return response.data;
                                })
                                .catch(function(response) {
                                    return null;
                                });
                        }
                    ]
                }
            });
    }
})();