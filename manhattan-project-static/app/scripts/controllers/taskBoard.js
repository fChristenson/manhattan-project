// Author fidde
'use strict';

/**
 * TaskBoardCtrl class, handles the taskboard view
 * @param  {[type]} $scope https://docs.angularjs.org/api/ng/service/$http
 * @param  {[type]} userFactory see userFactory
 * @param  {[type]} userService see userService
 * @param  {[type]} taskBoardService see taskBoardService
 * @param  {[type]} validationService see validationService
 * @return {[type]}
 */
var taskBoardCtrl = function ($scope, userFactory, userService, taskBoardService, validationService) {
    $scope.showTaskInfo = false;
    $scope.user = userService.user;
// we listen for backlog changes so we can update when the user switches
    $scope.$on('backlogChange', function () {
        if (userService.getActiveSprint()){
            $scope.sprint = userService.getActiveSprint();
        }
        $scope.taskBoard = taskBoardService.getTaskBoard($scope.sprint);
    });

// if there is a user
    validationService.userIsSet($scope.user, function () {
        if (userService.getActiveSprint()){
            $scope.sprint = userService.getActiveSprint();
        }
        $scope.taskBoard = taskBoardService.getTaskBoard($scope.sprint);
    });

/**
 * Sets the selected row and shows the taskinfo div.
 * @param  {[type]} row
 * @param  {[type]} originArray
 * @param  {[type]} task
 * @return {[type]}
 */
    $scope.openTaskInfo = function (row, originArray, task) {
        var rowInfo = {row: row, array: originArray, task: task};

        if ($scope.showTaskInfo === false) {
            $scope.showTaskInfo = true;
            $scope.selectedRow = rowInfo;
        } else {
            $scope.selectedRow = rowInfo;
        }
    };

/**
 * Moves the selected row to the given colum.
 * @param  {[type]} selectedRow
 * @param  {[type]} colum
 * @return {[type]}
 */
    $scope.moveToColum = function (selectedRow, colum) {
        taskBoardService.moveToColum(selectedRow, colum);

        $scope.showTaskInfo = false;
        userFactory.update({}, $scope.user, function () {
            userService.setUser($scope.user);
            $scope.user = userService.user;
        });
    };
};
taskBoardCtrl.$inject = ['$scope', 'UserFactory', 'UserService', 'TaskBoardService', 'ValidationService'];
/*global angular*/
angular.module('manhattanProjectApp')
    .controller('TaskBoardCtrl', taskBoardCtrl);