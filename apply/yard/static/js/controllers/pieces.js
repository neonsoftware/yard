// TODO : 
//
// 1 ) reassign symbols from AAA -> on 
// 2 ) make filter with direct substitution

angular.module('niomApp')
.controller('SummaryCtrl', function($scope, $http, $resource, $location, Pieces, Categories, Documents, Applications )
{
	console.log("Closing Drawer");
	document.getElementById('mainscaffold').closeDrawer();

	$scope.tags = [];
	$scope.activeTags = {};

	$scope.applications = Applications.query( function(){ console.log("Got Pieces."); });
	$scope.pieces = Pieces.query( function(){ console.log("Got Pieces."); });
	$scope.categories = Categories.query( function(){});
	$scope.documents = Documents.query( );

	$scope.new_application 	= function( ) { $location.path( '/applications/new' ); };
	$scope.new_cover 		= function( ) { $location.path( '/documents/new' ); };
	$scope.new_cover_empty 	= function( ) { $location.path( '/documents/new/empty' ); };

})
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
			var trimmedTags = elem.tags.trim();
			if (trimmedTags.length === 0 )
			{
				if ($scope.tags.indexOf("no tags") === -1)
				{
					console.log('Adding "notags"' );
					$scope.tags.push("no tags");
					$scope.activeTags["no tags"] = false;
				}
			}
			else
			{
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
			}
		});
	});

	$scope.isActive		= function( piece ){
		console.log('Searching: ', piece.content);
		var active = false;
		var trimmedTags = piece.tags.trim();
		if (trimmedTags.length === 0 )
		{
			active = $scope.activeTags["no tags"];
		}
		else
		{
			var theseTags = piece.tags.split(",");

			angular.forEach( theseTags, function( tag, index )
			{
				console.log('Checking activity of tag : ', tag);
				if ( tag.length > 0 && $scope.activeTags[tag] === true )
				{
					console.log('>> Active : ' , tag , piece.content);
					active = true;
				}
				else
				{
					console.log('>> Not Active : ' );
				}
			}); 
		}
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
		console.log(">>>> Saving !", $scope.current_piece.content );
		$scope.current_piece.legend = JSON.stringify($scope.current_piece.legend);
		$scope.current_piece.$save( function() { console.log("SAVED"); $location.path( '/pieces' ); } );
	};
	$scope.discard 	= function( )	{ $location.path( '/pieces' ); };
	
})
.controller('PiecesDetailCtrl', function($scope, $http, $routeParams, $resource, $location, Pieces, Categories )
{
	document.getElementById('mainscaffold').closeDrawer();

	$scope.symbols = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG', 'HHH', 'III', 'JJJ', 'KKK', 'LLL', 'MMM', 'NNN', 'OOO', 'PPP', 'QQQ', 'RRR', 'SSS', 'TTT', 'UUU', 'WWW', 'XXX', 'YYY', 'ZZZ'];

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