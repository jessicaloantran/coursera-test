(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.checkLunch = function () {
            if (!$scope.lunchItems || $scope.lunchItems.trim() === '') {
                $scope.message = 'Please enter data first';
                return;
            }

            var items = $scope.lunchItems.split(',');
            var itemCount = countNonEmptyItems(items);

            if (itemCount <= 3) {
                $scope.message = 'Enjoy!';
            } else {
                $scope.message = 'Too much!';
            }
        };

        function countNonEmptyItems(items) {
            var count = 0;
            items.forEach(function (item) {
                if (item.trim() !== '') {
                    count++;
                }
            });
            return count;
        }
    }

})();
