(function() {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http'];

    function MenuDataService($http) {
        var service = {
            getAllCategories: function() {
                var catPromise = $http.get('https://davids-restaurant.herokuapp.com/categories.json');

                return catPromise;
            },
            getItemsForCategory: function(categoryShortName) {
                var urlStr = 'https://davids-restaurant.herokuapp.com/menu_items.json?category=' + categoryShortName;
                var itemPromise = $http.get(urlStr);

                return itemPromise.then(function(response) {
                        return response.data.menu_items;
                    })
                    .catch(function(response) {
                        console.log('Error getting items: ', response);
                        return [];
                    });
            }
        };

        return service;
    }
})();