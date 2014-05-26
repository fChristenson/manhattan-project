// Author fidde
'use strict';
/**
 * IndexCtrl class, handles the index view
 * @param  {[type]} $scope https://docs.angularjs.org/api/ng/type/$rootScope.Scope
 * @param  {[type]} $http https://docs.angularjs.org/api/ng/service/$http
 * @param  {[type]} userService see userService
 * @param  {[type]} $rootScope https://docs.angularjs.org/api/ng/type/$rootScope.Scope
 * @return {[type]}
 */
var indexCtrl = function ($scope, $http, userService, $rootScope) {
//we define the pages so we know which is active on the navbar
    $scope.pages = [
        {href: '#/backlog', text: 'Backlog'},
        {href: '#/sprint', text: 'Sprint'},
        {href: '#/taskBoard', text: 'Task board'},
        {href: '#/burndown', text: 'Burndown'}
    ];
//watch for any changes to the user and update the list of backlogs if it changes
    $scope.$watch(function () {return userService.user; }, function () {
        if (userService.user) {
            $scope.backlogs = userService.user.backlogs;
        }
    });

/**
 * Sends client to logout page and clears away api token and clears the userService.
 * @return {[type]}
 */
    $scope.logout = function () {
        $http.defaults.headers.common.Token = '';
        userService.clearService();
        /*global window*/
        window.location.replace('#/login');
    };

/**
 * Sets the selected backlog as active by its $index
 * @param {[type]} $index https://docs.angularjs.org/api/ng/directive/ngRepeat
 */
    $scope.setToActiveBacklog = function ($index) {
        userService.setActiveBacklog($index);
        $scope.selectedIndex_backlog = $index;
        $rootScope.$broadcast('backlogChange');
    };

/**
 * Sets the selected backlog to active
 * @param {[type]} $index https://docs.angularjs.org/api/ng/directive/ngRepeat
 */
    $scope.setActive = function ($index) {
        $scope.selectedIndex = $index;
    };
};

indexCtrl.$inject = ['$scope', '$http', 'UserService', '$rootScope'];
/*global angular*/
angular.module('manhattanProjectApp')
    .controller('IndexCtrl', indexCtrl);