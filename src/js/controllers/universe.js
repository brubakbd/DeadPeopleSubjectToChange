'use strict';

/**
 * @ngdoc function
 * @name deadpeoplesubjecttochange.controller:UniverseCtrl
 * @description
 * # UniverseCtrl
 * Controller of the deadpeople
 */
angular.module('deadpeople')
    .controller('UniverseCtrl', ['$scope', '$state', function ($scope, $state) {
        var universeSetup = function(){
            console.log($stateParams.name);
        }

        $scope.$on('$viewContentLoaded', function () {
                universeSetup();
            });
        
    }]);
