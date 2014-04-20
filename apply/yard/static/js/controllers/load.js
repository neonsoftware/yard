angular.module('niomApp')
.controller('LoadCtrl', function($scope, $route, $routeParams, $location, Devices, Components, Niom) { 

	$scope.image_URI_db = {};
	$scope.image_prefix = Niom.url + '/media/targets/' ;
	
	
	$scope.at_image_load = function (blob_uri, requested_uri, db, success) { 
			if (success)
			{
				console.log( 'loooaded URI for url: ' + requested_uri ) ;
				db[requested_uri] = blob_uri;
				$scope.$apply();
			}			
			};
	
	
	$scope.loadImages_comp = function (){
		
		var url = $scope.image_prefix + $scope.current_device.uuid + '/thumbnails/20px.jpg';
		
		$scope.image_URI_db[url] = url;
		if (chrome.serial) { $scope.image_URI_db[url] = "" ; loadImage( url, $scope.at_image_load, $scope.image_URI_db ); }

	};


	$scope.current_device = Devices.get( {uuid : $routeParams.deviceId }, function () {
		
		$scope.board_size				= 4 ;
		$scope.current_map      		= JSON.parse($scope.current_device.map) ;
		$scope.current_arch 			= $scope.current_map.arch ;
		$scope.current_elements_data 	= $scope.current_map.elements ;
		$scope.current_elements 		= [];
		$scope.boards					= [];
		$scope.boards_num				= $scope.current_arch["size_x"] / $scope.board_size * $scope.current_arch["size_x"] / $scope.board_size  ;
		for ( i = 0 ; i < $scope.boards_num ; i++ )	{ 
			$scope.boards.push({ id : i , loading : false})	
		
			var url = $scope.image_prefix + $scope.current_device.uuid + '/thumbnails/20px-board-' + i + '.jpg';
			
			console.log( 'Looking URI for url: ' + url ) ;
			
		
			$scope.image_URI_db[url] = url;
			if (chrome.serial) { $scope.image_URI_db[url] = "" ; loadImage( url, $scope.at_image_load, $scope.image_URI_db ); }
		
		}
		$scope.loadImages_comp();
	} );
	
	
	$scope.load_board = function ( board )
	{
		board.loading = true ;
		console.log('loading board ' + board.id );
		
		Devices.get( { 	uuid : $routeParams.deviceId, command: "load-" + board.id },
				function (res) { console.log("returned"); },                                                       
				function() { alert('Cannot load board ' + board.id )}
		); 
		
		
		setTimeout(function( ) { console.log('closing board ' + board.id ); board.loading = false ; $scope.$apply(); } , 3000);
		
	}




});