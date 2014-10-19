from django.shortcuts import render, redirect
from django.template.loader import render_to_string
from django.http import HttpResponse

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from   django.conf 				import settings
from django.forms.models import model_to_dict

from   os						import path, makedirs, remove
from   shutil 					import copy, copytree, rmtree, move

from yard.models import Cover, Skill, Application, Company, Piece, PieceCategory
from yard.models import SkillForm, ApplicationForm, CompanyForm, PieceForm, PieceCategoryForm

from docx import Document

#document = Document()
#paragraph = document.add_paragraph('Lorem ipsum dolor sit amet.')
#document.save("Lettre de motivation.docx")

import json

@csrf_exempt
@login_required
def my_view( req ):
	return redirect('/static/index.html')

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
		updated_data =	json.loads( request.body )
		print '\tPost = ' , request.body
		p = Piece()
		print '\tNew, filling ' 
		p.fill(updated_data)
		p.save()
		print 'Updated and saved'
		return HttpResponse( json.dumps( p.myToObj() ), content_type="application/json" )

@csrf_exempt
def pieces_detail(request, id) :
	if request.method == 'GET':
		piece = get_object_or_404( Piece, id=id )
		return HttpResponse( json.dumps( piece.myToObj() ), content_type="application/json" )
	if request.method == 'PUT':
		updated_data =	json.loads( request.body )
		print '\tPut = ' , request.body
		piece = get_object_or_404( Piece, id=id )
		piece.fill(updated_data)
		piece.save()
		return HttpResponse( json.dumps( piece.myToObj() ), content_type="application/json" )
	if request.method == 'DELETE':
		piece = get_object_or_404( Piece, id=id )
		piece.delete()
		return HttpResponse( json.dumps( {"result" : "success"} ), content_type="application/json" )




@csrf_exempt
def categories_list(request) :

	if request.method == 'GET':
		return HttpResponse( json.dumps( [ category.myToObj() for category in PieceCategory.objects.all() ] ), content_type="application/json" )

	elif request.method == 'POST':
		updated_data =	json.loads( request.body )
		print '\tPut = ' , request.body
		c = PieceCategory( )
		c.fill(updated_data)
		c.save()
		return HttpResponse( json.dumps( c.myToObj() ), content_type="application/json" )

@csrf_exempt
def categories_detail(request, id) :
	if request.method == 'GET':
		category = get_object_or_404( PieceCategory, id=id )
		return HttpResponse( json.dumps( category.myToObj() ), content_type="application/json" )
	if request.method == 'PUT':
		updated_data =	json.loads( request.body )
		print '\tPut = ' , request.body
		piece = get_object_or_404( PieceCategory, id=id )
		piece.fill(updated_data)
		piece.save()
		return HttpResponse( json.dumps( piece.myToObj() ), content_type="application/json" )
	if request.method == 'DELETE':
		piece = get_object_or_404( PieceCategory, id=id )
		piece.delete()
		return HttpResponse( json.dumps( {"result" : "success"} ), content_type="application/json" )




@csrf_exempt
def documents_list(request) :
	if request.method == 'GET':
		return HttpResponse( json.dumps( [ doc.myToObj() for doc in Cover.objects.all() ] ), content_type="application/json" )

	elif request.method == 'POST':
		updated_data =	json.loads( request.body )
		print '\tPOST = ' , request.body
		d = Document( )
		d.fill(updated_data)
		d.save()
		return HttpResponse( json.dumps( d.myToObj() ), content_type="application/json" )

@csrf_exempt
def documents_detail(request, id) :

	if request.method == 'GET':
		doc = get_object_or_404( Cover, id=id )
		return HttpResponse( json.dumps( portal.myToObj() ), content_type="application/json" )
	if request.method == 'PUT':
		updated_data =	json.loads( request.body )
		print '\tPut = ' , request.body
		doc = get_object_or_404( Cover, id=id )
		doc.fill(updated_data)
		doc.save()
		return HttpResponse( json.dumps( doc.myToObj() ), content_type="application/json" )
	if request.method == 'DELETE':
		doc = get_object_or_404( Cover, id=id )
		doc.delete()
		return HttpResponse( json.dumps( {"result" : "success"} ), content_type="application/json" )

@csrf_exempt
def documents_docx(request, id) :

	if request.method == 'PUT':
		updated_data =	json.loads( request.body )
		print '\tPut = ' , request.body
		print '\tUser is = ' , str(request.user)

		path = settings.DOCS_URL + str(request.user)
		
		try : 
			rmtree ( path )
		except :
			pass

		makedirs(path)
		doc = Document()
		doc.add_paragraph(updated_data["text"])
		doc.save(path + '/demo.docx')
		return HttpResponse( json.dumps( {"path":"docs/" + str(request.user) +"/demo.docx"} ), content_type="application/json" )


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

		return HttpResponse( json.dumps( [ app.myToObj() for app in Application.objects.filter(user=request.user) ] ), content_type="application/json" )

	elif request.method == 'POST':
		updated_data =	json.loads( request.body )
		print 'New application, data :\n' , request.body
		application = Application()
		application.user = request.user
		application.fill(updated_data)
		application.save()
		print 'Created and saved'
		return HttpResponse( json.dumps( {"result":"success"} ), content_type="application/json" )
		#return redirect('/static/index.html#/applications')

@csrf_exempt
def applications_detail( request, id ) :
	if request.method == 'GET':
		application = get_object_or_404( Application, id=id )
		return HttpResponse( json.dumps( application.myToObj() ), content_type="application/json" )

	elif request.method == 'PUT':
		print 'Updating application', id, ' request body :\n' , request.body
		updated_data =	json.loads( request.body )
		application = get_object_or_404( Application, id=id )
		application.fill(updated_data)
		application.save()
		print 'Updated and saved'
		
		return HttpResponse( json.dumps( application.myToObj() ), content_type="application/json" )


def applications_delete( request, id ) :
	if request.method == 'GET':
		print 'called remove of ', id
		application = get_object_or_404( Application, id=id )
		application.delete()
		return HttpResponse( json.dumps( application.myToObj() ), content_type="application/json" )


def applications_written( request, id ) :
	if request.method == 'GET':
		print 'called written of ', id
		application = get_object_or_404( Application, id=id )
		application.written = not application.written 
		application.save()
		return HttpResponse( json.dumps( application.myToObj() ), content_type="application/json" )

def applications_called( request, id ) :
	if request.method == 'GET':
		print 'called called of ', id
		application = get_object_or_404( Application, id=id )
		application.called = not application.called
		application.save()
		return HttpResponse( json.dumps( application.myToObj() ), content_type="application/json" )

def applications_interviewed( request, id ) :
	if request.method == 'GET':
		print 'called interviewed of ', id
		application = get_object_or_404( Application, id=id )
		application.interviewed = not application.interviewed
		application.save()
		return HttpResponse( json.dumps( application.myToObj() ), content_type="application/json" )


def applications_followup( request, id ) :
	if request.method == 'GET':
		print 'called followup of ', id
		application = get_object_or_404( Application, id=id )
		application.followup = not application.followup
		application.save()
		return HttpResponse( json.dumps( application.myToObj() ), content_type="application/json" )
