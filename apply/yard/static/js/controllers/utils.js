//
// This controller is used for the breadcrumb
//



angular.module('niomApp')
.controller('LocationCntl', function($scope, $route, $routeParams, $location) { $scope.$location = $location.path().substring(1); });