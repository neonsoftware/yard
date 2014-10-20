angular.module('niomApp')
.controller('CompaniesListCtrl', function($scope, $http, $resource, $location, Companies )
{
	document.getElementById('mainscaffold').closeDrawer();
	$scope.companies = Companies.query( );
   
	$scope.open_detail = function( device ){ $location.path( '/companies/' + device.uuid ); }
   
	$scope.delete_application = function(item){ item.$delete( function() {$scope.companies = Companies.query( );}); }
	
	$scope.in_creation	= false;
	$scope.create 	= function( ) {  
		$scope.in_creation	 = true; 
		Companies.get( { 	uuid : "", command:"new" },	function (res) {$scope.myhtml = res.html ;}, function() { alert('Form not found.' )} ) ;
	}
	
   
});