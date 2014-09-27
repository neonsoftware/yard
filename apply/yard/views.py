from django.shortcuts import render, redirect
from django.template.loader import render_to_string
from django.http import HttpResponse

from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.forms.models import model_to_dict

from yard.models import Portal, Skill, Application, Company, Piece, PieceCategory
from yard.models import PortalForm, SkillForm, ApplicationForm, CompanyForm, PieceForm, PieceCategoryForm

import json

@csrf_exempt
def my_view( req ):

	#a = Artist.objects.all()

	return render( req, 'my_index.html', { }  )

@csrf_exempt
def portal_new( request ):
	if request.method == 'GET':
		return HttpResponse( json.dumps( { "html" : render_to_string('forms/simple_form.html', {'form': PortalForm() } ) } ) , content_type="application/json" ) 
		
@csrf_exempt
def skill_new( request ):
	if request.method == 'GET':
		return HttpResponse( json.dumps( { "html" : render_to_string('forms/simple_form.html', {'form': SkillForm() } ) } ) , content_type="application/json" ) 

@csrf_exempt
def application_new( request ):
	if request.method == 'GET':
		return HttpResponse( json.dumps( { "html" : render_to_string('forms/simple_form.html', {'form': ApplicationForm() } ) } ) , content_type="application/json" ) 

@csrf_exempt
def company_new( request ):
	if request.method == 'GET':
		return HttpResponse( json.dumps( { "html" : render_to_string('forms/simple_form.html', {'form': CompanyForm() } ) } ) , content_type="application/json" ) 

@csrf_exempt
def piece_new( request ):
	if request.method == 'GET':
		return HttpResponse( json.dumps( { "html" : render_to_string('forms/simple_form.html', {'form': PieceForm() } ) } ) , content_type="application/json" ) 
		
@csrf_exempt
def category_new( request ):
	if request.method == 'GET':
		return HttpResponse( json.dumps( { "html" : render_to_string('forms/simple_form.html', {'form': PieceCategoryForm()} ) } ) , content_type="application/json" ) 



@csrf_exempt
def skills_list(request) :

	if request.method == 'GET':
		return HttpResponse( json.dumps( [ skill.myToObj() for skill in Skill.objects.all() ] ), content_type="application/json" )

	elif request.method == 'POST':
		print '\tPost = ' , request.POST
		s = SkillForm( request.POST )
		s.save()
		return redirect('/static/index.html#/skills')

def skills_detail(request, id) :
	if request.method == 'GET':
		skill = get_object_or_404( Skill, id=id )
		return HttpResponse( json.dumps( skill.myToObj() ), content_type="application/json" )


@csrf_exempt
def pieces_list(request) :

	if request.method == 'GET':
		return HttpResponse( json.dumps( [ piece.myToObj() for piece in Piece.objects.all() ] ), content_type="application/json" )

	elif request.method == 'POST':
		print '\tPost = ' , request.POST
		p = PieceForm( request.POST )
		p.save()
		return redirect('/static/index.html#/pieces')

def pieces_detail(request, id) :
	if request.method == 'GET':
		piece = get_object_or_404( Piece, id=id )
		return HttpResponse( json.dumps( piece.myToObj() ), content_type="application/json" )




@csrf_exempt
def categories_list(request) :

	if request.method == 'GET':
		return HttpResponse( json.dumps( [ category.myToObj() for category in PieceCategory.objects.all() ] ), content_type="application/json" )

	elif request.method == 'POST':
		print '\tPost = ' , request.POST
		c = PieceCategoryForm( request.POST )
		c.save()
		return redirect('/static/index.html#/categories') 

def categories_detail(request, id) :
	if request.method == 'GET':
		category = get_object_or_404( PieceCategory, id=id )
		return HttpResponse( json.dumps( category.myToObj() ), content_type="application/json" )



@csrf_exempt
def portals_list(request) :
	if request.method == 'GET':
		return HttpResponse( json.dumps( [ port.myToObj() for port in Portal.objects.all() ] ), content_type="application/json" )

	elif request.method == 'POST':
		print '\tPost = ' , request.POST
		p = PortalForm( request.POST )
		p.save()
		return redirect('/static/index.html#/portals')

def portals_detail(request, id) :

	if request.method == 'GET':
		portal = get_object_or_404( Portal, id=id )
		return HttpResponse( json.dumps( portal.myToObj() ), content_type="application/json" )



@csrf_exempt
def companies_list(request) :
	if request.method == 'GET':
		return HttpResponse( json.dumps( [ comp.myToObj() for comp in Company.objects.all() ] ), content_type="application/json" )

	elif request.method == 'POST':
		print '\tPost = ' , request.POST
		c = CompanyForm( request.POST )
		c.save()
		return redirect('/static/index.html#/companies')

def companies_detail(request, id) :
	if request.method == 'GET':
		company = get_object_or_404( Company, id=id )
		return HttpResponse( json.dumps( company.myToObj() ), content_type="application/json" )




@csrf_exempt
def applications_list(request) :
	if request.method == 'GET':
		return HttpResponse( json.dumps( [ app.myToObj() for app in Application.objects.all() ] ), content_type="application/json" )

	elif request.method == 'POST':
		print '\tPost = ' , request.POST
		a = ApplicationForm( request.POST )
		a.save()
		return redirect('/static/index.html#/applications')
		
def applications_detail( request, id ) :
	if request.method == 'GET':
		application = get_object_or_404( Application, id=id )
		return HttpResponse( json.dumps( application.myToObj() ), content_type="application/json" )
		