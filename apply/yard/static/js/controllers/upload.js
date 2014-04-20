angular.module('niomApp')
.controller('UploadCtrl', function($scope, $http, $resource, $location, Devices, Components)
{
	console.log('Entered');
	
	$scope.complete = function (content) {
	    console.log('Done !');
		$scope.response = content ;//JSON.parse(content); // Presumed content is a json string!

	  };

   
});