angular.module('niomApp')
.controller('CategoriesListCtrl', function($scope, $http, $resource, $location, $sanitize, $sce, $compile, Categories )
{
	document.getElementById('mainscaffold').closeDrawer();
	$scope.categories 	= Categories.query( );
	$scope.edit 		= function( item ){ $location.path( '/categories/' + item.id ); };
	$scope.delete 		= function( item )	{ item.$delete( function() { $scope.categories = Categories.query( );}); };
	$scope.new 			= function( ){ $location.path( '/categories/new' ); };
})


.controller('CategoriesDetailCtrl', function($scope, $http, $resource, $routeParams, $location, Pieces, Categories )
{
	document.getElementById('mainscaffold').closeDrawer();
	$scope.symbols = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG', 'HHH', 'III', 'JJJ', 'KKK', 'LLL', 'MMM', 'NNN', 'OOO', 'PPP', 'QQQ', 'RRR', 'SSS', 'TTT', 'UUU', 'WWW', 'XXX', 'YYY', 'ZZZ'];
	
	$scope.nextSymbolIndex = 0; 
	$scope.getNextSymbol = function(){
		if ($scope.nextSymbolIndex == $scope.symbols.length)
		{
			alert("Reached max number of symbols ! Please reduce number of pieces.");
		}
		else
		{
			return $scope.symbols[$scope.nextSymbolIndex++];
		}
	};

	$scope.tags = [];
	$scope.activeTags = {};

	$scope.pieces = Pieces.query( function(){

		angular.forEach($scope.pieces, function(value, key) {
			console.log("legend is ", value.legend);
			var leg = angular.fromJson(value.legend);
			value.legend = {};
			angular.forEach(leg, function(in_value, key) {
				console.log("key: ", key);
				console.log("value: ", in_value);
				var new_symbol = $scope.getNextSymbol();
				value.content = value.content.replace(key, new_symbol);
				value.legend[new_symbol] = {text:in_value, value:""};
			});
		});

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



	$scope.languages = ["en", "fr"];	

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
		if (index < $scope.current_template.pieces.length - 1)
		{
			var temp = $scope.current_template.pieces[index+1];
			$scope.current_template.pieces[index+1] = $scope.current_template.pieces[index];
			$scope.current_template.pieces[index] = temp;			
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