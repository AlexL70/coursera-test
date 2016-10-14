(function() {
    angular.module('MenuApp')
        .component("categoriesComponent", {
            templateUrl: 'templates/categories.html',
            controller: CategoriesComponentController,
            bindings: {
                categories: '<'
            }
        });

    CategoriesComponentController.$inject = ['MenuDataService'];

    function CategoriesComponentController(MenuDataService) {
        var $ctrl = this;
        $ctrl.categories = [];

        $ctrl.$onInit = function() {
            MenuDataService.getAllCategories().then(function(response) {
                    $ctrl.categories = response.data.sort(function(a,b) {
                        if(a.short_name < b.short_name) {
                            return -1;
                        } else if(a.short_name > b.short_name) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                })
                .catch(function(response) {
                    console.log('Error getting categories:', response);
                    $ctrl.categories = [];
                });;
        };
    }
})();