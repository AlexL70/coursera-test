(function() {
    "use strict";

    angular.module('common')
        .service('MenuService', MenuService);

    MenuService.$inject = ['$http', '$q', 'ApiPath'];

    function MenuService($http, $q, ApiPath) {
        var service = this;

        service.getCategories = function() {
            return $http.get(ApiPath + '/categories.json').then(function(response) {
                return response.data;
            }, function(response) {
                console.log('getCategories error: ', response);
            });
        };

        service.getMenuItems = function(category) {
            var config = {};
            if (category) {
                config.params = { 'category': category };
            }
            return $http.get(ApiPath + '/menu_items.json', config).then(function(response) {
                return response.data;
            });
        };

        service.menuItemExists = function(item) {
            var def = $q.defer();
            $http.get(ApiPath + '/menu_items/' + item + '.json').then(function(response) {
                // console.log(true, response);
                def.resolve();
            }, function(response) {
                // console.log(false, response);
                def.reject();
            });
            return def.promise;
        }

        service.getMenuItem = function(item) {
            return $http.get(ApiPath + '/menu_items/' + item + '.json');
        }

        return service;
    }
})();