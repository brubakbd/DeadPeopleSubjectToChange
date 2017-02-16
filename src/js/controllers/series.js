'use strict';

/**
 * @ngdoc function
 * @name deadpeoplesubjecttochange.controller:SeriesCtrl
 * @description
 * # SeriesCtrl
 * Controller of the deadpeople
 */
angular.module('deadpeople')
    .controller('SeriesCtrl', ['$scope', '$state', 'DataService', '$stateParams', function ($scope, $state, DataService, $stateParams) {
        $scope.sname = '';
        $scope.uname = '';
        $scope.pname = '';
        $scope.imgurl = '';
        $scope.characters = [];

        var seriesSetup = function(){
            console.log($stateParams.name);

            DataService.search($stateParams.name, 'series', function (response) {
                            console.log('set response to '+response);
                            $scope.uname = response[0].U_name;
                            $scope.sname = response[0].S_name;
                            $scope.pname = response[0].P_name;
                            $scope.imgurl = response[0].Img_URL;
                        });
            DataService.search($stateParams.name, 'charBySeries', function(response){
                $scope.characters = response;
            });

            
        }

        $scope.$on('$viewContentLoaded', function () {
                seriesSetup();
            });
        
    }]);
