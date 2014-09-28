'use strict';

window.routes = {
'/applications/:applicationId': {
	templateUrl: 'html/partials/applications_detail.html',
	controller: 'ApplicationsDetailCtrl',
	requireLogin: true
},
'/applications': {
	templateUrl: 'html/partials/applications_list.html',
	controller: 'ApplicationsListCtrl',
	requireLogin: true
},
'/companies': {
	templateUrl: 'html/partials/companies_list.html',
	controller: 'CompaniesListCtrl',
	requireLogin: true
},
'/companies/:companyId': {
	templateUrl: 'html/partials/companies_detail.html',
	controller: 'CompaniesDetailCtrl',
	requireLogin: true
},
'/skills': {
	templateUrl: 'html/partials/skills_list.html',
	controller: 'SkillsListCtrl',
	requireLogin: true
},
'/skills/:skillId': {
	templateUrl: 'html/partials/skills_detail.html',
	controller: 'SkillsDetailCtrl',
	requireLogin: true
},
'/pieces': {
	templateUrl: 'html/partials/pieces_list.html',
	controller: 'PiecesListCtrl',
	requireLogin: true
},
'/pieces/:pieceId': {
	templateUrl: 'html/partials/pieces_detail.html',
	controller: 'PiecesDetailCtrl',
	requireLogin: true
},
'/categories': {
	templateUrl: 'html/partials/categories_list.html',
	controller: 'CategoriesListCtrl',
	requireLogin: true
},
'/categories/:categoryId': {
	templateUrl: 'html/partials/categories_detail.html',
	controller: 'CategoriesDetailCtrl',
	requireLogin: true
}
};

//var remoteUrl = 'http://ec2-54-234-247-242.compute-1.amazonaws.com/' ;
var remoteUrl = 'http://127.0.0.1' ;
//var remoteUrl = 'http://54.165.154.172' ;
//var remoteUrl = 'http://192.168.0.33' ;

//angular.module('niomApp', [ 'gridster', 'ngRoute' , 'ngResource', 'ui.bootstrap' , 'autoFields', 'ngUpload', 'ngSanitize'])

angular.module('niomApp', [ 'ngRoute' , 'ngResource', 'ngSanitize'])
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
.factory('Applications', ['$resource', function($resource) { return $resource( remoteUrl + '/applications/:uuid/:command', {uuid:"@uuid"}, {update: { method: 'PUT' }, generate: { method: 'PUT' }, delete_application: { method: 'GET' } } ); } ] )
.factory('Companies', ['$resource', function($resource) { return $resource( remoteUrl + '/companies/:uuid/:command', {uuid:"@uuid"}, {update: { method: 'PUT' }, generate: { method: 'PUT' } } ); } ] )
.factory('Skills', ['$resource', function($resource) { return $resource( remoteUrl + '/skills/:uuid/:command', {uuid:"@uuid"}, {update: { method: 'PUT' }, generate: { method: 'PUT'} } ); } ] )
.factory('Pieces', ['$resource', function($resource) { return $resource( remoteUrl + '/pieces/:uuid/:command', {uuid:"@uuid"}, {update: { method: 'PUT' }, generate: { method: 'PUT'} } ); } ] )
.factory('Categories', ['$resource', function($resource) { return $resource( remoteUrl + '/categories/:uuid/:command', {uuid:"@uuid"}, {update: { method: 'PUT' }, generate: { method: 'PUT'} } ); } ] )
.service('SessionService', function(){ 
	var userIsAuthenticated = false;
	
	this.setUserAuthenticated = function(value){ 
		userIsAuthenticated = value;
	};

	his.getUserAuthenticated = function(){ 
		return userIsAuthenticated;
	};
})
.directive('loadedTemplate', function ($compile) {
    return {
        restrict: "E",
        template: '',
        scope: {
            myvar: "=",
            myhtml: "="
        },
        link: function(scope, elt, attrs) {
			scope.$watch('myhtml', function(newValue, oldValue) {
			                if (newValue)
			                    console.log("I see a data change!");
					            var element = angular.element(scope.myhtml);
					            var test = $compile(element)(scope);
					            elt.append(test);
			            }, true);
            
        }
    };
});

