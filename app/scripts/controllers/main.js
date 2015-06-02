'use strict';

/**
 * @ngdoc function
 * @name workoutCounterUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the workoutCounterUiApp
 */
angular.module('workoutCounterUiApp')
    .controller('MainCtrl', function ($scope) {

        var div1 = d3.select(document.getElementById('div1'));

        renderRadialProgress();

        function renderRadialProgress() {

            radialProgress(document.getElementById('div1'))
                .label('RADIAL 1')
                .diameter(150)
                .value(78)
                .render();
        }
});
