angular.module('niomApp')
.controller('ApplicationsListCtrl', function($scope, $http, $resource, $location, Applications )
{
	$scope.applications = Applications.query( );
   
	$scope.open_detail = function( application ){ $location.path( '/applications/' + application.id ); }
   
	$scope.delete_application = function(application){ Applications.delete_application( {uuid : application.id, command : "delete" },function() { $scope.applications = Applications.query( );}); }
	
	$scope.in_creation	= false;
	$scope.create 	= function( ) {  
		$scope.in_creation	 = true; 
		Applications.get( { 	uuid : "", command:"new" },	function (res) {$scope.myhtml = res.html ;}, function() { alert('Form not found.' )} ) ;
	}
})

.controller('ApplicationsDetailCtrl', function($scope, $route, $routeParams, $http, $resource, $location, $timeout, Applications)
{

	$scope.current_application = Applications.get( {uuid : $routeParams.applicationId }, function () {
		
		console.log("loaded.");
	
	});

	$scope.update = function(){

		var company = document.getElementById('appl-company');
		console.log("Second :", company.inputValue );

		var portal = document.getElementById('appl-portal');
		console.log("Second :", portal.inputValue );

	}
			
	
});