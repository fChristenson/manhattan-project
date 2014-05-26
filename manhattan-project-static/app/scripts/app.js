// Author fidde
'use strict';
/*global angular*/
angular.module('manhattanProjectApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.directives',
    'ui.bootstrap',
    'ui.chart'
])
// we set the domain for our api
    .value('domain', 'http://localhost:8080/')
// we configure all the paths and their associated controllers and views
    .config(function ($routeProvider) {
        $routeProvider
            .when('/backlog', {
                templateUrl: 'views/backlog.html',
                controller: 'BacklogCtrl'
            })
            .when('/sprint', {
                templateUrl: 'views/sprint.html',
                controller: 'SprintCtrl'
            })
            .when('/taskBoard', {
                templateUrl: 'views/task-board.html',
                controller: 'TaskBoardCtrl'
            })
            .when('/burndown', {
                templateUrl: 'views/burndown-chart.html',
                controller: 'BurndownCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/edit', {
                templateUrl: 'views/edit-backlog.html',
                controller: 'EditBacklogCtrl'
            })
            .otherwise({
                redirectTo: '/login'
            });
    });