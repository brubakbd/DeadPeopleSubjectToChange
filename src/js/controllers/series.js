'use strict';

/**
 * @ngdoc function
 * @name deadpeoplesubjecttochange.controller:SeriesCtrl
 * @description
 * # SeriesCtrl
 * Controller of the deadpeople
 */
angular.module('deadpeople')
    .controller('SeriesCtrl', ['$scope', '$state', 'DataService', function ($scope, $state, DataService) {
        $scope.sname = '';
        $scope.uname = '';
        $scope.pname = '';
        $scope.imgurl = '';

        var seriesSetup = function(){
            console.log($stateParams.name);

            DataService.search(fields.searchTerm, 'series', function (response) {
                            console.log('set response to '+response);
                            $scope.uname = response[0].U_name;
                            $scope.sname = response[0].S_name;
                            $scope.pname = response[0].p_name;
                            $scope.imgurl = response[0].Img;
                        });

            
        }

        $scope.$on('$viewContentLoaded', function () {
                seriesSetup();
            });
        
    }]);
