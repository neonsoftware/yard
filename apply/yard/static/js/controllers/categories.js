angular.module('niomApp')
.controller('CategoriesListCtrl', function($scope, $http, $resource, $location, $sanitize, $sce, $compile, Categories )
{
	$scope.categories 	= Categories.query( );
	$scope.edit 		= function( item ){ $location.path( '/categories/' + item.id ); };
	$scope.delete 		= function( item )	{ item.$delete( function() {$scope.categories = Categories.query( );}); };
	$scope.new 			= function( ){ $location.path( '/categories/new' ); };
})


.controller('CategoriesDetailCtrl', function($scope, $http, $resource, $routeParams, $location, Pieces, Categories )
{
	$scope.pieces = Pieces.query();
	$scope.languages = ["aa", "bb", "cc"];	

	if ($location.path().indexOf("new") > 0)
	{
		console.log("In the new page");
		$scope.current_template = new Categories();
		$scope.current_template.pieces = [];
		$scope.current_template.name = "";
		$scope.current_template.description = "";
		$scope.current_template.tags = "";
		$scope.current_template.language = "";
	}
	else
	{
		console.log("In the detail page");
		$scope.current_template = Categories.get( {uuid : $routeParams.categoryId }, function () {
			console.log("Arrived ! appending."); 
			$scope.current_template.pieces = angular.fromJson($scope.current_template.pieces);
		});
	}

	$scope.add 		= function( piece ){ console.log("adding .. ", piece.content, " on " ); $scope.current_template.pieces.push(piece); };
	$scope.remove 	= function( index ){ $scope.current_template.pieces.splice(index,1); };	

	$scope.up = function( index ){
		if (index > 0)
		{
			var temp = $scope.current_template.pieces[index-1];
			$scope.current_template.pieces[index-1] = $scope.current_template.pieces[index];
			$scope.current_template.pieces[index] = temp;
		} 
	};

	$scope.down = function( index ){ 
		if (index < $scope.artifact.length - 1)
		{
			var temp = $scope.artifact[index+1];
			$scope.artifact[index+1] = $scope.artifact[index];
			$scope.artifact[index] = temp;			
		}
	};

	$scope.save = function( ){ 

		$scope.outgoing = new Categories();
		$scope.outgoing.id = $scope.current_template.id;
		$scope.outgoing.tags 		= document.getElementById('temp-tags').inputValue;
		$scope.outgoing.name 		= document.getElementById('temp-name').inputValue;
		$scope.outgoing.description = document.getElementById('temp-desc').inputValue;
		$scope.outgoing.language 	= $scope.current_template.language;
		$scope.outgoing.pieces = JSON.stringify($scope.current_template.pieces);

		if ($location.path().indexOf("new") > 0)
		{
			console.log("Saving");
			$scope.outgoing.$save( function() { console.log("SAVED"); $location.path( '/categories' ); } );
		}
		else
		{
			console.log("Updating");
			$scope.outgoing.$update( {uuid:$scope.outgoing.id}, function(){ console.log("Updated !"); $location.path( '/categories' );} );
		}
	};


});