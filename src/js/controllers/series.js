'use strict';

/**
 * @ngdoc function
 * @name deadpeoplesubjecttochange.controller:SeriesCtrl
 * @description
 * # SeriesCtrl
 * Controller of the deadpeople
 */
angular.module('deadpeople')
    .controller('SeriesCtrl', ['$scope', '$state', 'DataService', '$stateParams', function ($scope, $state, DataService, $stateParams) {
        $scope.sname = '';
        $scope.uname = '';
        $scope.pname = '';
        $scope.imgurl = '';
        $scope.characters = [];
        $scope.role = getRole() == 'admin';
        $scope.goCreate = function(){
            if($scope.role){
                $state.go('create');
            }
        }
        $scope.delete = function(){
            console.log($scope.sname);
            DataService.deleteSeries($scope.sname, function(response){
                console.log(response);
                $state.go('homepage');
            });
        }
        $scope.logout = function(){
            clearTokens();
            $state.go('home');
        }
        $scope.update = function(){
            $('#editSeries').modal('show');
        }
        var seriesSetup = function(){
            console.log($stateParams.name);

            DataService.search($stateParams.name, 'series', function (response) {
                            console.log('set response to '+response);
                            $scope.uname = response[0].U_name;
                            $scope.sname = response[0].S_name;
                            $scope.pname = response[0].P_name;
                            $scope.imgurl = response[0].Img_URL;
                        });
            DataService.search($stateParams.name, 'charBySeries', function(response){
                $scope.characters = response;
            });

            $('#seriesUpdateForm')
                .form({
                    fields: {
                        sname: {
                            identifier: 'sname',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter a series name'
                                }
                            ]
                        },
                        uname: {
                            identifier: 'uname',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter a universe the series is in'
                                }
                            ]
                        },
                        pname: {
                            identifier: 'pname',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter the publisher for the series'
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
                        DataService.updateSeries($scope.sname, fields.sname,fields.uname,fields.pname,fields.img,function(response){
                            $('#editSeries').modal('hide');
                            $stateParams.name = fields.sname;
                            seriesSetup();
                        });
                        return false;
                    },
                    onFailure: function (formErrors, fields) {
                        return;

                    }

                });

            
        }

        $scope.$on('$viewContentLoaded', function () {
                seriesSetup();
            });
        
    }]);
