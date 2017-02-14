'use strict';

/**
 * @ngdoc function
 * @name deadpeoplesubjecttochange.controller:UniverseCtrl
 * @description
 * # UniverseCtrl
 * Controller of the deadpeople
 */
angular.module('deadpeople')
    .controller('UniverseCtrl', ['$scope', '$state', 'DataService', function ($scope, $state, DataService) {
        $scope.name = '';
        $scope.imgurl = '';
        $scope.pub = '';
        $scope.size = '';
        $scope.loc = '';

        var universeSetup = function(){
            console.log($stateParams.name);

            DataService.search(fields.searchTerm, 'universe', function (response) {
                            console.log('set response to '+response);
                            $scope.name = response[0].U_name;
                            $scope.pub = response[0].P_name;
                            $scope.size = response[0].Size;
                            $scope.loc = response[0].Location;
                            $scope.imgurl = response[0].Img;
                        });

            
        }

        $scope.$on('$viewContentLoaded', function () {
                universeSetup();
            });
        
    }]);
