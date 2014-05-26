// Author fidde
'use strict';
// we define a service for passing around the user and its token
/*global angular*/
angular.module('manhattanProjectApp')
/**
 * Service for getting the taskboard and moving tasks on it.
 * @return {[type]}
 */
     .service('TaskBoardService', function () {

        var taskStatuses = ['TODO', 'IN_PROGRESS', 'TO_TEST', 'DONE'],
            emptyRow = {userstory: {}, toDo: [], inProgress: [], toTest: [], taskDone: []};

        return {
            /**
             * Given a sprint we return an array of row objects.
             * @param  {[type]} sprint
             * @return {[type]}
             */
            getTaskBoard: function (sprint) {
                if (!sprint || sprint.state !== 'IN_PROGRESS') {
                    return [];
                }
// create a row object for each userstory and add its tasks to that row
                var taskBoard = [],
                    row;

                sprint.userStories.forEach(function (story) {
                    row = angular.copy(emptyRow);
                    row.userstory = story;

                    story.tasks.forEach(function (task) {
                        switch (task.state) {
                        case taskStatuses[0]: // TO_DO
                            row.toDo.push(task);
                            break;

                        case taskStatuses[1]: // IN_PROGRESS
                            row.inProgress.push(task);
                            break;

                        case taskStatuses[2]: // TO_TEST
                            row.toTest.push(task);
                            break;

                        case taskStatuses[3]: // DONE
                            row.taskDone.push(task);
                            break;
                        }
                    });
// add all the rows to our taskboard
                    taskBoard.push(row);
                });
                return taskBoard;
            },

            /**
             * Moves a task from one state to another and from one colum to another.
             * @param  {[type]} selectedRow
             * @param  {[type]} colum
             * @return {[type]}
             */
            moveToColum: function (selectedRow, colum) {
                var taskNotInArray,
                    index;
// we move one task from one colum to another
                switch (colum) {
                case taskStatuses[0]: // TO_DO
                    taskNotInArray = selectedRow.row.toDo.indexOf(selectedRow.task) === -1;

                    if (taskNotInArray) {
                        selectedRow.task.state = taskStatuses[0];
                        selectedRow.row.toDo.push(selectedRow.task);

                        index = selectedRow.array.indexOf(selectedRow.task);
                        selectedRow.array.splice(index, 1);
                    }
                    break;

                case taskStatuses[1]: // IN_PROGRESS
                    taskNotInArray = selectedRow.row.inProgress.indexOf(selectedRow.task) === -1;

                    if (taskNotInArray) {
                        selectedRow.task.state = taskStatuses[1];
                        selectedRow.row.inProgress.push(selectedRow.task);

                        index = selectedRow.array.indexOf(selectedRow.task);
                        selectedRow.array.splice(index, 1);
                    }
                    break;

                case taskStatuses[2]: // TO_TEST
                    taskNotInArray = selectedRow.row.toTest.indexOf(selectedRow.task) === -1;

                    if (taskNotInArray) {
                        selectedRow.task.state = taskStatuses[2];
                        selectedRow.row.toTest.push(selectedRow.task);

                        index = selectedRow.array.indexOf(selectedRow.task);
                        selectedRow.array.splice(index, 1);
                    }
                    break;

                case taskStatuses[3]: // DONE
                    taskNotInArray = selectedRow.row.taskDone.indexOf(selectedRow.task) === -1;

                    if (taskNotInArray) {
                        selectedRow.task.state = taskStatuses[3];
                        selectedRow.row.taskDone.push(selectedRow.task);

                        index = selectedRow.array.indexOf(selectedRow.task);
                        selectedRow.array.splice(index, 1);
                    }
                    break;
                }
            }
        };
    });