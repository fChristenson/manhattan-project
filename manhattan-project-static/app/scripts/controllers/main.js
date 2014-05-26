'use strict';

var ctrl = function ($scope, userFactory, apiFactory) {
    var emptyBacklog = {
            userStories: [],
            creator: 'test'
        },

        emptyUserstory = {
            name: '',
            estimate: 0,
            description: '',
            type: 'FEATURE',
            author: '',
            tasks: [],
            tag: ''
        },

        emptyTask = {
            name: '',
            description: '',
            status: 'TODO',
            estimate: 0,
            assignedTo: ''
        };

    $scope.backlog = angular.copy(emptyBacklog);

    apiFactory.get({}, function (api) {
        api.links.forEach(function (link) {
            if (link.rel === 'self'){
                
            }
        });
    });
    userFactory.get({userId: 'test'}, function (user) {
        $scope.user = user;
        $scope.backlog = user.backlogs[0];

    }, function () {
        alert("There was an error getting the backlog, no changes will be saved!");

    });

    $scope.storyTypes = [{id: 'FEATURE', label: 'Feature'}, {id: 'BUG', label: 'Bug'}, {id: 'SPIKE', label: 'Spike'}, {id: 'OTHER', label: 'Other'}];

    $scope.showStoryForm = false;
    $scope.showTaskForm = false;
    $scope.showTaskInfo = false;

    $scope.addUserstory = function () {
        $scope.showStoryForm = true;
        $scope.activeUserstory = angular.copy(emptyUserstory);

    };

    $scope.saveUserstory = function (userstory) {
        var index = $scope.backlog.userStories.indexOf(userstory),
            story;

        if (userstory.name === '' || userstory.name === undefined) {
            userstory.name = 'Userstory ' + ($scope.backlog.userStories.length + 1);

        }

        if (index === -1) {
            story = angular.copy(userstory);
            $scope.backlog.userStories.push(story);

        }

        userFactory.save({}, $scope.user, function () {
            $scope.activeUserstory = angular.copy(emptyUserstory);
            $scope.showStoryForm = false;

        }, function () {

            $scope.activeUserstory = angular.copy(emptyUserstory);
            $scope.showStoryForm = false;

        });
    };

    $scope.editUserstory = function (userstory) {
        $scope.showStoryForm = true;
        $scope.activeUserstory = userstory;

    };

    $scope.removeUserstory = function (userstory) {
        var index = $scope.backlog.userStories.indexOf(userstory);
        $scope.backlog.userStories.splice(index, 1);
        backlogFactory.save({}, $scope.backlog);

    };

    $scope.addTask = function (userstory) {
        $scope.showTaskForm = true;
        $scope.activeUserstory = userstory;
        $scope.activeTask = angular.copy(emptyTask);

    };

    $scope.saveTask = function (task) {
        var index = $scope.activeUserstory.tasks.indexOf(task),
            newTask;

        if (index === -1) {

            if (task.name === '' || task.name === undefined) {
                task.name = 'Task ' + ($scope.activeUserstory.tasks.length + 1);

            }

            newTask = angular.copy(task);
            $scope.activeTask = newTask;
            $scope.activeUserstory.tasks.push(newTask);

        }
        $scope.showTaskForm = false;
        userFactory.save({}, $scope.user);

    };

    $scope.showTask = function (userstory, selectedTask) {
        $scope.showTaskInfo = true;
        $scope.activeUserstory = userstory;
        $scope.activeTask = selectedTask;

    };

    $scope.editTask = function () {
        $scope.showTaskForm = true;

    };

    $scope.removeTask = function (task) {
        var index = $scope.activeUserstory.tasks.indexOf(task);
        $scope.activeUserstory.tasks.splice(index, 1);
        $scope.showTaskInfo = false;

        backlogFactory.save({}, $scope.user);

    };
};

ctrl.$inject = ['$scope', 'UserFactory', 'ApiFactory'];

angular.module('manhattanProjectApp')
    .controller('MainCtrl', ctrl);