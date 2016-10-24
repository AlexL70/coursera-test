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

        service.get = function() {
            return userInfo;
        }

        service.set = function(info) {
            userInfo = info;
        }

        return service;
    }
})();