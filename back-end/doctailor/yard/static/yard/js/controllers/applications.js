function fillApplicationWithCurrentValues(new_application) {
	new_application.company = document.getElementById('appl-company').value;
	new_application.portal = document.getElementById('appl-portal').value;
	new_application.position = document.getElementById('appl-position').value;
	new_application.company_link = document.getElementById('appl-company_link').value;
	new_application.portal_link = document.getElementById('appl-portal_link').value;
	new_application.position_link = document.getElementById('appl-position_link').value;
	new_application.salary = document.getElementById('appl-salary').value;
	new_application.contract = document.getElementById('appl-contract').value;
	new_application.latitude = document.getElementById('appl-latitude').value;
	new_application.longitude = document.getElementById('appl-longitude').value;
	new_application.skills = document.getElementById('appl-skills').value;
	new_application.written = document.getElementById('appl-written').checked;
	new_application.called = document.getElementById('appl-called').checked;
	new_application.followup = document.getElementById('appl-followup').checked;
	new_application.interviewed = document.getElementById('appl-interviewed').checked;
	new_application.notes = document.getElementById('appl-notes').value;
	new_application.next = document.getElementById('appl-next').value;
	new_application.cover = document.getElementById('appl-cover').value;
	new_application.address1 = document.getElementById('appl-address1').value;
	new_application.address2 = document.getElementById('appl-address2').value;
	new_application.c1name = document.getElementById('appl-c1name').value;
	new_application.c1mail = document.getElementById('appl-c1mail').value;
	new_application.c1phone = document.getElementById('appl-c1phone').value;
	new_application.c2name = document.getElementById('appl-c2name').value;
	new_application.c2mail = document.getElementById('appl-c2mail').value;
	new_application.c2phone = document.getElementById('appl-c2phone').value;
	new_application.c3name = document.getElementById('appl-c3name').value;
	new_application.c3mail = document.getElementById('appl-c3mail').value;
	new_application.c3phone = document.getElementById('appl-c3phone').value;
	new_application.c4name = document.getElementById('appl-c4name').value;
	new_application.c4mail = document.getElementById('appl-c4mail').value;
	new_application.c4phone = document.getElementById('appl-c4phone').value;
}

angular.module('niomApp')
.controller('ApplicationsListCtrl', function($scope, $http, $resource, $location, Applications )
{
	//document.getElementById('mainscaffold').closeDrawer();

	$scope.applications = Applications.query( function() {
		angular.forEach( $scope.applications, function( elem, index )
		{		
			console.log('Adding expand variable to application' , index, 'with company ', elem.company );		
			elem.expand = false;
		});
	} );
   
	$scope.toggle	 	= function( application ){ console.log("expanding ", application.expand, "com ", application.company);application.expand = !application.expand; }
	$scope.new 	= function( ) {  
		console.log();
		$location.path( '/applications/new' );
	}

	$scope.open_detail 	= function( application ){ $location.path( '/applications/cards/' + application.id ); }
	$scope.open_edit 	= function( application ){ $location.path( '/applications/' + application.id ); }

	$scope.delete_application = function(application){ Applications.delete_application( {uuid : application.id, command : "delete" },function() { $scope.applications = Applications.query( );}); }
	$scope.written 		= function(application){ Applications.delete_application( {uuid : application.id, command : "written" },function() { $scope.applications = Applications.query( );}); }
	$scope.called 		= function(application){ Applications.delete_application( {uuid : application.id, command : "called" },function() { $scope.applications = Applications.query( );}); }
	$scope.interviewed  = function(application){ Applications.delete_application( {uuid : application.id, command : "interviewed" },function() { $scope.applications = Applications.query( );}); }
	$scope.followup 	= function(application){ Applications.delete_application( {uuid : application.id, command : "followup" },function() { $scope.applications = Applications.query( );}); }
})

.controller('ApplicationsCardDetailCtrl', function($scope, $route, $routeParams, $http, $resource, $location, $timeout, Applications)
{
	$scope.applications = [];
	//document.getElementById('mainscaffold').closeDrawer();
	console.log("Indide CARD DETAIL !"); 

	$scope.current_application = Applications.get( {uuid : $routeParams.applicationId }, function () {
		console.log("Arrived ! appending."); 
		$scope.applications = [ $scope.current_application ];
	});

	// Just copied from above
	$scope.open_edit 	= function( application ){ $location.path( '/applications/' + application.id ); }
	$scope.delete_application = function(application){ Applications.delete_application( {uuid : application.id, command : "delete" },function() { $scope.applications = Applications.query( );}); }
	$scope.written 		= function(application){ Applications.delete_application( {uuid : application.id, command : "written" },function() { $scope.applications = Applications.query( );}); }
	$scope.called 		= function(application){ Applications.delete_application( {uuid : application.id, command : "called" },function() { $scope.applications = Applications.query( );}); }
	$scope.interviewed  = function(application){ Applications.delete_application( {uuid : application.id, command : "interviewed" },function() { $scope.applications = Applications.query( );}); }
	$scope.followup 	= function(application){ Applications.delete_application( {uuid : application.id, command : "followup" },function() { $scope.applications = Applications.query( );}); }
})

.controller('ApplicationsDetailCtrl', function($scope, $route, $routeParams, $http, $resource, $location, $timeout, Applications)
{
	//document.getElementById('mainscaffold').closeDrawer();
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
		fillApplicationWithCurrentValues($scope.current_application);
		$scope.current_application.$update( {uuid:$scope.current_application.id}, function(){ console.log("Updated !"); $location.path( '/applications' );} );
	};	
})
.controller('ApplicationsNewCtrl', function($scope, $route, $routeParams, $http, $resource, $location, $timeout, Applications)
{

	console.log("New");

	//document.getElementById('mainscaffold').closeDrawer();

	$scope.update = function(){

		$scope.current_application = new Applications();
		fillApplicationWithCurrentValues($scope.current_application);
		$scope.current_application.$save( function() { console.log("SAVED"); $location.path( '/applications' ); } );
	}
});