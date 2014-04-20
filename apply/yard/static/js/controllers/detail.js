angular.module('niomApp')
.controller('DevicesDetailCtrl', function($scope, $route, $routeParams, $http, $resource, $location, $timeout, Devices, Components, Niom)
{
	
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
					var url = $scope.components_image_prefix + elem.name + '.100.jpg';
										
					$scope.components_image_URI_db[url] = "" ;
					loadImage( url, $scope.at_image_load, $scope.components_image_URI_db, elem.name );
					loadImage( url, $scope.at_image_load, $scope.components_image_URI_db, elem.name );
				});		
	};
   

   
	$scope.getComponent = function ( type ) {
		var matching_components = $scope.components.filter( function (element) { return element.resistor_min == type ; } );
		if ( matching_components.length > 0 ) {	return matching_components[0]; }  else { return null ; }
	}
       
	////////////////////////////////// // Loading current device and populate the matrix well
	//
	
	$scope.matrix_loaded         = false ;
   
	$scope.gridsterOpts = {  margins: [10, 10], draggable: { enabled: false }, resizable: { enabled: false } , colWidth: 100, rowHeight: 100, columns : 8 };
	
	$scope.load_device = function() {
		
		$scope.loadImages_comp();
   
		$scope.current_device = Devices.get( {uuid : $routeParams.deviceId }, function () {
			
			
			$scope.current_map      = JSON.parse($scope.current_device.map) ;
			$scope.current_arch = $scope.current_map.arch ;
			$scope.current_elements_data = $scope.current_map.elements ;
			$scope.current_elements = [];
			
			$scope.side_px = 100 ;
			$scope.grid_style = { width: parseInt(($scope.current_arch.size_x * $scope.side_px) + 30 ) + 'px', height: parseInt( ( $scope.current_arch.size_y  * $scope.side_px ) + 30 ) + 'px' , "border-style": "dashed", "border-color": "#91BFEE", background: "#ffffff" };
			
			console.log( 'height : ' +  $scope.current_arch.size_y  + ' width : ' + $scope.current_arch.size_x );
			
			angular.forEach( $scope.current_elements_data, function( elem, index )
			{
				var comp = $scope.getComponent( elem.type );
                   
				if ( comp != null )
				{
					var module = {};
					module.data = angular.copy( elem );
					module.data.pos = elem.pos;
					module.pos = elem.pos;
					module.sizeX = comp.sizeX;
					module.sizeY = comp.sizeY;
					module.row = Math.floor( elem.pos / $scope.current_arch.size_x ) - comp.sizeY + 1 ;
					module.col = ( elem.pos % $scope.current_arch.size_x );
					module.name = comp.name ;
					module.schema = comp.schema ;
					$scope.current_elements.push( module );
					console.log ( 'pos : ' + elem.pos +  ' name : ' + module.name  + ' size_x : ' + module.sizeX + ' size_y : ' + module.sizeY + ' row :' +  module.row  + ' col :' +  module.col  );
				}
				else
				{
					console.log('Warning ! Object of type ' + elem.type + ' not found in components !');
				}
                   
			});
            
			$scope.matrix_loaded = true ;

		} );
	}
                   
	$scope.components = Components.query( $scope.load_device );
                   

	//
	///////////////////////////////////////////////
   
   
	////////////////////////////////// Customization Well
	//
	// Model
   
	$scope.in_customisation      = false ;
	$scope.customisation_success = false ;
	$scope.customisation_failure = false ;
	$scope.current_schema        = -1 ;
   
	// Controller
   
	$scope.customisation_success_toggle = function () { $scope.customisation_success = true ; $timeout(function(){$scope.customisation_success = false;}, 2000)}
	$scope.customisation_failure_toggle = function () { $scope.customisation_failure = true ; $timeout(function(){$scope.customisation_failure = false;}, 2000)}
	$scope.discard_customisation = function( ){ $scope.close_customisation() ; $scope.customisation_failure_toggle() }
	$scope.update_customisation  = function( ){ $scope.close_customisation() ; 
		
		var updated_map = { "arch" : $scope.current_arch, "elements" : [] } ;
		
		angular.forEach( $scope.current_elements, function( elem, index ) {	updated_map.elements.push( elem.data ) });
		
		$scope.current_device.map = JSON.stringify( updated_map );
		
		console.log('Updated map is ' + $scope.current_device.map );
		
		$scope.current_device.$update( function (){ $scope.load_device(); } ); 
		
		$scope.customisation_success_toggle() }
	
		$scope.open_customisation = function( elem ){
   
			$scope.current_schema           = JSON.parse(elem.schema);
			$scope.current_element          = elem ;
			$scope.current_element_data     = elem.data ;
			$scope.in_customisation         = true ;
			$scope.customisation_success    = false ;
			$scope.customisation_failure    = false ;
			$scope.code_generated           = false ;     
                   
			$scope.join = function(){
                   
				if(!$scope.joinForm.$valid) { alert('Valid !'); } else { alert('Other !'); }
                   
			}
   
		}
   
		$scope.close_customisation = function( ){
   
			$scope.in_customisation         = false ;
			$scope.current_schema           = -1 ;
			$scope.current_element           = null ;
   
		}
		//
		//////////////////////////////////
   
   
		////////////////////////////////// Code Generation Well
		//
		// Model
		$scope.code_generated = false ;
   
   
		// Controller
   
		$scope.generate   = function() { $scope.code_generated = true ; }
   
		$scope.get_target = function(targ_name) {
		
			Devices.get( { 	uuid : $routeParams.deviceId, command:targ_name },
				function (res) { window.location.href= Niom.url + res.path ; },                                                        
				function() { alert('Target ' + targ_name + ' not found.' )}
			) 
		}
		
		$scope.get_targets = function(targ_name) {
		
			var settings = { fw : $scope.target_data_fw , sw : $scope.target_data_sw, options : $scope.target_data_options } ; 
		
			Devices.generate( { uuid : $routeParams.deviceId, command:"mix" }, settings, 
				function (res) { window.location.href= Niom.url + res.path ; },                                                        
				function() { alert('Target not created.' )}
			) 
		}
		
		
		$scope.load = function()
		{
			$location.path( '/devices/' + $routeParams.deviceId + '/load' ); 
		}
   
   
		$scope.target_schema_fw 		= [
		{ property: 'osc', label:'Osc', type: 'checkbox' },
		{ property: 'midi', label:'Midi', type: 'checkbox' }
		];
		
		$scope.target_schema_sw 		= [	{ property: 'pd', label:'Pure Data', type: 'checkbox' } ];
		
		$scope.target_schema_options 	= [	{ property: 'test', label:'Test Board', type: 'checkbox' } ];
		
		$scope.target_data_fw 			= { 'osc' : true, 'midi' : false };
		$scope.target_data_sw 			= { 'pd' : true };
		$scope.target_data_options 		= { 'test' : true };
	
	

		//
		//////////////////////////////////
   
	});