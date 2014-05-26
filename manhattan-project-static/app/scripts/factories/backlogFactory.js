'use strict';
angular.module('manhattanProjectApp')
    .factory('BacklogFactory', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/backlogs/:backlogId', {backlogId: '@backlogId'});

    }]);