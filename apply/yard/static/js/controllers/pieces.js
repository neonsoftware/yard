// TODO : 
//
// 1 ) reassign symbols from AAA -> on 
// 2 ) make filter with direct substitution

angular.module('niomApp')
.controller('PiecesListCtrl', function($scope, $http, $resource, $location, Pieces, Categories )
{

	$scope.symbols = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG', 'HHH', 'III', 'LLL'];
	
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

	});
   
	$scope.artifact = [];


	$scope.add = function( piece ){ 
		console.log("adding .. ", piece.content);
		$scope.artifact.push(piece); 

	};
	$scope.up = function( index ){
		if (index > 0)
		{
			var temp = $scope.artifact[index-1];
			$scope.artifact[index-1] = $scope.artifact[index];
			$scope.artifact[index] = temp;
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
	$scope.remove = function( index ){ $scope.artifact.splice(index,1); };


	
})
.controller('PiecesNewCtrl', function($scope, $http, $resource, $location, Pieces, Categories )
{
	$scope.symbols = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG', 'HHH', 'III', 'LLL'];
	$scope.legend  = {};
	$scope.pt      = "";

	console.log("ciao");

	$scope.add = function( ){ 
		console.log("Saving !");
		new_piece = new Pieces();
		new_piece.content = $scope.pt;
		new_piece.legend = JSON.stringify($scope.legend);
		new_piece.language = "fr";
		new_piece.tags = "";
		new_piece.$save( function() { console.log("SAVED"); $location.path( '/pieces' ); } );
	}
	
});

angular.module('niomApp').filter('atob', function(){
		return function(text, scope){ 
			
			var tempSubstituted = text;
			angular.forEach(scope.artifact, function(value, key) {
				angular.forEach(value.legend, function(v, k){
					if (v.value.length > 0 )
					{
						console.log("--> Substituting : ", k, " with ", v.value);
						tempSubstituted = tempSubstituted.replace(k,v.value);
					}
				});
			});

			//tempSubstituted = tempSubstituted.replace(k,v.value);
			return tempSubstituted;
		}

	});