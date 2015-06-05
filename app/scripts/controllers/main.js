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

        $scope.getAllCounters = function() {

            $scope.counters = [];
            $http({method: 'GET', url: workoutCounterServiceUrl + 'counters?fields=name', withCredentials: false})
                .success(function(response){
                    console.log('Retreived all counters');

                    angular.forEach(response, function(counter){
                        console.log(counter);
                        $scope.counters.push(counter.name);
                    })
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
        $scope.getAllCounters();


        $scope.remove = function() {

            if($scope.counter) {
                $http({method: 'DELETE', url: workoutCounterServiceUrl + 'counters/' + $scope.counter})
                    .success(function(){
                        console.log('Successfully deleted counter: ' + $scope.counter);
                        $scope.getAllCounters();
                        $scope.counter = undefined;
                    })
                    .error(function(){
                        console.log('Error deleting counter: ' + $scope.counter);
                    });
            } else {
                console.log('No selection made, nothing to delete');
            }
        }


        /* Modal Code */
        $scope.open = function() {

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'sm'
            });

            modalInstance.result.then(function(modalInput){

                $http({method: 'POST', url: workoutCounterServiceUrl + 'counters/', data: modalInput, withCredentials: false})
                    .success(function () {
                        console.log('Successfully added Counter: ');
                        console.log(modalInput);
                        $scope.result = 'Success! :)';
                        $scope.getAllCounters();
                    })
                    .error(function (error) {
                        console.log('Error adding Counter name: %s with error: %j', modalInput.name, error);
                        $scope.result = 'Failure :(';
                    });
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }


        $scope.incrementCounter = function() {

            var count = 1;
            console.log(count);
            if ($scope.counterValue) {
                count = parseInt($scope.counterValue) ;
            }

            $http({method: 'PUT', url: workoutCounterServiceUrl + 'counters/' + $scope.counter, data: {"count": count}, withCredentials: false})
                .success(function(){
                    console.log('Successfully updated counter with count:' + count);
                })
                .error(function(error){
                    console.log('Error updating counter');
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
