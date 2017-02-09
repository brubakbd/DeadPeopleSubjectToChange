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
                        DataService.getNames(fields.searchTerm, function (response) {
                            $scope.names = response;
                            console.log('set response to '+response);
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
