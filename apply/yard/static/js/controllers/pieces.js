angular.module('niomApp')
.controller('PiecesListCtrl', function($scope, $http, $resource, $location, Applications )
{
	$scope.applications = Applications.query( );
   
	$scope.open_detail = function( device ){ $location.path( '/applications/' + device.uuid ); }
   
	$scope.delete_application = function(item){ item.$delete( function() {$scope.applications = Applications.query( );}); }
   
});