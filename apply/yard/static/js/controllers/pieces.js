angular.module('niomApp')
.controller('PiecesListCtrl', function($scope, $http, $resource, $location, Pieces, Categories )
{
	$scope.pieces = Pieces.query( );
   
	$scope.open_detail = function( device ){ $location.path( '/pieces/' + device.uuid ); }
   
	$scope.delete_application = function(item){ item.$delete( function() {$scope.pieces = Pieces.query( );}); }
	
	$scope.in_creation	= false;
	$scope.create 	= function( ) {  
		alert("clicked !");
		$scope.in_creation	 = true; 
		Pieces.get( { 	uuid : "", command:"new" },	function (res) {$scope.myhtml = res.html ;}, function() { alert('Form not found.' )} ) ;
	}
	
});