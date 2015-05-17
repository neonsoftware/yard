angular.module('niomApp')
.controller('DocumentsListCtrl', function($scope, $http, $resource, $location, $sanitize, $sce, $compile, Categories, Pieces, Documents )
{
	document.getElementById('mainscaffold').closeDrawer();
	$scope.documents 	= Documents.query( );
	$scope.edit 		= function( item ){ $location.path( '/documents/' + item.id ); };
	$scope.delete 		= function( item )	{ item.$delete( function() { $location.path( '/documents' ); }); };
	$scope.new 			= function( ){ $location.path( '/documents/new' ); };
})

.controller('DocumentsNewCtrl', function($scope, $http, $resource, $location, Pieces, Categories, Documents )
{
	document.getElementById('mainscaffold').closeDrawer();
	$scope.categories 	= Categories.query( );
	$scope.use 			= function( item ){ $location.path( '/documents/new/' + item.id ); };
	$scope.new 			= function( ){ $location.path( '/documents/new/empty' ); };
})
.controller('DocumentsNewEmptyCtrl', function($scope, $http, $resource, $location, Pieces, Categories, Documents )
{
	document.getElementById('mainscaffold').closeDrawer();
	$scope.docx = function() {
		Documents.generate(
					{ uuid: 1, command : "docx" }, 
					{ "text" : document.getElementById('text-area-content').value },
					function (res) { console.log( "hex file : ", res.path ) ; window.location.href= res.path ; },
					function() { alert('Target not created.' );}
				);
	};
})
.controller('DocumentsNewTemplateCtrl', function($scope, $http, $resource, $routeParams, $location, Pieces, Categories, Documents )
{   
	document.getElementById('mainscaffold').closeDrawer();
	
	$scope.artifact = [];

	$scope.current_template = Categories.get( {uuid : $routeParams.templateId }, function () {
			console.log("Arrived ! appending."); 
			$scope.artifact = angular.fromJson($scope.current_template.pieces);
			angular.forEach($scope.artifact, function(value, key) {
				value.legend = angular.fromJson(value.legend);
			});
		});

	$scope.docx = function() {
		Documents.generate(
					{ uuid: 1, command : "docx" }, 
					{ "text" : document.getElementById('text-area-content').value },
					function (res) { console.log( "hex file : ", res.path ) ; window.location.href= res.path ; },
					function() { alert('Target not created.' );}
				);
	};
});

angular.module('niomApp').filter('fillTemplate', function(){
		return function(text, scope){ 
			
			console.log("Passing stuff ");
						
			var fullSubstitute = "";
			angular.forEach(scope.artifact, function(value, key) {
				fullSubstitute = fullSubstitute.concat( value.content );
			});

			console.log("--> Total is : ", fullSubstitute);
			angular.forEach(scope.artifact, function(value, key) {

				angular.forEach(value.legend, function(v, k){
					if (v.value.length > 0 )
					{
						console.log("--> Substituting : ", k, " with ", v.value);
						fullSubstitute = fullSubstitute.replace(k,v.value);
					}
				});
			});

			//tempSubstituted = tempSubstituted.replace(k,v.value);
			return fullSubstitute;
		};
});