angular.module('niomApp')
.controller('SkillsListCtrl', function($scope, $http, $resource, $location, Skills )
{
	$scope.skills = Skills.query( );
   
	$scope.open_detail = function( device ){ $location.path( '/skills/' + device.uuid ); }
   
	$scope.delete_application = function(item){ item.$delete( function() {$scope.skills = Skills.query( );}); }
   
	$scope.in_creation	= false;
	$scope.create 	= function( ) {  
		$scope.in_creation	 = true; 
		Skills.get( { 	uuid : "", command:"new" },	function (res) {$scope.myhtml = res.html ;}, function() { alert('Form not found.' )} ) ;
	}
   
});