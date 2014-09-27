angular.module('niomApp')
.controller('CategoriesListCtrl', function($scope, $http, $resource, $location, $sanitize, $sce, $compile, Categories )
{
	$scope.categories 	= Categories.query( );
   
	$scope.open_detail 	= function( device ){ $location.path( '/categories/' + device.uuid ); }
   
	$scope.delete_application = function(item){ item.$delete( function() {$scope.categories = Categories.query( );}); }
	
	$scope.in_creation	= false;
	$scope.create 	= function( ) {  
		$scope.in_creation	 = true; 
		Categories.get( { 	uuid : "", command:"new" },	function (res) {$scope.myhtml = res.html ;}, function() { alert('Form not found.' )} ) ;
	}
   
   
});