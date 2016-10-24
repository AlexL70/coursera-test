(function() {
    "use strict";

    angular.module('public')
        .controller('SignupController', SignupController)
        .directive('menu', MenuExists);

    MenuExists.$inject = ['MenuService', '$q'];

    function MenuExists(MenuService, $q) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$asyncValidators.menu = function(modelValue, viewValue) {

                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty model valid
                        return $q.when();
                    }

                    return MenuService.menuItemExists(modelValue);
                };
            }
        };
    }

    SignupController.$inject = ['UserInfo', 'MenuService', '$state'];

    function SignupController(UserInfo, MenuService, $state) {
        var suCtrl = this;

        suCtrl.userInfo = UserInfo.get();

        if (suCtrl.userInfo.menuItem > '') {
            MenuService.getMenuItem(suCtrl.userInfo.menuItem).then(function(response) {
                console.log('OK', response);
                suCtrl.menuItem = response.data;
            }, function(response) {
                console.log('Error', response);
                suCtrl.menuItem = null;
            });
            console.log('suCtrl.menuItem', suCtrl.menuItem);
        }

        suCtrl.submit = function() {
            UserInfo.set(suCtrl.userInfo);
            $state.go('public.reginfo');
        }
    }
})();