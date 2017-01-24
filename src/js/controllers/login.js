'use strict';

/**
 * @ngdoc function
 * @name dripdrankdrunkApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the dripdrankdrunkApp
 */
angular.module('deadpeople')
    .controller('LoginCtrl', ['$scope', 'AuthService', '$state', function ($scope, AuthService, $state) {

        var loginPageSetup = function () {

            $('#login')
                .form({
                    fields: {
                        username: {
                            identifier: 'username',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter your username'
                                }
                            ]
                        },
                        password: {
                            identifier: 'password',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter your password'
                                }
                            ]
                        }
                    },
                    inline: true,
                    onSuccess: function (event, fields) {
                        if (event) {
                            event.preventDefault();
                        }
                        return false;
                    },
                    onFailure: function (formErrors, fields) {
                        return;

                    }

                });
        };



        //on scope load
        $scope.$on('$viewContentLoaded', function () {
            loginPageSetup();
        });

        $scope.authenticate = function (fields) {
            if (!$('#login').form('is valid'))
                return;
            $state.go('loggedin');
        }
    }]);
