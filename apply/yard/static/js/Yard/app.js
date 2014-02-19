//
// This file does nothing more that attach some REST
//
function accessAPI( restAddress, dataDescription, DOMObj )
{

	jQuery.ajax({
			  		type: "GET",
			  		url: restAddress,
			  		contentType : 'html; charset=utf-8',
			  		success: function(data) {
						$(DOMObj).html( data ) ;
						$("#content-header-title").html(dataDescription + "<small> List </small>" );
			  		},
			  		error: function(xhr) { alert("Error loading " + dataDescription  + " from the server.") ;  }
				});

}

	
$("#button_applications").click(function () {

  accessAPI( "/applications/", "Applications", ".content"  );

});

$("#button_covers").click(function () {

  accessAPI( "/covers/", "Cover Letters", ".content"  );

});


$("#button_companies").click(function () {

  accessAPI( "/companies/", "Companies", ".content"  );

});

$("#button_portals").click(function () {

  accessAPI( "/portals/", "Portals", ".content"  );

});

$("#button_skills").click(function () {

  accessAPI( "/skills/", "Skills", ".content"  );

});

$(document).ready(function(){


});




