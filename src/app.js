(function () {
    var app = angular.module('deadpeople', ['DataManager', 'ui.router', 'chart.js', 'rzModule', 'angular-centered']);


    app.run(function ($state, $rootScope) {
        $rootScope.$on('$stateChangeError', function (evt, toState, toParams, fromState, fromParams, error) {
            if (angular.isObject(error) && angular.isString(error.code)) {
                switch (error.code) {
                    case 'NOT_AUTH':
                        // go to the login page
                        $state.go('home');
                        break;
                    case 'ALREADY_AUTH':
                        //go to the dash board
                        $state.go('user.history');
                        break;
                    default:
                        // set the error object on the error state and go there
                        $state.get('error').error = error;
                        $state.go('error');
                }
            }
            else {
                // unexpected error
                $state.go('home');
            }
        });
    });
    app.config(function ($stateProvider, $urlRouterProvider) {//, $locationProvider) {
        // $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                abstract: false,
                templateUrl: '../views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .state('homepage', {
                url: '/homepage',
                abstract: false,
                templateUrl: '../views/homepage.html',
                controller: 'HomepageCtrl',
                controllerAs: 'homepage'
            })
            .state('search', {
                url: '/search',
                abstract: false,
                templateUrl: '../views/search.html',
                controller: 'SearchCtrl',
                controllerAs: 'search'
            })
            .state('create', {
                url: '/create',
                abstract: false,
                templateUrl: '../views/create.html',
                controller: 'CreateCtrl',
                controllerAs: 'create'
            })
            .state('character', {
                url: '/character',
                abstract: false,
                templateUrl: '../views/character.html',
                controller: 'CharacterCtrl',
                controllerAs: 'character'
            });

    });

    app.exports = app;
})();
