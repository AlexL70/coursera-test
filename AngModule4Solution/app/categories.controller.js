(function() {
    angular.module('MenuApp')
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['MenuDataService'];

    function CategoriesController(MenuDataService) {
        var cCtrl = this;
        cCtrl.categories = [{ name: 'testName' }];

        cCtrl.$onInit = function() {
            MenuDataService.getAllCategories().then(function(response) {
                    cCtrl.categories = response.data.sort(function(a, b) {
                        if (a.short_name < b.short_name) {
                            return -1;
                        } else if (a.short_name > b.short_name) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                })
                .catch(function(response) {
                    console.log('Error getting categories:', response);
                    cCtrl.categories = [];
                });;
        };
    }
})();