// Author fidde
'use strict';
/**
 * EditBacklogCtrl class, handles editBacklog view
 * @param  {[type]} $scope https://docs.angularjs.org/api/ng/type/$rootScope.Scope
 * @param  {[type]} userService see userService
 * @param  {[type]} userFactory see userFactory
 * @param  {[type]} validationService see validationService
 * @return {[type]}
 */
var editBacklog = function ($scope, userService, userFactory, validationService) {
    $scope.user = userService.user;

// if we have a user
    validationService.userIsSet($scope.user, function () {
        $scope.backlogs = $scope.user.backlogs;
    });

/**
 * Adds person to requested array if person not in array.
 * @param {[type]} person String with a name
 * @param {[type]} array String with either 'teamMembers' or 'stakeholders'
 */
    $scope.add = function (person, array) {
        if ($scope.selectedBacklog && person.length > 1) {

            var index,
                list;

            switch (array) {
            case 'teamMembers':
                index = $scope.selectedBacklog.teamMembers.indexOf(person);
                list = $scope.selectedBacklog.teamMembers;
                break;

            case 'stakeholders':
                index = $scope.selectedBacklog.stakeholders.indexOf(person);
                list = $scope.selectedBacklog.stakeholders;
                break;
            }

            if (index === -1) {
                /*global angular*/
                list.push(angular.copy(person));
                person = '';
            }
        }
    };

/**
 * Removes person if found from given array
 * @param  {[type]} person string with name
 * @param  {[type]} array array to be updated
 * @return {[type]}
 */
    $scope.remove = function (person, array) {
        if ($scope.selectedBacklog) {
            var index = array.indexOf(person);

            if (index !== -1) {
                array.splice(index, 1);
                person = '';
            }
        }
    };

/**
 * Saves the selected backlog if not in users array of backlogs.
 * Sends PUT to server.
 * @return {[type]}
 */
    $scope.save = function () {
        var index = $scope.backlogs.indexOf($scope.selectedBacklog);
        if (index === -1 && $scope.selectedBacklog) {
            $scope.backlogs.push($scope.selectedBacklog);
        }

        userFactory.update({}, $scope.user, function () {
            userService.setUser($scope.user);
            $scope.user = userService.user;
        });
    };

/**
 * Removes backlog from user if found.
 * Sends PUT to server.
 * @return {[type]}
 */
    $scope.remove = function () {
        var index = $scope.user.backlogs.indexOf($scope.selectedBacklog);
        if (index !== -1) {
            $scope.backlogs.splice(index, 1);
            $scope.selectedBacklog = '';

            userFactory.update({}, $scope.user, function () {
                userService.setUser($scope.user);
                $scope.user = userService.user;
            });
        }
    };

/**
 * Creates empty backlog and sets it as the selectedBacklog
 */
    $scope.addBacklog = function () {
        var emptyBacklog = userService.getEmptyBacklog();
        $scope.selectedBacklog = angular.copy(emptyBacklog);
    };
};

editBacklog.$inject = ['$scope', 'UserService', 'UserFactory', 'ValidationService'];
angular.module('manhattanProjectApp')
    .controller('EditBacklogCtrl', editBacklog);