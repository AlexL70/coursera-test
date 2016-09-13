(function() {
    'use strict';
    angular.module('LunchCheck', [])
    .controller('LunchController', LunchController);

    LunchController.$inject = ['$scope'];
    function LunchController($scope) {
        $scope.dishes = '';
        $scope.tooMuchMessage = '';
        $scope.alertClass = '';

        $scope.CheckIfTooMuch = function() {
            var dCount = CountDishes($scope.dishes);
            if(dCount <= 0) {
                $scope.tooMuchMessage = 'Please enter data first';
                $scope.alertClass = 'alert-danger';
            }
            else if (dCount >= 4) {
                $scope.tooMuchMessage = 'Too much!';
                $scope.alertClass = 'alert-success';
            }
            else {
                $scope.tooMuchMessage = 'Enjoy!';
                $scope.alertClass = 'alert-success';
            }
        };

        function CountDishes(dishes) {
            var dishesArray = $scope.dishes.split(',');
            var dishCount = 0;
            for(var i = 0; i < dishesArray.length; i++) {
                if(typeof dishesArray[i] === 'string' && dishesArray[i].trim().length > 0)
                    dishCount++;
            }
            return dishCount;
        }
    };
})();
