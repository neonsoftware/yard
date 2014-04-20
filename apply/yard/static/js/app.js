'use strict';



window.routes = {
'/devices': {
	templateUrl: 'html/partials/devices.html',
	controller: 'DevicesListCtrl',
	requireLogin: true
},
'/devices/:deviceId': {
	templateUrl: 'html/partials/detail.html',
	controller: 'DevicesDetailCtrl',
	requireLogin: true
},
'/simulate_start': {
	templateUrl: 'html/partials/simulate_start.html',
	controller: 'SimulateStartCtrl',
	requireLogin: true
},
'/simulate/:size_y/:size_x': {
	templateUrl: 'html/partials/simulate.html',
	controller: 'SimulateCtrl',
	requireLogin: true
},
'/connect': {
	templateUrl: 'html/partials/connect.html',
	controller: 'ConnectCtrl',
	requireLogin: true
},
'/create': {
	templateUrl: 'html/partials/create.html',
	requireLogin: true
},
'/devices/:deviceId/load': {
	templateUrl: 'html/partials/load.html',
	controller: 'LoadCtrl',
	requireLogin: true
},
'/upload': {
	templateUrl: 'html/partials/upload.html',
	controller: 'UploadCtrl',
	requireLogin: true
}
};

var remoteUrl = 'http://127.0.0.1' ;
//var remoteUrl = 'http://192.168.0.33' ;

angular.module('niomApp', [ 'gridster', 'ngRoute' , 'ngResource', 'ui.bootstrap' , 'autoFields', 'ngUpload'])
.config(['$routeProvider',
function($routeProvider) {
	//this loads up our routes dynamically from the previous object 
	for(var path in window.routes) 
	{
		$routeProvider.when(path, window.routes[path]); 
	}
	
	$routeProvider.otherwise({redirectTo: '/'});
}])
.run( ['$rootScope', function($rootScope){
	$rootScope.$on("$locationChangeStart", function(event, next, current) { 
		for(var i in window.routes) 
		{
			if(next.indexOf(i) != -1) 
			{
				//if(window.routes[i].requireLogin && !SessionService.getUserAuthenticated()) {
				//	alert("You need to be authenticated to see this page!");
				//	event.preventDefault();
				//}
			} 
		}
	}); 
}])
.factory( 'Niom', function(){ 

	var actualUrl ;

	if (chrome.serial)
	{
		actualUrl = '';
	}
	else
	{
		actualUrl = remoteUrl;
	}
	
	return { url: actualUrl };
})
.factory('Devices', ['$resource', function($resource) { return $resource( remoteUrl + '/devices/:uuid/:command', {uuid:"@uuid"}, {update: { method: 'PUT' }, generate: { method: 'PUT' } } ) ; } ] )
.factory('Components', ['$resource', function($resource) { return $resource( remoteUrl + '/components/:uuid', {uuid:"@uuid"} ) } ])
.service('SessionService', function(){ 
	var userIsAuthenticated = false;
	
	this.setUserAuthenticated = function(value){ 
		userIsAuthenticated = value;
	};

	his.getUserAuthenticated = function(){ 
		return userIsAuthenticated;
	};
});

