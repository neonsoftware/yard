'use strict';

window.routes = {
'/applications/new': {
	templateUrl: 'static/html/partials/applications_new.html',
	controller: 'ApplicationsNewCtrl',
	requireLogin: true
},
'/applications/cards/:applicationId': {
	templateUrl: 'static/html/partials/applications_cards.html',
	controller: 'ApplicationsCardDetailCtrl',
	requireLogin: true
},
'/applications/cards': {
	templateUrl: 'static/html/partials/applications_cards.html',
	controller: 'ApplicationsListCtrl',
	requireLogin: true
},
'/applications/:applicationId': {
	templateUrl: 'static/html/partials/applications_new.html',
	controller: 'ApplicationsDetailCtrl',
	requireLogin: true
},
'/applications': {
	templateUrl: 'static/html/partials/applications_list.html',
	controller: 'ApplicationsListCtrl',
	requireLogin: false
},
'/documents/new/empty': {
	templateUrl: 'static/html/partials/documents_new_empty.html',
	controller: 'DocumentsNewEmptyCtrl',
	requireLogin: true
},
'/documents/new/:templateId': {
	templateUrl: 'static/html/partials/documents_new_template.html',
	controller: 'DocumentsNewTemplateCtrl',
	requireLogin: true
},
'/documents/new': {
	templateUrl: 'static/html/partials/documents_new.html',
	controller: 'DocumentsNewCtrl',
	requireLogin: true
},
'/documents/:documentId': {
	templateUrl: 'static/html/partials/documents_detail.html',
	controller: 'DocumentsDetailCtrl',
	requireLogin: true
},
'/documents': {
	templateUrl: 'static/html/partials/documents_list.html',
	controller: 'DocumentsListCtrl',
	requireLogin: true
},
'/skills': {
	templateUrl: 'static/html/partials/skills_list.html',
	controller: 'SkillsListCtrl',
	requireLogin: true
},
'/skills/:skillId': {
	templateUrl: 'static/html/partials/skills_detail.html',
	controller: 'SkillsDetailCtrl',
	requireLogin: true
},
'/pieces': {
	templateUrl: 'static/html/partials/pieces_list.html',
	controller: 'PiecesListCtrl',
	requireLogin: true
},
'/pieces/new': {
	templateUrl: 'static/html/partials/pieces_new.html',
	controller: 'PiecesNewCtrl',
	requireLogin: true
},
'/pieces/:pieceId': {
	templateUrl: 'static/html/partials/pieces_new.html',
	controller: 'PiecesDetailCtrl',
	requireLogin: true
},
'/categories': {
	templateUrl: 'static/html/partials/categories_list.html',
	controller: 'CategoriesListCtrl',
	requireLogin: true
},
'/categories/new': {
	templateUrl: 'static/html/partials/categories_detail.html',
	controller: 'CategoriesDetailCtrl',
	requireLogin: true
},
'/categories/:categoryId': {
	templateUrl: 'static/html/partials/categories_detail.html',
	controller: 'CategoriesDetailCtrl',
	requireLogin: true
},
'/': {
	templateUrl: 'static/html/partials/summary.html',
	controller: 'SummaryCtrl',
	requireLogin: false
},
};

//var remoteUrl = 'http://ec2-54-234-247-242.compute-1.amazonaws.com/' ;
//var remoteUrl = 'http://127.0.0.1' ;
//var remoteUrl = 'http://niom.eu/' ;
var remoteUrl = '' ;
//var remoteUrl = 'http://54.165.154.172' ;
//var remoteUrl = 'http://192.168.0.33' ;

//angular.module('niomApp', [ 'gridster', 'ngRoute' , 'ngResource', 'ui.bootstrap' , 'autoFields', 'ngUpload', 'ngSanitize'])

angular.module('niomApp', [ 'ngRoute' , 'ngResource'])
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
			// if(next.indexOf(i) != -1)
			// {
			// 	if(window.routes[i].requireLogin && !SessionService.getUserAuthenticated()) {
			// 		alert("You need to be authenticated to see this page!");
			// 		event.preventDefault();
			// 	}
			// }
		}
	});
}])
.factory( 'Niom', function(){
	return { url: remoteUrl };
})
.factory('Applications', 	['$resource', function($resource) { return $resource( remoteUrl + '/applications/:uuid/:command', 	{uuid:"@uuid"}, {update: { method: 'PUT' }, generate: { method: 'POST' }, delete_application: { method: 'GET' } } ); } ] )
.factory('Skills', 			['$resource', function($resource) { return $resource( remoteUrl + '/skills/:uuid/:command', 		{uuid:"@uuid"}, {update: { method: 'PUT' }, generate: { method: 'PUT'  } } ); } ] )
.factory('Pieces', 			['$resource', function($resource) { return $resource( remoteUrl + '/pieces/:uuid/:command', 		{uuid:"@id"}, {update: { method: 'PUT' }, generate: { method: 'PUT'  } } ); } ] )
.factory('Categories', 		['$resource', function($resource) { return $resource( remoteUrl + '/categories/:uuid/:command', 	{uuid:"@id"},   {update: { method: 'PUT' }, generate: { method: 'PUT'  } } ); } ] )
.factory('Documents', 		['$resource', function($resource) { return $resource( remoteUrl + '/documents/:uuid/:command', 	    {uuid:"@id"},   {update: { method: 'PUT' }, generate: { method: 'PUT'  } } ); } ] )
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
