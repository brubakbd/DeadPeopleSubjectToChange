'use strict';

/**
 * @ngdoc function
 * @name deadpeoplesubjecttochange.controller:CharacterCtrl
 * @description
 * # CharacterCtrl
 * Controller of the deadpeople
 */
angular.module('deadpeople')
    .controller('CharacterCtrl', ['$scope', '$state','$stateParams', 'DataService', function ($scope, $state, $stateParams, DataService) {
        $('.ui.rating')
            .rating()
        ;
        console.log("role: "+getRole());
        $scope.pname='';
        $scope.cname='';
        $scope.imgurl='';
        $scope.id = '';
        $scope.pubname = '';
        $scope.seriesname = '';
        $scope.kills = [];
        $scope.deaths = [];
        $scope.role = getRole() == 'admin';

        $scope.goCreate = function(){
            if($scope.role){
                $state.go('create');
            }
        }

        $scope.logout = function(){
            clearTokens();
            $state.go('home');
        }

        $scope.delete = function(){
            DataService.deleteChar($scope.id, function(response){
                console.log(response);
                $state.go('homepage');
            });
        }
        $scope.deleteDeath = function(kid){
            console.log(kid);
            DataService.deleteKill(kid, function(response){
                console.log(response);
                characterSetup();
            });
        }

        var characterSetup = function(){
            console.log($stateParams.name);
            DataService.search($stateParams.name, 'cape', function (response) {
                            console.log('set response to '+response);
                            console.log(response[0]);
                            $scope.cname = response[0].C_name;
                            $scope.pname = response[0].P_name;
                            $scope.imgurl = response[0].Img_URL;
                            $scope.id = response[0].ID;
                            
                            DataService.search($scope.id,'killsByVic',function(response){
                                console.log(response);
                                $scope.deaths= response;
                                console.log('deaths: '+$scope.deaths);
                            });
                            DataService.search($scope.id,'killsByKiller',function(response){
                                console.log(response);  
                                $scope.kills = response;
                                console.log('kills: '+$scope.kills);
                            });
                            DataService.search($scope.id,'charSeriesPub',function(response){
                                console.log(response);
                                $scope.seriesname= response[0].S_name;
                                $scope.pubname = response[0].P_name;
                            });
                        });
        }

        $scope.$on('$viewContentLoaded', function () {
                characterSetup();
            });
    }]);
