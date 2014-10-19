// TODO : 
//
// 1 ) reassign symbols from AAA -> on 
// 2 ) make filter with direct substitution

angular.module('niomApp')
.controller('PiecesListCtrl', function($scope, $http, $resource, $location, Pieces, Categories )
{
	$scope.pieces = Pieces.query( );	
})

.controller('PiecesNewCtrl', function($scope, $http, $resource, $location, Pieces, Categories )
{
	$scope.symbols = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG', 'HHH', 'III', 'LLL'];
	
	$scope.current_piece = new Pieces();
	$scope.current_piece.legend  = {};
	$scope.current_piece.content  = "";
	$scope.current_piece.language = "fr";

	$scope.add = function( ){ 
		console.log("Saving !");
		$scope.current_piece.legend = JSON.stringify($scope.current_piece.legend);
		$scope.current_piece.$save( function() { console.log("SAVED"); $location.path( '/pieces' ); } );
	};
	
})
.controller('PiecesDetailCtrl', function($scope, $http, $routeParams, $resource, $location, Pieces, Categories )
{
	$scope.symbols = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG', 'HHH', 'III', 'LLL'];
	
	$scope.current_piece = Pieces.get( {uuid : $routeParams.pieceId }, function () {
		console.log("Arrived ! appending."); 
		$scope.current_piece.legend = angular.fromJson($scope.current_piece.legend);
	});

	$scope.add = function( ){ 
		console.log("Saving !");
		$scope.current_piece.legend = JSON.stringify($scope.current_piece.legend);
		$scope.current_piece.$update( {uuid:$scope.current_piece.id}, function(){ console.log("Updated !"); $location.path( '/pieces' );} );
	};
	
});