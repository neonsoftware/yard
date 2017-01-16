'use strict';

window.routes = {
'/applications/new': {
	templateUrl: 'static/yard/html/partials/applications_new.html',
	controller: 'ApplicationsNewCtrl',
	requireLogin: true
},
'/applications/cards/:applicationId': {
	templateUrl: 'static/yard/html/partials/applications_cards.html',
	controller: 'ApplicationsCardDetailCtrl',
	requireLogin: true
},
'/applications/cards': {
	templateUrl: 'static/yard/html/partials/applications_cards.html',
	controller: 'ApplicationsListCtrl',
	requireLogin: true
},
'/applications/:applicationId': {
	templateUrl: 'static/yard/html/partials/applications_new.html',
	controller: 'ApplicationsDetailCtrl',
	requireLogin: true
},
'/applications': {
	templateUrl: 'static/yard/html/partials/applications_list.html',
	controller: 'ApplicationsListCtrl',
	requireLogin: false
},
'/documents/new/empty': {
	templateUrl: 'static/yard/html/partials/documents_new_empty.html',
	controller: 'DocumentsNewEmptyCtrl',
	requireLogin: true
},
'/documents/new/:templateId': {
	templateUrl: 'static/yard/html/partials/documents_new_template.html',
	controller: 'DocumentsNewTemplateCtrl',
	requireLogin: true
},
'/documents/new': {
	templateUrl: 'static/yard/html/partials/documents_new.html',
	controller: 'DocumentsNewCtrl',
	requireLogin: true
},
'/documents/:documentId': {
	templateUrl: 'static/yard/html/partials/documents_detail.html',
	controller: 'DocumentsDetailCtrl',
	requireLogin: true
},
'/documents': {
	templateUrl: 'static/yard/html/partials/documents_list.html',
	controller: 'DocumentsListCtrl',
	requireLogin: true
},
'/skills': {
	templateUrl: 'static/yard/html/partials/skills_list.html',
	controller: 'SkillsListCtrl',
	requireLogin: true
},
'/skills/:skillId': {
	templateUrl: 'static/yard/html/partials/skills_detail.html',
	controller: 'SkillsDetailCtrl',
	requireLogin: true
},
'/pieces': {
	templateUrl: 'static/yard/html/partials/pieces_list.html',
	controller: 'PiecesListCtrl',
	requireLogin: true
},
'/pieces/new': {
	templateUrl: 'static/yard/html/partials/pieces_new.html',
	controller: 'PiecesNewCtrl',
	requireLogin: true
},
'/pieces/:pieceId': {
	templateUrl: 'static/yard/html/partials/pieces_new.html',
	controller: 'PiecesDetailCtrl',
	requireLogin: true
},
'/categories': {
	templateUrl: 'static/yard/html/partials/categories_list.html',
	controller: 'CategoriesListCtrl',
	requireLogin: true
},
'/categories/new': {
	templateUrl: 'static/yard/html/partials/categories_detail.html',
	controller: 'CategoriesDetailCtrl',
	requireLogin: true
},
'/categories/:categoryId': {
	templateUrl: 'static/yard/html/partials/categories_detail.html',
	controller: 'CategoriesDetailCtrl',
	requireLogin: true
},
'/': {
	templateUrl: 'static/yard/html/partials/summary.html',
	controller: 'SummaryCtrl',
	requireLogin: false
},
};

//var remoteUrl = 'http://127.0.0.1' ;
var remoteUrl = 'http://127.0.0.1:8082' ;

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
.factory( 'Niom', function(){ 
	return { url: remoteUrl };
})
.factory('Applications', 	['$resource', function($resource) { return $resource( remoteUrl + '/applications/:uuid/:command', 	{uuid:"@uuid"}, {update: { method: 'PUT' }, generate: { method: 'POST' }, delete_application: { method: 'GET' } } ); } ] )
.factory('Skills', 			['$resource', function($resource) { return $resource( remoteUrl + '/skills/:uuid/:command', 		{uuid:"@uuid"}, {update: { method: 'PUT' }, generate: { method: 'PUT'  } } ); } ] )
.factory('Pieces', 			['$resource', function($resource) { return $resource( remoteUrl + '/pieces/:uuid/:command', 		{uuid:"@id"}, {update: { method: 'PUT' }, generate: { method: 'PUT'  } } ); } ] )
.factory('Categories', 		['$resource', function($resource) { return $resource( remoteUrl + '/categories/:uuid/:command', 	{uuid:"@id"},   {update: { method: 'PUT' }, generate: { method: 'PUT'  } } ); } ] )
.factory('Documents', 		['$resource', function($resource) { return $resource( remoteUrl + '/documents/:uuid/:command', 	    {uuid:"@id"},   {update: { method: 'PUT' }, generate: { method: 'PUT'  } } ); } ] );