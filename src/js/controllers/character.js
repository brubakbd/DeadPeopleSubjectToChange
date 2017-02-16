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

        $scope.pname='';
        $scope.cname='';
        $scope.imgurl='';
        $scope.id = '';
        $scope.pubname = '';
        $scope.seriesname = '';
        $scope.kills = [];
        $scope.deaths = [];

        var characterSetup = function(){
            console.log($stateParams.id);
            DataService.search($stateParams.id, 'cape', function (response) {
                            console.log('set response to '+response);
                            $scope.cname = response[0].C_name;
                            $scope.pname = response[0].p_name;
                            $scope.imgurl = response[0].Img_URL;
                            $scope.id = response[0].ID;

                            DataService.search($scope.id,'kills',function(response){
                                $scope.deaths= response.deaths;
                                $scope.kills = response.kills;
                            });
                            DataService.search($scope.id,'seriesPub',function(response){
                                $scope.seriesname= response.seriesName;
                                $scope.pubname = response.pubName;
                            });
                        });
        }

        $scope.$on('$viewContentLoaded', function () {
                characterSetup();
            });
    }]);
