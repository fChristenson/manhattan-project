// Author fidde
'use strict';
/*global angular*/
angular.module('manhattanProjectApp')
/**
 * Service for handling the User
 * @return {[type]}
 */
    .service('UserService', function () {

        this.Token = '';
        this.user = undefined;
        this.activeBacklog = undefined;
        this.activeSprint = undefined;

        /**
         * Sets the user and attempts to set an active backlog.
         * If there are no active backlogs it defaults to using the first one.
         * @param {[type]} user
         */
        this.setUser = function (user) {
            this.user = user;
            var index = this.user.backlogs.indexOf(this.activeBacklog);
            if (index === -1) {
                this.activeBacklog = this.user.backlogs[0];

            } else {
                this.activeBacklog = this.user.backlogs[index];
            }
        };

        /**
         * Sets the backlog that is mapped to $index as the active one.
         * @param {[type]} $index https://docs.angularjs.org/api/ng/directive/ngRepeat
         */
        this.setActiveBacklog = function ($index) {
            var backlog = this.user.backlogs[$index];

            if (!backlog) {
                /*global Exception*/
                throw new Exception('backlog not in current user');
            }

            this.activeBacklog = backlog;
        };

        /**
         * Checks the active backlogs sprints for the first one that is in state 'IN_PROGRESS'
         * @return {[type]}
         */
        this.getActiveSprint = function () {
            var sprint,
                i = 0;

            for (i = this.activeBacklog.sprints.length - 1; i >= 0; i = i - 1) {
                sprint = this.activeBacklog.sprints[i];

                if (sprint.state === 'IN_PROGRESS') {
                    return sprint;
                }
            }
        };

        /**
         * Clears all data in UserService
         * @return {[type]}
         */
        this.clearService = function () {
            this.Token = '';
            this.user = undefined;
            this.activeBacklog = undefined;
            this.activeSprint = undefined;
        };

        /**
         * Gets the type of stories in the system.
         * @return {[type]}
         */
        this.getStoryTypes = function () {
            return [{id: 'FEATURE', label: 'Feature'}, {id: 'BUG', label: 'Bug'}, {id: 'SPIKE', label: 'Spike'}, {id: 'OTHER', label: 'Other'}];
        };

        /**
         * Creates an empty userstory
         * @return {[type]} emptyUserstory
         */
        this.getEmptyUserstory = function () {
            return {
                name: '',
                estimate: 0,
                description: '',
                type: 'FEATURE',
                author: '',
                tasks: [],
                tag: ''
            };
        };

        /**
         * Creates an empty backlog
         * @return {[type]} emptyUserstory
         */
        this.getEmptyBacklog = function () {
            return {
                name: 'New backlog',
                owner: '',
                sprints: [],
                userStories: [],
                teamMembers: [],
                stakeholders: []
            };
        };

        /**
         * Creates empty task.
         * @return {[type]} emptyTask
         */
        this.getEmptyTask = function () {
            return {
                name: '',
                description: '',
                state: 'TODO',
                estimate: 0,
                assignedTo: ''
            };
        };

        /**
         * Moves commited userstories to given sprint.
         * @param  {[type]} commits
         * @param  {[type]} sprint
         * @param  {[type]} backlog
         * @return {[type]}
         */
        this.moveCommitsToSprint = function (commits, sprint, backlog) {
            commits.forEach(function (userstory) {
                var index = backlog.userStories.indexOf(userstory);
                backlog.userStories.splice(index, 1);
                sprint.userStories.push(userstory);

            });
        };
    });