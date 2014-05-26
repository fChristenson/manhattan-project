// Author fidde
'use strict';

/**
 * BacklogCtrl class, handles the backlog view
 * @param  {[type]} $scope https://docs.angularjs.org/api/ng/type/$rootScope.Scope
 * @param  {[type]} userFactory see userFactory doc
 * @param  {[type]} userService see userService doc
 * @param  {[type]} validationService see validationService doc
 * @return {[type]} BacklogCtrl
 */
var ctrl = function ($scope, userFactory, userService, validationService) {
    $scope.user = userService.user;
// listen for activeBacklog changes
    $scope.$on('backlogChange', function () {
        $scope.backlog = userService.activeBacklog;
    });
// if user
    validationService.userIsSet($scope.user, function () {
        $scope.backlog = userService.activeBacklog;
        $scope.storyTypes = userService.getStoryTypes();
        $scope.isDoneRendering = true;
    });

    var emptyUserstory = userService.getEmptyUserstory(),
        emptyTask = userService.getEmptyTask();

    /*global angular*/
    $scope.activeUserstory = angular.copy(emptyUserstory);
    $scope.activeTask = angular.copy(emptyTask);
    $scope.showStoryForm = false;
    $scope.showTaskForm = false;
    $scope.showTaskInfo = false;

/**
 * Opens the userstory form and creates a new empty userstory
 */
    $scope.addUserstory = function () {
        $scope.showStoryForm = true;
        $scope.activeUserstory = angular.copy(emptyUserstory);

    };

/**
 * Checks if a userstory has a name and adds it if there is none.
 * Adds userstory to the active backlog.
 * Sends PUT to the server.
 * Hides form.
 * @param  {[type]} userstory
 * @return {[type]}
 */
    $scope.saveUserstory = function (userstory) {
        var index = $scope.backlog.userStories.indexOf(userstory),
            story;

// if a story has no name we add one
        if (!userstory.name) {
            userstory.name = 'Userstory ' + ($scope.backlog.userStories.length + 1);

        }
// if userstory not in array
        if (index === -1) {
            story = angular.copy(userstory);
            $scope.backlog.userStories.push(story);
            $scope.showStoryForm = false;
            $scope.activeUserstory = angular.copy(emptyUserstory);

            userFactory.update({}, $scope.user, function () {
                userService.setUser($scope.user);
                $scope.user = userService.user;
            });
        }
    };

/**
 * Opens the userstory form and sets the selected story as the active one.
 * @param  {[type]} userstory
 * @return {[type]}
 */
    $scope.editUserstory = function (userstory) {
        $scope.showStoryForm = true;
        $scope.activeUserstory = userstory;
    };

/**
 * Checks the active backlog and removes selected userstory if found.
 * Sends PUT to server.
 * @param  {[type]} userstory
 * @return {[type]}
 */
    $scope.removeUserstory = function (userstory) {
        var index = $scope.backlog.userStories.indexOf(userstory);
        $scope.backlog.userStories.splice(index, 1);
        userFactory.update({}, $scope.user);
    };

/**
 * Shows task form and sets selected userstory to active.
 * Sets active task to a new empty task.
 * @param {[type]} userstory
 */
    $scope.addTask = function (userstory) {
        $scope.showTaskForm = true;
        $scope.activeUserstory = userstory;
        $scope.activeTask = angular.copy(emptyTask);
    };

/**
 * If task has no name it adds one.
 * Adds task to active userstory if its not in the array.
 * Sends PUT to server.
 * Hides form.
 * @param  {[type]} task
 * @return {[type]}
 */
    $scope.saveTask = function (task) {
        var index = $scope.activeUserstory.tasks.indexOf(task),
            newTask;
// if no name is given add one
        if (!task.name) {
            task.name = 'Task ' + ($scope.activeUserstory.tasks.length + 1);
        }
        if (index === -1) {
            newTask = angular.copy(task);
            $scope.activeTask = newTask;
            $scope.activeUserstory.tasks.push(newTask);
        }
        $scope.showTaskForm = false;
        userFactory.update({}, $scope.user, function () {
            userService.setUser($scope.user);
            $scope.user = userService.user;
        });
    };

/**
 * Opens show task info.
 * Sets active userstory and active task to given params.
 * @param  {[type]} userstory
 * @param  {[type]} selectedTask
 * @return {[type]}
 */
    $scope.showTask = function (userstory, selectedTask) {
        $scope.showTaskInfo = true;
        $scope.activeUserstory = userstory;
        $scope.activeTask = selectedTask;
    };

/**
 * Shows task form
 * @return {[type]}
 */
    $scope.editTask = function () {
        $scope.showTaskForm = true;
    };

/**
 * Removes given task from active userstory if found.
 * Sends PUT to server.
 * @param  {[type]} task
 * @return {[type]}
 */
    $scope.removeTask = function (task) {
        var index = $scope.activeUserstory.tasks.indexOf(task);
        $scope.activeUserstory.tasks.splice(index, 1);
        $scope.showTaskInfo = false;

        userFactory.update({}, $scope.user, function () {
            userService.setUser($scope.user);
            $scope.user = userService.user;
        });
    };
};

ctrl.$inject = ['$scope', 'UserFactory', 'UserService', 'ValidationService'];
/* global angular */
angular.module('manhattanProjectApp')
    .controller('BacklogCtrl', ctrl);