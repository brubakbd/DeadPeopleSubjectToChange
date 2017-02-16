'use strict';

/**
 * @ngdoc function
 * @name deadpeoplesubjecttochange.controller:HomepageCtrl
 * @description
 * # HomepageCtrl
 * Controller of the deadpeople
 */
angular.module('deadpeople')
    .controller('HomepageCtrl', ['$scope', '$state', 'DataService', function ($scope, $state, DataService) {
        $scope.names = [];
        $scope.character=false;
        $scope.series=false;
        $scope.universe=false;
        $scope.publisher=false;

        $scope.goCreate = function(){
            if($scope.role){
                $state.go('create');
            }
        }
        var homePageSetup = function () {
            $('.ui.dropdown')
                .dropdown()
            ;
            $('#search')
                .form({
                    fields: {
                        searchTerm: {
                            identifier: 'searchTerm',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter something to search'
                                }
                            ]
                        },
                    },
                    inline: true,
                    onSuccess: function (event, fields) {
                        console.log(fields.searchTerm);
                        console.log($('.ui.dropdown').dropdown('get value'));
                        $scope.character = $('.ui.dropdown').dropdown('get value') == 'cape';
                        $scope.series = $('.ui.dropdown').dropdown('get value') == 'series';
                        $scope.universe = $('.ui.dropdown').dropdown('get value') == 'universe';
                        $scope.publisher = $('.ui.dropdown').dropdown('get value') == 'publisher';
                        DataService.search(fields.searchTerm, $('.ui.dropdown').dropdown('get value'), function (response) {
                            $scope.names = response;
                            console.log(response);
                        });
                    },
                    onFailure: function (formErrors, fields) {
                        return;

                    }

                });
        }

        $scope.logout = function(){
            clearTokens();
            $state.go('home');
        }



        $scope.$on('$viewContentLoaded', function () {
            homePageSetup();
        });
        }]);
