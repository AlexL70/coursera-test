(function() {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);

    function ItemsController(categoryShortName, data) {
        var iCtrl = this;

        // console.log('categoryShortName: ', categoryShortName);
        // console.log('data: ', data);

        iCtrl.categoryShortName = categoryShortName;
        if (data) {
            iCtrl.categoryShortName = data.category.short_name;
            iCtrl.categoryName = data.category.name;
            iCtrl.menu_items = data.menu_items;
        } else {
            iCtrl.menu_items = [];
        }
    }
})();