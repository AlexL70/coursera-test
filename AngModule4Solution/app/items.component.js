(function() {
    angular.module('MenuApp')
        .component("itemsComponent", {
            templateUrl: 'templates/items.html',
            bindings: {
                menuItems: '<'
            }
        });
})();