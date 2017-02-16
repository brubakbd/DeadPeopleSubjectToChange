'use strict';

/**
 * @ngdoc function
 * @name deadpeoplesubjecttochange.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the deadpeople
 */
angular.module('deadpeople')
    .controller('CreateCtrl', ['$scope', '$state', 'DataService', function ($scope, $state, DataService) {
        $scope.response = '';

        $scope.goCreate = function(){
            if($scope.role){
                $state.go('create');
            }
        }
        $scope.logout = function(){
            clearTokens();
            $state.go('home');
        }

        var createPageSetup = function(){
            $('.menu .item')
                .tab()                                                                                                    
            ;

            $('#charForm')
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
                        DataService.createChar(fields.pname,fields.cname,fields.img,function(response){
                            $scope.response = 'Successfully created ' + fields.cname;
                        });
                        return false;
                    },
                    onFailure: function (formErrors, fields) {
                        return;

                    }

                });
            $('#seriesForm')
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
                        DataService.createSeries(fields.sname,fields.uname,fields.pname,fields.img,function(response){
                            $scope.response = 'Successfully created ' + fields.sname;
                        });
                        return false;
                    },
                    onFailure: function (formErrors, fields) {
                        return;

                    }

                });
            $('#universeForm')
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
                        DataService.createUniverse(fields.uname,fields.size,fields.pname,fields.location,fields.img,function(response){
                            $scope.response = 'Successfully created ' + fields.uname;
                        });
                        return false;
                    },
                    onFailure: function (formErrors, fields) {
                        return;

                    }

                });
            $('#publisherForm')
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
                        DataService.createPublisher(fields.pname,fields.histNames,fields.img,function(response){
                            $scope.response = 'Successfully created ' + fields.pname;
                        });
                        return false;
                    },
                    onFailure: function (formErrors, fields) {
                        return;

                    }

                });
            $('#charSeriesForm')
                .form({
                    fields: {
                        char: {
                            identifier: 'char',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter a publisher name'
                                }
                            ]
                        },
                        series: {
                            identifier: 'series',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter a publisher name'
                                }
                            ]
                        }
                    },
                    inline: true,
                    onSuccess: function (event, fields) {
                        if (event) {
                            event.preventDefault();
                        }
                        DataService.search(fields.char,'cape',function(resp){
                            console.log(resp);
                            DataService.createCharSeries(fields.series,resp[0].ID,function(response){
                                $scope.response = 'Successfully created ' + fields.char +'-' + fields.series + ' relationship';
                            });
                        });
                        
                        return false;
                    },
                    onFailure: function (formErrors, fields) {
                        return;

                    }

                });
            $('#deathForm')
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
                                DataService.createDeath(killerResp[0].ID,killedResp[0].ID,fields.issNum,fields.desc,function(response){
                                    $scope.response = 'Successfully created the kill between ' + fields.killerName + ' and ' + fields.killedName;
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
            createPageSetup();
        });
    }]);
