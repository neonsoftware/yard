var loadImage = function(uri, callback, db) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function() {
	  var success = false;
	  if (xhr.status==200){ success = true; }
	  callback(window.webkitURL.createObjectURL(xhr.response), uri, db, success );

  }
  xhr.open('GET', uri, true);
  xhr.send();
}


angular.module('niomApp')
.controller('DevicesListCtrl', function($scope, $http, $resource, $location, Devices, Components, Niom )
{
    
	$scope.image_URI_db = {};
	$scope.image_prefix = Niom.url + '/media/targets/' ;
	
	
	$scope.at_image_load = function (blob_uri, requested_uri, db, success) { 
				if (success)
				{
					console.log( 'loaded URI for url: ' + requested_uri ) ;
					db[requested_uri] = blob_uri;
					$scope.$apply();
				}
			};
	
	$scope.loadImages = function (){
		
		angular.forEach( $scope.devices, function( elem, index )
		{
			var url = $scope.image_prefix + elem.uuid + '/thumbnails/20px.jpg';
		
			console.log('loading' + url );
		
			$scope.image_URI_db[url] = url;
			if (chrome.serial) { $scope.image_URI_db[url] = "" ; loadImage( url, $scope.at_image_load, $scope.image_URI_db ); }
		});
		
	};

	$scope.devices = Devices.query( $scope.loadImages );
   
	$scope.open_device_detail = function( device ){ $scope.current_device = device ; $location.path( '/devices/' + device.uuid ); }
   
	$scope.delete_device = function(item){ item.$delete( function() {$scope.devices = Devices.query();}); }
   
});