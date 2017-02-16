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
                        DataService.createChar(pname,cname,img,function(response){
                            $scope.response = 'Successfully created ' + cname;
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
                        DataService.createSeries(sname,uname,pname,img,function(response){
                            $scope.response = 'Successfully created ' + sname;
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
                        DataService.createUniverse(uname,size,pname,location,img,function(response){
                            $scope.response = 'Successfully created ' + uname;
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
                        DataService.createPublisher(pname,histNames,img,function(response){
                            $scope.response = 'Successfully created ' + pname;
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
                        DataService.createCharSeries(char,series,function(response){
                            $scope.response = 'Successfully created ' + char +'-' + series + ' relationship';
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
                        DataService.createDeath(killerName,killedName,img,issNum,desc,function(response){
                            $scope.response = 'Successfully created ' + cname;
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
