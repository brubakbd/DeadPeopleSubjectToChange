'use strict';

/**
 * @ngdoc function
 * @name deadpeoplesubjecttochange.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the deadpeople
 */
angular.module('deadpeople')
    .controller('CreateCtrl', ['$scope', '$state', function ($scope, $state) {
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
                        sname: {
                            identifier: 'sname',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter a series the character is in'
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
            $('#deathForm')
                .form({
                    fields: {
                        killerName: {
                            identifier: 'killerName',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter the killer'
                                }
                            ]
                        },
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
