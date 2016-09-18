(function() {
    angular.module('shopListApp', [])
        .controller('ToBuyShoppingController', ToBuyController)
        .controller('AlreadyBoughtShoppingController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', CheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        tbCtrl = this;
        tbCtrl.getItems = ShoppingListCheckOffService.getShoppingList;
        tbCtrl.buyItem = ShoppingListCheckOffService.buyItem;
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        abCtrl = this;
        abCtrl.getItems = ShoppingListCheckOffService.getBoughtItems;
    }

    function CheckOffService() {
        var svc = this;
        var slItems = [{
            name: 'Cookies',
            quantity: 10
        }, {
            name: 'Coca-Cola',
            quantity: 3
        }, {
            name: 'Chips',
            quantity: 2
        }, {
            name: 'Beer',
            quantity: 100
        }, {
            name: 'Snacks',
            quantity: 15
        }];
        var btItems = [];

        svc.buyItem = function(index) {
            var item = slItems.splice(index, 1);
            btItems.push(item[0]);
        };

        svc.getShoppingList = function() {
            return slItems;
        };

        svc.getBoughtItems = function() {
            return btItems;
        };
    }
})();