// TODO : 
//
// 1 ) reassign symbols from AAA -> on 
// 2 ) make filter with direct substitution

angular.module('niomApp')
.controller('PiecesListCtrl', function($scope, $http, $resource, $location, Pieces, Categories )
{
	console.log("Closing Drawer");
	document.getElementById('mainscaffold').closeDrawer();

	$scope.tags = [];
	$scope.activeTags = {};

	$scope.pieces = Pieces.query( function(){

		angular.forEach( $scope.pieces, function( elem, index )
		{		
			console.log('Analysing tags of ' , elem.tags );
			var newTags = elem.tags.split(",");
			angular.forEach( newTags, function( tag, index )
			{
				console.log('Checking ' , tag );
				if(tag.length > 0 && $scope.tags.indexOf(tag) == -1)	
				{
					console.log('Adding ' , tag );
					$scope.tags.push(tag);
					$scope.activeTags[tag] = false;
				}	
			});
		});

	});

	$scope.isActive		= function( piece ){
		console.log('Searching: ', piece.content);
		var active = false;
		var theseTags = piece.tags.split(",");
		angular.forEach( theseTags, function( tag, index )
		{
			console.log('Checking activity of tag : ', tag);
			if ( tag.length > 0 && $scope.activeTags[tag] === true )
			{
				console.log('>> Was true : ' , tag , piece.content);
				active = true;
			}
			else
			{
				console.log('>> Was false. ' );
			}
		}); 
		console.log('>> Not Found : ', piece.content );
		return active;
	} ;

	$scope.edit 		= function( item ){ $location.path( '/pieces/' + item.id ); };
	$scope.delete 		= function( item )	{ item.$delete( function() { $scope.pieces = Pieces.query( ); $location.path( '/pieces' ); }); };
	$scope.new 			= function( ){ $location.path( '/pieces/new' ); };

})

.controller('PiecesNewCtrl', function($scope, $http, $resource, $location, Pieces, Categories )
{
	document.getElementById('mainscaffold').closeDrawer();

	$scope.symbols = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG', 'HHH', 'III', 'JJJ', 'KKK', 'LLL', 'MMM', 'NNN', 'OOO', 'PPP', 'QQQ', 'RRR', 'SSS', 'TTT', 'UUU', 'WWW', 'XXX', 'YYY', 'ZZZ'];

	$scope.current_piece = new Pieces();
	$scope.current_piece.legend  = {};
	$scope.current_piece.content  = "";
	$scope.current_piece.tags  = "";
	$scope.current_piece.language = "fr";

	$scope.add = function( ){ 
		console.log("Saving !");
		$scope.current_piece.legend = JSON.stringify($scope.current_piece.legend);
		$scope.current_piece.$save( function() { console.log("SAVED"); $location.path( '/pieces' ); } );
	};
	
})
.controller('PiecesDetailCtrl', function($scope, $http, $routeParams, $resource, $location, Pieces, Categories )
{
	document.getElementById('mainscaffold').closeDrawer();

	$scope.current_piece = Pieces.get( {uuid : $routeParams.pieceId }, function () {
		console.log("Arrived ! appending."); 
		$scope.current_piece.legend = angular.fromJson($scope.current_piece.legend);
	});

	$scope.add = function( ){ 
		console.log("Saving !");
		$scope.current_piece.legend = JSON.stringify($scope.current_piece.legend);
		$scope.current_piece.$update( {uuid:$scope.current_piece.id}, function(){ console.log("Updated !"); $location.path( '/pieces' );} );
	};
	$scope.discard 	= function( )	{ $location.path( '/pieces' ); };

});