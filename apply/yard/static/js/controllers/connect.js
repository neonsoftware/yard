angular.module('niomApp')
.controller('ConnectCtrl', function($scope, $http, $resource, $location, Devices, Components)
{
	/////////////////////////////////////////////
	//
	// My Lexing to extract the "/map" OSC message content from a SLIP encoded byte-stream
	//
	$scope.END_WAITING    		= 0;
	$scope.MAP_WAITING_SLASH  	= 1;
	$scope.MAP_WAITING_M  		= 2;
	$scope.MAP_WAITING_A  		= 3;
	$scope.MAP_WAITING_P  		= 4;
	$scope.MAP_OUT_COMMA  		= 5;
	$scope.MAP_OUT_TYPE   		= 6;
	$scope.MAP_BEGIN      		= 7;
	$scope.MAP_CONTENT    		= 8;

	// Characters ASCII code
	$scope.CHAR_SLASH     		= 47;
	$scope.CHAR_M         		= 109;
	$scope.CHAR_A         		= 97;
	$scope.CHAR_P         		= 112;
	$scope.CHAR_COMMA     		= 44;
	$scope.CHAR_S	     		= 115;
	$scope.CHAR_OPEN_BRACKET	= 123;
	$scope.CHAR_CLOSE     		= 93;

	// SLIP bytes
	$scope.CHAR_END     		= 0xC0;
	$scope.CHAR_ESC     		= 0xDB;
	$scope.CHAR_ESC_END 		= 0xDC;
	$scope.CHAR_ESC_ESC 		= 0xDD;

	// Initial state
	$scope.process_state 		= $scope.MAP_WAITING_SLASH ;

	// Buffers
	$scope.map_buffer 			= "";
	$scope.map_last   			= "";

	$scope.map_to_send			= "" ;
	$scope.map_id   			= 0 ;
	//
	////////////////////////////////////////////////////////////////

	$scope.check_last_map = function(){
		
		chrome.serial.disconnect( connectionId, disconnection_check);

		try 
		{ 
			JSON.parse( map_last );
			console.log ( '>>> Found valid map : %s' , map_last );
			send_map_to_webview( map_last );
		}
		catch (e) { console.log ( '### Found a non-valid map : %s' , map_last ); }
	}
	
	
	$scope.process_data_array = function( new_data )
	{
		console.log( "The array lenght is  %d " , new_data.byteLength );
		
		for ( var i=0 ; i < new_data.byteLength ; i++)
		{

		var	num = 0 + new_data[i] ;
		
		console.log( "Received num %d " , num );

		switch ( $scope.process_state )
		{
			case $scope.END_WAITING:
			  if ( num == $scope.CHAR_END )
			  {
			  	console.log (">>>>>>> Found an End !");
			    $scope.process_state = $scope.MAP_WAITING_SLASH ;
			  }
			  break ;

			case $scope.MAP_WAITING_SLASH:

			  if ( num == $scope.CHAR_SLASH )
			  {
			  	console.log (">>>>>>> Found a slash  !");
				$scope.process_state = $scope.MAP_WAITING_M ;
			  }
			  else
			  {
			  	$scope.process_state = $scope.END_WAITING ;
			  }
	
		  	  break ;
		
		    case MAP_WAITING_M:

			  if ( num == $scope.CHAR_M )
			  {
			  	console.log (">>>>>>> Found an M  !");
				$scope.process_state = $scope.MAP_WAITING_A ;
			  }
			  else
			  {
			  	$scope.process_state = $scope.END_WAITING ;
			  }
	
		  	  break ;

		    case $scope.MAP_WAITING_A:

			  if ( num == $scope.CHAR_A )
			  {
			  	console.log (">>>>>>> Found a A  !");
				$scope.process_state = $scope.MAP_WAITING_P ;
			  }
			  else
			  {
			  	$scope.process_state = $scope.END_WAITING ;
			  }
	
		  	  break ;
		
			case $scope.MAP_WAITING_P:

			  if ( num == $scope.CHAR_P )
			  {
			  	console.log (">>>>>>> Found a P  !");
				$scope.process_state = $scope.MAP_OUT_COMMA ;
			  }
			  else
			  {
			  	$scope.process_state = $scope.END_WAITING ;
			  }
			  break ;

			case $scope.MAP_OUT_COMMA:

			  if ( num == $scope.CHAR_COMMA )
			  {
			  	console.log (">>>>>>> Found a COMMA  !");
				$scope.process_state = $scope.MAP_OUT_TYPE ;
			  }
			  break ;

			case $scope.MAP_OUT_TYPE:

			  if ( num == $scope.CHAR_S )
			  {
			  	console.log (">>>>>>> Found the TYPE S  !");
				$scope.process_state = $scope.MAP_BEGIN ;
			  }
			  break ;

		
			case $scope.MAP_BEGIN:

			  if ( num == $scope.CHAR_OPEN_BRACKET )
			  {
			  	console.log (">>>>>>> Found open bracket {");

			    b = String.fromCharCode(num);
				$scope.map_buffer = $scope.map_buffer + b ;	
				$scope.process_state = $scope.MAP_CONTENT ;
			  }
			  break ;
		
			case $scope.MAP_CONTENT:

			  if ( num != $scope.CHAR_CLOSE )
			  {
			  	//console.log (">>>>>>> Found good stuff  !");

			    b = String.fromCharCode(num);
				$scope.map_buffer = $scope.map_buffer + b ;	
			  }
			  else
			  {
				map_buffer = map_buffer + " ]}";
		  	
				console.log (">>>>>>> Found all !");

				$scope.process_state = $scope.END_WAITING ;
				$scope.map_last   = map_buffer;
				$scope.map_buffer = "";
				$scope.check_last_map();
			  }
			  break ;
	
		}
		
		}

	}
	
	$scope.connection_successful = false ;
	
	$scope.ports = [ "" ];
	
	$scope.selected_port = "";
	
	$scope.connectionId = -1 ;
	
	$scope.connect_to_port = function (){
		
		console.log('Connecting to port : ' + $scope.selected_port );
		
		if ( $scope.connectionId != -1 ) 
		{
			chrome.serial.disconnect(connectionId, $scope.connect_to_port);
		}
		
		chrome.serial.connect($scope.selected_port, { bitrate : 38400 } , $scope.onConnect);
	};
	
	$scope.buildPortPicker = function( ports ) 
	{
		console.log('buildPortPicker');
		console.log('There are : ' + ports.length );
		
		$scope.ports = [];
		
		angular.forEach( ports , function( elem, index )
		{
			$scope.ports.push(elem.path) ;
		} );
		
		$scope.$apply();
	}  
	
	$scope.onConnect = function (connectionInfo) 
	{	
	    if (!connectionInfo) { console.log('Could not open'); return; }
		
	    connectionId = connectionInfo.connectionId;
		$scope.$apply();
		console.log('Connected');

		chrome.serial.onReceive.addListener( function(info) { console.log( 'recived data' ) ; $scope.process_data_array( new Uint8Array( info.data ) ) } ) ;
	};
	
	chrome.serial.getDevices( $scope.buildPortPicker );
	
});