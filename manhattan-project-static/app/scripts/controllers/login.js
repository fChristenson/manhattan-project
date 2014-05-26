// Author fidde
'use strict';

/**
 * LoginCtrl class, handles the login view
 * @param {[type]} $scope https://docs.angularjs.org/api/ng/type/$rootScope.Scope
 * @param {[type]} userFactory see userFactory
 * @param {[type]} userService see userService
 * @param {[type]} $http https://docs.angularjs.org/api/ng/service/$http
 */
var LoginCtrl = function ($scope, userFactory, userService, $http) {
    $scope.isRegistration = false;
    $scope.formData = {};

/**
 * Hides errors.
 * Switches betwen login and registration.
 * @return {[type]}
 */
    $scope.toggleForm = function () {
        $scope.showError = false;
        if ($scope.isRegistration) {
            $scope.isRegistration = false;

        } else {
            $scope.isRegistration = true;
        }
    };
/**
 * Checks if password and confirm match.
 * If they do, sends a POST to the server.
 * @return {[type]}
 */
    $scope.register = function () {
        if (!$scope.user.password || !$scope.formData.confirm) {
            return;
        }
        if ($scope.user.password === $scope.formData.confirm) {
            userFactory.save({},  $scope.user, function () {
                $scope.isRegistration = false;
                $scope.showError = false;

            }, function (err) {
                /*global alert*/
                alert(err.data.exception);
            });

        } else {
            $scope.showError = true;
        }
    };

/**
 * Sends a POST to server for authentication.
 * If user is valid, redirects to backlog view.
 * Else shows a alert message.
 * @return {[type]}
 */
    $scope.login = function () {

// sends a authentication request to api and expects a token back
        userFactory.save({auth: 'auth'},  $scope.user, function (user, headers) {
            userService.setUser(user);
            userService.Token = headers('Token');

            $http.defaults.headers.common.Token = userService.Token;
            /*global window*/
            window.location.replace('#/backlog');

        }, function () {
            alert('Invalid');
        });
    };
};

LoginCtrl.$inject = ['$scope', 'UserFactory', 'UserService', '$http'];
/*global angular*/
angular.module('manhattanProjectApp')
    .controller('LoginCtrl', LoginCtrl);