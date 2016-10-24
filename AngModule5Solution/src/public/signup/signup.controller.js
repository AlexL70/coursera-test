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

                    // $timeout(function() {
                    //     // Mock a delayed response
                    //     if (usernames.indexOf(modelValue) === -1) {
                    //         // The username is available
                    //         def.resolve();
                    //     } else {
                    //         def.reject();
                    //     }

                    // }, 2000);

                    return MenuService.menuItemExists(modelValue);
                };
            }
        };
    }



    SignupController.$inject = ['MenuService'];

    function SignupController(MenuService) {
        var suCtrl = this;

        suCtrl.userInfo = {};
        suCtrl.userInfo.firstName = '';
        suCtrl.userInfo.lastName = '';
        suCtrl.userInfo.email = '';
        suCtrl.userInfo.phone = '';
        suCtrl.userInfo.menuItem = '';

        suCtrl.submit = function() {
            alert(JSON.stringify(suCtrl.userInfo));
        }
    }
})();