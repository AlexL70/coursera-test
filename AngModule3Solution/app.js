(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .service('MenuSearchService', MenuSearchService)
        .controller('NarrowItDownController', NarrowItDownController)
        .directive('foundItems', foundItemsDirective);

    foundItemsDirective.$inject = [];

    function foundItemsDirective() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'foundItems.html',
            scope: {
                foundItems: '<',
                onRemove: '&'
            }
        };

        return ddo;
    }


    NarrowItDownController.$inject = ['MenuSearchService', '$q'];

    function NarrowItDownController(MenuSearchService, $q) {
        var ndCtrl = this;

        ndCtrl.found = [];
        ndCtrl.searchDone = false;
        ndCtrl.searchTerm = '';

        ndCtrl.NarrowItDown = function() {
            if (ndCtrl.searchTerm === '') {
                ndCtrl.searchDone = true;
                ndCtrl.found = [];
                return;
            }
            var nextPromise = MenuSearchService.getMatchedMenuItems(ndCtrl.searchTerm);
            nextPromise.then(function(result) {
                ndCtrl.found = result;
                ndCtrl.searchDone = true;
            });
        }

        ndCtrl.RemoveItem = function(index) {
            ndCtrl.found.splice(index, 1);
        }
    }

    MenuSearchService.$inject = ['$http'];

    function MenuSearchService($http) {
        var service = {
            getMatchedMenuItems: function(searchTerm) {
                console.log('searchTerm', searchTerm);
                if (typeof searchTerm !== 'string' || searchTerm === '')
                    return [];

                var respPromise = $http({
                    method: 'GET',
                    url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
                });

                var foundItems;

                return respPromise
                    .then(function(response) {
                        return response.data.menu_items.filter(function(element, index, array) {
                            var term = element.description.includes(searchTerm);
                            return term;
                        });
                    })
                    .catch(function(response) {
                        return [];
                    });
            }
        };

        return service;
    }
})();