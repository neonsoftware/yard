angular.module('niomApp')
.controller('ApplicationsListCtrl', function($scope, $http, $resource, $location, Applications )
{

	document.getElementById('mainscaffold').closeDrawer();

	$scope.applications = Applications.query( function() {

		angular.forEach( $scope.applications, function( elem, index )
		{		
			console.log('Adding expand variable to application' , index, 'with company ', elem.company );
		
			elem.expand = false;
			//$scope.image_URI_db[url] = url;
			//if (chrome.serial) { $scope.image_URI_db[url] = "" ; loadImage( url, $scope.at_image_load, $scope.image_URI_db ); }
		});



	} );
   
	$scope.toggle	 	= function( application ){ console.log("expanding ", application.expand, "com ", application.company);application.expand = !application.expand; }

	$scope.open_detail 	= function( application ){ $location.path( '/applications/' + application.id ); }
   
	$scope.delete_application = function(application){ Applications.delete_application( {uuid : application.id, command : "delete" },function() { $scope.applications = Applications.query( );}); }

	$scope.written 		= function(application){ Applications.delete_application( {uuid : application.id, command : "written" },function() { $scope.applications = Applications.query( );}); }
	$scope.called 		= function(application){ Applications.delete_application( {uuid : application.id, command : "called" },function() { $scope.applications = Applications.query( );}); }
	$scope.interviewed  = function(application){ Applications.delete_application( {uuid : application.id, command : "interviewed" },function() { $scope.applications = Applications.query( );}); }
	$scope.followup 	= function(application){ Applications.delete_application( {uuid : application.id, command : "followup" },function() { $scope.applications = Applications.query( );}); }

	$scope.new 	= function( ) {  
		console.log();
		$location.path( '/applications/new' );
	}

})

.controller('ApplicationsDetailCtrl', function($scope, $route, $routeParams, $http, $resource, $location, $timeout, Applications)
{

	document.getElementById('mainscaffold').closeDrawer();

	console.log("Update");

	$scope.current_application = Applications.get( {uuid : $routeParams.applicationId }, function () {
		
		console.log("loaded.");
		document.getElementById('appl-written').checked = $scope.current_application.written ;
		document.getElementById('appl-called').checked = $scope.current_application.called ;
		document.getElementById('appl-followup').checked = $scope.current_application.followup ;
		document.getElementById('appl-interviewed').checked = $scope.current_application.interviewed ;

	});

	$scope.discard 	= function( ) {  
		console.log();
		$location.path( '/applications' );
	}

	$scope.update = function(){

		$scope.current_application.company = document.getElementById('appl-company').inputValue;
		$scope.current_application.portal = document.getElementById('appl-portal').inputValue;
		$scope.current_application.position = document.getElementById('appl-position').inputValue;
		$scope.current_application.salary = document.getElementById('appl-salary').inputValue;
		$scope.current_application.contract = document.getElementById('appl-contract').inputValue;
		$scope.current_application.latitude = document.getElementById('appl-latitude').inputValue;
		$scope.current_application.longitude = document.getElementById('appl-longitude').inputValue;
		$scope.current_application.skills = document.getElementById('appl-skills').inputValue;
		$scope.current_application.written = document.getElementById('appl-written').checked;
		$scope.current_application.called = document.getElementById('appl-called').checked;
		$scope.current_application.followup = document.getElementById('appl-followup').checked;
		$scope.current_application.interviewed = document.getElementById('appl-interviewed').checked;
		$scope.current_application.notes = document.getElementById('appl-notes').inputValue;
		$scope.current_application.next = document.getElementById('appl-next').inputValue;
		$scope.current_application.cover = document.getElementById('appl-cover').inputValue;
		$scope.current_application.address1 = document.getElementById('appl-address1').inputValue;
		$scope.current_application.address2 = document.getElementById('appl-address2').inputValue;
		$scope.current_application.c1name = document.getElementById('appl-c1name').inputValue;
		$scope.current_application.c1mail = document.getElementById('appl-c1mail').inputValue;
		$scope.current_application.c1phone = document.getElementById('appl-c1phone').inputValue;
		$scope.current_application.c2name = document.getElementById('appl-c2name').inputValue;
		$scope.current_application.c2mail = document.getElementById('appl-c2mail').inputValue;
		$scope.current_application.c2phone = document.getElementById('appl-c2phone').inputValue;
		$scope.current_application.c3name = document.getElementById('appl-c3name').inputValue;
		$scope.current_application.c3mail = document.getElementById('appl-c3mail').inputValue;
		$scope.current_application.c3phone = document.getElementById('appl-c3phone').inputValue;
		$scope.current_application.c4name = document.getElementById('appl-c4name').inputValue;
		$scope.current_application.c4mail = document.getElementById('appl-c4mail').inputValue;
		$scope.current_application.c4phone = document.getElementById('appl-c4phone').inputValue;

		$scope.current_application.$update( {uuid:$scope.current_application.id}, function(){ console.log("Updated !"); $location.path( '/applications' );} );

	};
			
	
})
.controller('ApplicationsNewCtrl', function($scope, $route, $routeParams, $http, $resource, $location, $timeout, Applications)
{

	console.log("New");

	document.getElementById('mainscaffold').closeDrawer();

	$scope.update = function(){

		$scope.current_application = new Applications();

		$scope.current_application.company = document.getElementById('appl-company').inputValue;
		$scope.current_application.portal = document.getElementById('appl-portal').inputValue;
		$scope.current_application.position = document.getElementById('appl-position').inputValue;
		$scope.current_application.salary = document.getElementById('appl-salary').inputValue;
		$scope.current_application.contract = document.getElementById('appl-contract').inputValue;
		$scope.current_application.latitude = document.getElementById('appl-latitude').inputValue;
		$scope.current_application.longitude = document.getElementById('appl-longitude').inputValue;
		$scope.current_application.skills = document.getElementById('appl-skills').inputValue;
		$scope.current_application.written = document.getElementById('appl-written').checked;
		$scope.current_application.called = document.getElementById('appl-called').checked;
		$scope.current_application.followup = document.getElementById('appl-followup').checked;
		$scope.current_application.interviewed = document.getElementById('appl-interviewed').checked;
		$scope.current_application.notes = document.getElementById('appl-notes').inputValue;
		$scope.current_application.next = document.getElementById('appl-next').inputValue;
		$scope.current_application.cover = document.getElementById('appl-cover').inputValue;
		$scope.current_application.address1 = document.getElementById('appl-address1').inputValue;
		$scope.current_application.address2 = document.getElementById('appl-address2').inputValue;
		$scope.current_application.c1name = document.getElementById('appl-c1name').inputValue;
		$scope.current_application.c1mail = document.getElementById('appl-c1mail').inputValue;
		$scope.current_application.c1phone = document.getElementById('appl-c1phone').inputValue;
		$scope.current_application.c2name = document.getElementById('appl-c2name').inputValue;
		$scope.current_application.c2mail = document.getElementById('appl-c2mail').inputValue;
		$scope.current_application.c2phone = document.getElementById('appl-c2phone').inputValue;
		$scope.current_application.c3name = document.getElementById('appl-c3name').inputValue;
		$scope.current_application.c3mail = document.getElementById('appl-c3mail').inputValue;
		$scope.current_application.c3phone = document.getElementById('appl-c3phone').inputValue;
		$scope.current_application.c4name = document.getElementById('appl-c4name').inputValue;
		$scope.current_application.c4mail = document.getElementById('appl-c4mail').inputValue;
		$scope.current_application.c4phone = document.getElementById('appl-c4phone').inputValue;

		$scope.current_application.$save( function() { console.log("SAVED"); $location.path( '/applications' ); } );

	}
			
	
});