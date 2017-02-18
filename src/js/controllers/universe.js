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
        $scope.update = function(){
            $('#editUniverse').modal('show');
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

            $('#universeUpdateForm')
                .form({
                    fields: {
                        uname: {
                            identifier: 'uname',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter a universe name'
                                }
                            ]
                        },
                        pname: {
                            identifier: 'pname',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter the universes publisher'
                                }
                            ]
                        },
                        size: {
                            identifier: 'size',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter the size of the universe'
                                }
                            ]
                        },
                        location: {
                            identifier: 'location',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter the location of the universe'
                                }
                            ]
                        },
                        img: {
                            identifier: 'img',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter an img url'
                                }
                            ]
                        }
                    },
                    inline: true,
                    onSuccess: function (event, fields) {
                        if (event) {
                            event.preventDefault();
                        }
                        DataService.updateUniverse($scope.name,fields.uname,fields.size,fields.pname,fields.location,fields.img,function(response){
                            $('#editUniverse').modal('hide');
                            universeSetup();
                        });
                        return false;
                    },
                    onFailure: function (formErrors, fields) {
                        return;

                    }

                });   
        }

        $scope.$on('$viewContentLoaded', function () {
                universeSetup();
            });
        
    }]);
