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
        $scope.open = function() {

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'sm'
            });

            modalInstance.result.then(function(modalX){
                console.log(modalX);
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

    });

angular.module('workoutCounterUiApp')
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

        $scope.ok = function () {
            $modalInstance.close({
                name: $scope.counterName,
                goal: $scope.counterGoal
            });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
});
