// Author fidde
'use strict';
/*global angular*/
angular.module('manhattanProjectApp')
/**
 * Service for validation.
 * @return {[type]}
 */
    .service('ValidationService', function () {

        /**
         * Checks if user is set and calls the provided function.
         * @param  {[type]}   user
         * @param  {Function} callback
         * @return {[type]}
         */
        this.userIsSet = function (user, callback) {
            if (user) {
                callback();

            } else {
                /*global window*/
                window.location.replace('#/login');
            }
        };

        /**
         * Checks if given sprint has only userstories with tasks set to 'DONE'.
         * @param  {[type]} sprint
         * @return {[type]}
         */
        this.sprintIsDone = function (sprint) {
            if (sprint.userStories.length < 1) {
                return false;
            }

            var isDone = true;
            sprint.userStories.forEach(function (userstory) {
                if (userstory.tasks.length < 1) {
                    isDone = false;
                }

                userstory.tasks.forEach(function (task) {
                    if (task.state !== 'DONE') {
                        isDone = false;
                    }
                });
            });
            return isDone;
        };
    });