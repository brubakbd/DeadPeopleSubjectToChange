'use strict';

/**
 * @ngdoc function
 * @name dripdrankdrunkApp.controller:HomepageCtrl
 * @description
 * # LoginCtrl
 * Controller of the deadpeople
 */
angular.module('deadpeople')
    .controller('HomepageCtrl', ['$scope', '$state','DataService', function ($scope, $state, DataService) {
        $scope.names = [];

        // $scope.search = function(){
        //         console.log($('#searchBar').text);
        //         DataService.getNames($('#searchBar').text, function(response){
        //         $scope.names = response;
        //     });
        
    }}]);
