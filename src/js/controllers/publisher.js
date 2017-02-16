'use strict';

/**
 * @ngdoc function
 * @name deadpeoplesubjecttochange.controller:PublisherCtrl
 * @description
 * # PublisherCtrl
 * Controller of the deadpeople
 */
angular.module('deadpeople')
    .controller('PublishersCtrl', ['$scope', '$state', function ($scope, $state) {
        $scope.histNames = '';
        $scope.pname = '';
        $scope.imgurl = '';
        $scope.serieses = [];
        $scope.universes = [];

        var pubSetup = function(){
            console.log($stateParams.name);

            DataService.search($stateParams.name, 'series', function (response) {
                            console.log('set response to '+response);
                            $scope.pname = response[0].p_name;
                            $scope.imgurl = response[0].Img_URL;
                            $scope.histName = response[0].H_name;
                        });

            
        }

        $scope.$on('$viewContentLoaded', function () {
                pubSetup();
            });
        
        
    }]);
