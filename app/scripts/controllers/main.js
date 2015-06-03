'use strict';

/**
 * @ngdoc function
 * @name workoutCounterUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the workoutCounterUiApp
 */
angular.module('workoutCounterUiApp')
    .controller('MainCtrl', function ($scope, $modal, $log, $http, appConfig) {

        var workoutCounterServiceUrl = appConfig.url;

        $scope.counters = [];
        $scope.counter = $scope.counters[0];
        $scope.counterValue = 1;

        $scope.getAllCounters = function() {

            $http({method: 'GET', url: workoutCounterServiceUrl + 'counters', withCredentials: false})
                .success(function(response){
                    console.log('Retreived all counters: ' + util.inspect(response, false, null));
                    $scope.counters = response;
                })
                .error(function(error){
                    console.log('Error retreiving all counters: ' + error);
                });
        };

        $scope.addNewCounter = function() {};
        $scope.incrementCounter = function() {};
        $scope.getCounterValues = function() {};


        function renderRadialProgress() {

            var div1 = d3.select(document.getElementById('div1'));
            radialProgress(document.getElementById('div1'))
                .label('RADIAL 1')
                .diameter(150)
                .value(78)
                .render();
        }

        renderRadialProgress();


        /* Modal Code */
        $scope.animationsEnabled = true;
        $scope.items = ['item1', 'item2', 'item3']

        $scope.open = function() {

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'sm',
                resolve: {
                    items: function() {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem){
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

    });

angular.module('workoutCounterUiApp')
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
