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
                        $state.go('homepage');
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
                controllerAs: 'login',
                resolve: {
                    security: ['$q', function ($q) {
                        if (hasAccess()) {
                            return $q.reject({code: 'ALREADY_AUTH'});
                        }
                    }]
                }
            })
            .state('homepage', {
                url: '/homepage',
                abstract: false,
                templateUrl: '../views/homepage.html',
                controller: 'HomepageCtrl',
                controllerAs: 'homepage',
                resolve: {
                    security: ['$q', function ($q) {
                      if (!hasAccess()) {
                        return $q.reject({ code: 'NOT_AUTH' });
                      }
                    }]
                }
            })
            .state('search', {
                url: '/search',
                abstract: false,
                templateUrl: '../views/search.html',
                controller: 'SearchCtrl',
                controllerAs: 'search',
                resolve: {
                    security: ['$q', function ($q) {
                      if (!hasAccess()) {
                        return $q.reject({ code: 'NOT_AUTH' });
                      }
                    }]
                }
            })
            .state('create', {
                url: '/create',
                abstract: false,
                templateUrl: '../views/create.html',
                controller: 'CreateCtrl',
                controllerAs: 'create',
                resolve: {
                    security: ['$q', function ($q) {
                      if (!hasAccess()) {
                        return $q.reject({ code: 'NOT_AUTH' });
                      }
                    }]
                }
            })
            .state('series', {
                url: '/series',
                abstract: false,
                templateUrl: '../views/series.html',
                controller: 'SeriesCtrl',
                controllerAs: 'series',
                resolve: {
                    security: ['$q', function ($q) {
                      if (!hasAccess()) {
                        return $q.reject({ code: 'NOT_AUTH' });
                      }
                    }]
                }
            })
            .state('universe', {
                url: '/universe',
                abstract: false,
                templateUrl: '../views/universe.html',
                controller: 'UniverseCtrl',
                controllerAs: 'universe',
                resolve: {
                    security: ['$q', function ($q) {
                      if (!hasAccess()) {
                        return $q.reject({ code: 'NOT_AUTH' });
                      }
                    }]
                }
            })
            .state('publisher', {
                url: '/publisher',
                abstract: false,
                templateUrl: '../views/publisher.html',
                controller: 'PublisherCtrl',
                controllerAs: 'publisher',
                resolve: {
                    security: ['$q', function ($q) {
                      if (!hasAccess()) {
                        return $q.reject({ code: 'NOT_AUTH' });
                      }
                    }]
                }
            })
            .state('character', {
                url: '/character',
                abstract: false,
                templateUrl: '../views/character.html',
                controller: 'CharacterCtrl',
                controllerAs: 'character',
                resolve: {
                    security: ['$q', function ($q) {
                      if (!hasAccess()) {
                        return $q.reject({ code: 'NOT_AUTH' });
                      }
                    }]
                }
            });

    });

    app.exports = app;
})();
