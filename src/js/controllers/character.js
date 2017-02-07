'use strict';

/**
 * @ngdoc function
 * @name deadpeoplesubjecttochange.controller:CharacterCtrl
 * @description
 * # CharacterCtrl
 * Controller of the deadpeople
 */
angular.module('deadpeople')
    .controller('CharacterCtrl', ['$scope', '$state', function ($scope, $state) {
        $('.ui.rating')
            .rating()
        ;
        
    }]);
