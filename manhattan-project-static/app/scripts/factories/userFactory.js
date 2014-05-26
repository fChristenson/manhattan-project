// Author fidde
'use strict';
/*global angular*/
angular.module('manhattanProjectApp')
/**
 * Factory method, https://docs.angularjs.org/api/ng/service
 * @param  {[type]} $resource https://docs.angularjs.org/api/ngResource/service/$resource
 * @param  {[type]} domain value with the servers domain
 * @return {[type]}
 */
    .factory('UserFactory', ['$resource', 'domain', function ($resource, domain) {
        return $resource(domain + 'users/:userId/:auth', {userId: '@userId', auth: '@auth'}, {
            'update': {method: 'PUT'}
        });
    }]);