'use strict';

/**
 * @ngdoc function
 * @name deadpeoplesubjecttochange.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the deadpeople
 */
angular.module('deadpeople')
    .controller('LoginCtrl', ['$scope', 'AuthService', '$state', function ($scope, AuthService, $state) {

        var loginPageSetup = function () {
            console.log("Started");
            console.log(CryptoJS.SHA256("MEssage"));
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

        var stopButtons = function () {
            $('.ui.button').addClass('disabled');
        };

        var freeButtons = function () {
            $('.ui.button').removeClass('disabled');
        };

        $scope.register = function () {
            if(!$('#login').form('is valid'))
                return;
            stopButtons();
            var fields = $('#login').form('get values');
            AuthService.newUser(fields.username, fields.password);
        };

        $scope.authenticate = function (fields) {
            if(!$('#login').form('is valid'))
                return;
            stopButtons();
            var fields = $('#login').form('get values');
            AuthService.login(fields.username, fields.password, function (token, err) {
                if (err) {
                    $('.ui.error.message').html(
                        '<ui class="list"><li>Invalid Username or Password</li></ui>').show();
                    freeButtons();
                } else {
                    $state.go('user.history');
                }
            });
        }

    }]);
