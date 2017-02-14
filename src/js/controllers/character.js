'use strict';

/**
 * @ngdoc function
 * @name deadpeoplesubjecttochange.controller:CharacterCtrl
 * @description
 * # CharacterCtrl
 * Controller of the deadpeople
 */
angular.module('deadpeople')
    .controller('CharacterCtrl', ['$scope', '$state','$stateParams', function ($scope, $state, $stateParams) {
        $('.ui.rating')
            .rating()
        ;

        var characterSetup = function(){
            console.log($stateParams.id);
        }

        $scope.$on('$viewContentLoaded', function () {
                characterSetup();
            });
    }]);
