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
        $scope.sname = '';
        $scope.uname = '';
        $scope.pname = '';
        $scope.imgurl = '';

        var pubSetup = function(){
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
                pubSetup();
            });
        
        
    }]);
