(function() {
    "use strict";

    angular.module('public')
        .service('UserInfo', UserInfo);

    function UserInfo() {
        var service = {};
        var userInfo = {};
        userInfo.firstName = '';
        userInfo.lastName = '';
        userInfo.email = '';
        userInfo.phone = '';
        userInfo.menuItem = '';

        function getUserInfoCopy(uInfo) {
            var newUserInfo = {};

            newUserInfo.firstName = uInfo.firstName;
            newUserInfo.lastName = uInfo.lastName;
            newUserInfo.email = uInfo.email;
            newUserInfo.phone = uInfo.phone;
            newUserInfo.menuItem = uInfo.menuItem;

            return newUserInfo;
        }

        service.get = function() {
            return getUserInfoCopy(userInfo);
        }

        service.set = function(info) {
            userInfo = getUserInfoCopy(info);
        }

        return service;
    }
})();