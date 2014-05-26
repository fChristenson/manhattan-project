'use strict';
angular.module('manhattanProjectApp')
    .factory('ApiFactory', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/api');

    }]);