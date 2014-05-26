// Author fidde
'use strict';

/**
 * BurndownCtrl class, handles burndown view.
 * @param  {[type]} $scope https://docs.angularjs.org/api/ng/type/$rootScope.Scope
 * @return {[type]}
 */
var burndownCtrl = function ($scope) {
    $scope.data = [[100, 0]];
    $scope.chartOptions = {};
};

burndownCtrl.$inject = ['$scope'];
/*global angular*/
angular.module('manhattanProjectApp').controller('BurndownCtrl', burndownCtrl);