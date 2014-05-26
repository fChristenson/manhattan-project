'use strict';
angular.module('manhattanProjectApp')
    .factory('SprintFactory', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/sprints/:sprintId', {sprintId: '@sprintId'});

    }]);