'use strict';

/**
 * @ngdoc function
 * @name deadpeoplesubjecttochange.controller:CharacterCtrl
 * @description
 * # CharacterCtrl
 * Controller of the deadpeople
 */
angular.module('deadpeople')
    .controller('CharacterCtrl', ['$scope', '$state','$stateParams', 'DataService', function ($scope, $state, $stateParams, DataService) {
        $('.ui.rating')
            .rating()
        ;
        console.log("role: "+getRole());
        $scope.pname='';
        $scope.cname='';
        $scope.imgurl='';
        $scope.id = '';
        $scope.pubname = '';
        $scope.seriesname = '';
        $scope.kills = [];
        $scope.deaths = [];
        $scope.role = getRole() == 'admin';

        $scope.killerName = '';
        $scope.killedName = '';
        $scope.iss = '';
        $scope.desc = '';
        $scope.deathID = '';

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
            DataService.deleteChar($scope.id, function(response){
                console.log(response);
                $state.go('homepage');
            });
        }
        $scope.deleteDeath = function(kid){
            console.log(kid);
            DataService.deleteKill(kid, function(response){
                console.log(response);
                characterSetup();
            });
        }
        $scope.updateChar = function(){
            $('#editChar').modal('show');
        }
        $scope.updateDeath = function(kid,otherName,iss,desc,type){
                if(type=='kill'){
                    $scope.killerName = $scope.cname;
                    $scope.killedName = otherName;
                }
                else{
                    $scope.killerName = otherName;
                    $scope.killedName = $scope.cname;
                }
                $scope.iss = iss;
                $scope.desc = desc;
                $('#editDeath').modal('show');
        }

        var characterSetup = function(){
            console.log($stateParams.name);
            DataService.search($stateParams.name, 'cape', function (response) {
                            console.log('set response to '+response);
                            console.log(response[0]);
                            $scope.cname = response[0].C_name;
                            $scope.pname = response[0].P_name;
                            $scope.imgurl = response[0].Img_URL;
                            $scope.id = response[0].ID;
                            
                            DataService.search($scope.id,'killsByVic',function(response){
                                console.log(response);
                                $scope.deaths= response;
                                console.log('deaths: '+$scope.deaths);
                            });
                            DataService.search($scope.id,'killsByKiller',function(response){
                                console.log(response);  
                                $scope.kills = response;
                                console.log('kills: '+$scope.kills);
                            });
                            DataService.search($scope.id,'charSeriesPub',function(response){
                                console.log(response);
                                $scope.seriesname= response[0].S_name;
                                $scope.pubname = response[0].P_name;
                            });
                        });
            

            $('#charUpdateForm')
                .form({
                    fields: {
                        pname: {
                            identifier: 'pname',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter a personal name'
                                }
                            ]
                        },
                        cname: {
                            identifier: 'cname',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter a cape name'
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
                        console.log(fields.pname+" "+fields.cname+ " "+fields.img);
                        $('#editChar').modal('hide');
                        $stateParams.name=fields.cname;
                        characterSetup();
                        return false;
                    },
                    onFailure: function (formErrors, fields) {
                        return;

                    }

                });

                $('#deathUpdateForm')
                .form({
                    fields: {
                        killedName: {
                            identifier: 'killedName',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter the character that died'
                                }
                            ]
                        },
                        desc: {
                            identifier: 'desc',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter a description of the death'
                                }
                            ]
                        },
                        issNum: {
                            identifier: 'issNum',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter the issue number of the death'
                                }
                            ]
                        }
                    },
                    inline: true,
                    onSuccess: function (event, fields) {
                        if (event) {
                            event.preventDefault();
                        }
                        DataService.search(fields.killerName, 'cape', function(killerResp){
                            DataService.search(fields.killedName, 'cape', function(killedResp){
                                DataService.updateDeath($scope.deathID, killerResp[0].ID,killedResp[0].ID,fields.issNum,fields.desc,function(response){
                                    $('#editDeath').modal('hide');
                                    characterSetup();
                                });
                            });
                        });
                        
                        return false;
                    },
                    onFailure: function (formErrors, fields) {
                        return;

                    }

                });
        }

        $scope.$on('$viewContentLoaded', function () {
                characterSetup();
            });
    }]);
