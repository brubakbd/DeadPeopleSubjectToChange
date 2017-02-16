'use strict';

/**
 * @ngdoc function
 * @name deadpeoplesubjecttochange.controller:UniverseCtrl
 * @description
 * # UniverseCtrl
 * Controller of the deadpeople
 */
angular.module('deadpeople')
    .controller('UniverseCtrl', ['$scope', '$state', 'DataService', '$stateParams', function ($scope, $state, DataService, $stateParams) {
        $scope.name = '';
        $scope.imgurl = '';
        $scope.pub = '';
        $scope.size = '';
        $scope.loc = '';
        $scope.serieses = [];
        $scope.role = getRole() == 'admin';

        $scope.goCreate = function(){
            if($scope.role){
                $state.go('create');
            }
        }

        $scope.delete = function(){
            DataService.deleteUniverse($scope.name, function(response){
                console.log(response);
                $state.go('homepage');
            });
        }
        $scope.logout = function(){
            clearTokens();
            $state.go('home');
        }

        var universeSetup = function(){
            console.log($stateParams.name);

            DataService.search($stateParams.name, 'universe', function (response) {
                            console.log('set response to '+response);
                            $scope.name = response[0].U_name;
                            $scope.pub = response[0].P_name;
                            $scope.size = response[0].Size;
                            $scope.loc = response[0].Location;
                            $scope.imgurl = response[0].Img_URL;
                        });
            DataService.search($stateParams.name, 'seriesByUniverse', function(response){
                $scope.serieses = response;
            });

            
        }

        $scope.$on('$viewContentLoaded', function () {
                universeSetup();
            });
        
    }]);
