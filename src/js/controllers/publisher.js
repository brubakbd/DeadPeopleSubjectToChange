'use strict';

/**
 * @ngdoc function
 * @name deadpeoplesubjecttochange.controller:PublisherCtrl
 * @description
 * # PublisherCtrl
 * Controller of the deadpeople
 */
angular.module('deadpeople')
    .controller('PublisherCtrl', ['$scope', '$state', 'DataService', '$stateParams', function ($scope, $state, DataService, $stateParams) {
        $scope.histNames = '';
        $scope.pname = '';
        $scope.imgurl = '';
        $scope.seriesList = [];
        $scope.universeList = [];
        $scope.role = getRole()=='admin';

        $scope.goCreate = function(){
            if($scope.role){
                $state.go('create');
            }
        }
        $scope.logout = function(){
            clearTokens();
            $state.go('home');
        }

        $scope.delete = function(){
            DataService.deletePublisher($scope.pname, function(response){
                console.log(response);
                $state.go('homepage');
            });
        }
        $scope.update = function(){
            $('#editPublisher').modal('show');
        }

        var pubSetup = function(){
            console.log("state param: "+$stateParams.name);

            DataService.search($stateParams.name, 'publisher', function (response) {
                            console.log('set response to '+response);
                            console.log(response);
                            $scope.pname = response[0].P_name;
                            $scope.imgurl = response[0].Img_URL;
                            $scope.histName = response[0].H_name;
                        });
                        
            DataService.search($stateParams.name, 'seriesByPub', function(response){
                console.log(response);
                $scope.seriesList = response;
            });
            DataService.search($stateParams.name, 'universeByPub', function(response){
                console.log(response);
                $scope.universeList = response;
            });

            $('#publisherUpdateForm')
                .form({
                    fields: {
                        pname: {
                            identifier: 'pname',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter a publisher name'
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
                        DataService.createPublisher($scope.pname,fields.pname,fields.histNames,fields.img,function(response){
                            $('#editPublsisher').modal('hide');
                            $stateParams.name = fields.pname;
                            pubSetup();
                        });
                        return false;
                    },
                    onFailure: function (formErrors, fields) {
                        return;

                    }

                });

            
        }

        $scope.$on('$viewContentLoaded', function () {
                pubSetup();
            });
        
        
    }]);
