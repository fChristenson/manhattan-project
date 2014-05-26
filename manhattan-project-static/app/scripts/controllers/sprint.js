// Author fidde
'use strict';

/**
 * SprintCtrl class, handles sprint view.
 * @param  {[type]} $scope https://docs.angularjs.org/api/ng/service/$http
 * @param  {[type]} userFactory see userFactory
 * @param  {[type]} userService see userService
 * @param  {[type]} validationService see validationService
 * @return {[type]}
 */
var sprintCtrl = function ($scope, userFactory, userService, validationService) {
    var states = ['IN_PLANNING', 'IN_PROGRESS', 'DONE'],
        emptySprint = {
            name: '',
            userStories: [],
            state: states[0]
        };

    $scope.user = userService.user;
// we listen for backlog changes so we can update when the user switches
    $scope.$on('backlogChange', function () {
        $scope.backlog = userService.activeBacklog;
    });

// if the userservice has a user
    validationService.userIsSet($scope.user, function () {
        $scope.user =  userService.user;
        $scope.backlog = userService.activeBacklog;
        $scope.isDoneRendering = true;
    });

/**
 * Checks if all tasks in the sprints userstories have state 'DONE'
 * @param  {[type]} sprint
 * @return {[type]}
 */
    $scope.sprintIsDone = function (sprint) {
        return validationService.sprintIsDone(sprint);
    };

    $scope.showSprintForm = false;
    $scope.commits = [];

/**
 * Shows sprint form and sets activeSprint to empty sprint
 */
    $scope.addSprint = function () {
        $scope.showSprintForm = true;
        /*global angular*/
        $scope.activeSprint = angular.copy(emptySprint);
    };

/**
 * If sprint has no name, we add one.
 * If sprint is not found in backlogs array of sprints we add it.
 * Sends PUT to server.
 * @param  {[type]} sprint
 * @return {[type]}
 */
    $scope.saveSprint = function (sprint) {
        var name,
            index = $scope.backlog.sprints.indexOf(sprint);
        if (index === -1) {

// if there is no name add one
            if (sprint.name === undefined || sprint.name === '') {
                name = 'Sprint ' + ($scope.backlog.sprints.length + 1);
                sprint.name = name;
            }

            userService.moveCommitsToSprint($scope.commits, $scope.activeSprint, $scope.backlog);
            $scope.backlog.sprints.push(sprint);

        } else {
            userService.moveCommitsToSprint($scope.commits, $scope.activeSprint, $scope.backlog);
        }

        $scope.commits = [];
        $scope.showSprintForm = false;

        userFactory.update({}, $scope.user, function () {
            userService.setUser($scope.user);
            $scope.user = userService.user;
        });

        $scope.sprintIsDone(sprint);
        $scope.activeSprint = angular.copy(emptySprint);
    };

/**
 * If sprint is found it is removed from the active backlog.
 * @param  {[type]} sprint
 * @return {[type]}
 */
    $scope.removeSprint = function (sprint) {
        sprint.userStories.forEach(function (userstory) {
            $scope.backlog.userStories.push(userstory);
        });

        var index = $scope.backlog.sprints.indexOf(sprint);
        $scope.backlog.sprints.splice(index, 1);
        sprint.state = states[0];

        userFactory.update({}, $scope.user, function () {
            userService.setUser($scope.user);
            $scope.user = userService.user;
        });

        $scope.hasActiveSprint = (userService.activeSprint) ? true : false;
    };

/**
 * Sets the given sprint as the active one.
 * Shows the sprint form.
 * @param  {[type]} sprint
 * @return {[type]}
 */
    $scope.editSprint = function (sprint) {
        $scope.activeSprint = sprint;
        $scope.showSprintForm = true;

    };

/**
 * Adds or removes the userstory to/from the commits array.
 * @param  {[type]} userstory
 * @return {[type]}
 */
    $scope.toggleCommit = function (userstory) {
        var index = $scope.commits.indexOf(userstory);

        if (index === -1) {
            $scope.commits.push(userstory);
        } else {
            $scope.commits.splice(index, 1);
        }
    };

/**
 * Checks if the userstory is commited.
 * @param  {[type]}  userstory
 * @return {Boolean} true if is commited false otherwise.
 */
    $scope.isCommited = function (userstory) {
        var index = $scope.commits.indexOf(userstory);
        return index !== -1;
    };

/**
 * Adds the provided userstory to the sprint and removes it from the backlog.
 * Sends PUT to server.
 * @param  {[type]} sprint
 * @param  {[type]} userstory
 * @return {[type]}
 */
    $scope.removeUserstory = function (sprint, userstory) {
        $scope.backlog.userStories.push(userstory);

        var index = sprint.userStories.indexOf(userstory);
        sprint.userStories.splice(index, 1);

        userFactory.update({}, $scope.user, function () {
            userService.setUser($scope.user);
            $scope.user = userService.user;
        });
    };

/**
 * Toggles the sprint state betwen 'IN_PLANNING' and 'IN_PROGRESS'.
 * @param  {[type]} sprint
 * @return {[type]}
 */
    $scope.toggleActive = function (sprint) {
        sprint.state = (sprint.state === states[0]) ? states[1] : states[0];
        userService.activeSprint = (sprint.state === states[1]) ? sprint : undefined;

        userFactory.update({}, $scope.user);
        $scope.hasActiveSprint = (userService.activeSprint) ? true : false;
    };
};

sprintCtrl.$inject = ['$scope', 'UserFactory', 'UserService', 'ValidationService'];
angular.module('manhattanProjectApp')
    .controller('SprintCtrl', sprintCtrl);