angular.module('niomApp')
.controller('SimulateStartCtrl', function($scope, $http, $resource, $location, Devices, Components, Niom)
{
	$scope.device_size_schema = [
	{ property: 'height', label:'height', type: 'number', attr: {min:0, max: 28, step: 4 }, msgs: {min: 'You need a positive number of modules', max: 'Maximum number of modules is 28'} },
	{ property: 'width', label:'width', type: 'number', attr: {min:0, max: 28, step: 4 }, msgs: {min: 'You need a positive number of modules', max: 'Maximum number of modules is 28'} },
	]
	
	$scope.device_size_data = { 'height' : 4, 'width' :4};
	
	$scope.create_grid = function () 
	{
		console.log ( 'Setting grid to ' + $scope.device_size_data.width + 'x' + $scope.device_size_data.height );
		$location.path( '/simulate/' + $scope.device_size_data.height + '/' + $scope.device_size_data.width ); 
	}
})
.controller('SimulateCtrl', function($scope, $route, $routeParams, $http, $resource, $location, Devices, Components, Niom)
{
	
	$scope.device_size_data = {}
	$scope.device_size_data.width 	= parseInt($routeParams.size_x) ;
	$scope.device_size_data.height 	= parseInt($routeParams.size_y) ;
	
	$scope.side_px = 100 ;
	$scope.grid_style = { width: parseInt( ($scope.side_px * $routeParams.size_x ) + 30 ) + 'px', height: parseInt( ($scope.side_px * $routeParams.size_y  ) + 30 ) + 'px' , "border-style": "dashed", "border-color": "#91BFEE", background: "#ffffff" };
	
	
	
	$scope.grid_ready = true;
	$scope.gridsterOpts = {  margins: [10, 10], draggable: { enabled: true }, resizable: { enabled: false } , minRows: 1, maxRows: $scope.device_size_data.height, colWidth: $scope.side_px, rowHeight: $scope.side_px, columns: $scope.device_size_data.width};
	$scope.gridsterItems = [ ];	
	
	$scope.components_image_URI_db = {};
	$scope.components_image_prefix = Niom.url + '/media/components/' ;
	
	
	$scope.at_image_load = function (blob_uri, requested_uri, db, success) { 
			if (success)
			{
				console.log( 'loooaded URI for url: ' + requested_uri ) ;
				db[requested_uri] = blob_uri;
				$scope.$apply();
			}			
			};
	
	$scope.loadImages_comp = function (){
	
				angular.forEach( $scope.components, function( elem, index )
				{
					var url_uniform = $scope.components_image_prefix + elem.name + '.uniform.jpg';
					var url = $scope.components_image_prefix + elem.name + '.' + $scope.side_px + '.jpg';
										
					$scope.components_image_URI_db[url] = "" ;
					loadImage( url_uniform, $scope.at_image_load, $scope.components_image_URI_db, elem.name );
					loadImage( url, $scope.at_image_load, $scope.components_image_URI_db, elem.name );
				});		
	};

	$scope.components = Components.query( $scope.loadImages_comp );

	$scope.add_to_grid = function( component ) { $scope.gridsterItems.push( { sizeX: component.sizeX, sizeY: component.sizeY, name : component.name, type : component.resistor_min, data : component.data } ); }

	$scope.send_items = function() {

		var newDevice = new Devices();
		newDevice.title = "Next";
		newDevice.map_config = {} ;
		newDevice.map_config.arch = {"baud_rate": 38400, "version": "v0.0", "size_x": $scope.device_size_data.width , "size_y": $scope.device_size_data.height , "y": 4, "x": 4, "type": "n_arch", "board": "board0.0"} ;
		newDevice.map_config.elements = []
   
		for( var i = 0; i < $scope.gridsterItems.length ; i++)
		{
			var newElement = {};
			newElement = JSON.parse( $scope.gridsterItems[i].data );
			var elem = $scope.gridsterItems[i];
			newElement.type = elem.type ;
			newElement.pos  = ( ( elem.row + elem.sizeY - 1 ) * newDevice.map_config.arch["size_x"] ) + elem.col ;
			//alert(  'row : ' + elem.row + ' col : ' + elem.col  + ' sizeY : ' + elem.sizeY  + ' sizeX : ' + elem.sizeX + ' pos : ' + newElement.pos );
			newDevice.map_config.elements.push( newElement ) ;
		}
   
		newDevice.$save( function( resp ) { $location.path( '/devices/' + resp.uuid ); } );

	}

});