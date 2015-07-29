from django.shortcuts import render, redirect
from django.template.loader import render_to_string
from django.http import HttpResponse

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.forms.models import model_to_dict

from   os import path, makedirs, remove
from   shutil import copy, copytree, rmtree, move

from yard.models import Cover, Skill, Application, Piece, PieceCategory
from yard.models import SkillForm, ApplicationForm, PieceForm, PieceCategoryForm

from docx import Document

whitelist = ['ish', 'frankie', 'bomber', 'redbeard', 'bryan']

import json, subprocess

@csrf_exempt
@login_required
def my_view( request ):
	username = request.user.username
	print '\n++++++ User name is :' , username, '\n'
	return redirect('/static/dist/onefile/yard.html')

@csrf_exempt
def skills_list(request) :
	if request.method == 'GET':
		return HttpResponse( json.dumps( [ skill.myToObj() for skill in Skill.objects.filter(user=request.user) ] ), content_type="application/json" )

	elif request.method == 'POST':
		print '\tPost = ' , request.POST
		s = Skill()
		s.user = request.user
		s.save()
		return redirect('/static/index.html#/skills')

def skills_detail(request, id) :
	if request.method == 'GET':
		skill = get_object_or_404( Skill, id=id )
		return HttpResponse( json.dumps( skill.myToObj() ), content_type="application/json" )


@csrf_exempt
def pieces_list(request) :

	if request.method == 'GET':
		return HttpResponse( json.dumps( [ piece.myToObj() for piece in Piece.objects.filter(user=request.user) ] ), content_type="application/json" )

	elif request.method == 'POST':
		updated_data =	json.loads( request.body )
		print '\tPost = ' , request.body
		print '\tData = ' , updated_data
		p = Piece()
		p.user = request.user
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
		return HttpResponse( json.dumps( [ category.myToObj() for category in PieceCategory.objects.filter(user=request.user) ] ), content_type="application/json" )

	elif request.method == 'POST':
		updated_data =	json.loads( request.body )
		print '\tPut = ' , request.body
		c = PieceCategory()
		c.user = request.user
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
		return HttpResponse( json.dumps( [ doc.myToObj() for doc in Cover.objects.filter(user=request.user) ] ), content_type="application/json" )

	elif request.method == 'POST':
		updated_data =	json.loads( request.body )
		print '\tPOST = ' , updated_data
		d = Cover()
		d.user = request.user
		d.fill(updated_data)
		d.save()
		return HttpResponse( json.dumps( d.myToObj() ), content_type="application/json" )

@csrf_exempt
def documents_detail(request, id) :

	if request.method == 'GET':
		doc = get_object_or_404( Cover, id=id )
		return HttpResponse( json.dumps( doc.myToObj() ), content_type="application/json" )
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
		filename = "demo"

		try :
			rmtree ( path )
		except :
			pass

		makedirs(path)
		doc = Document()
		doc.add_paragraph(updated_data["text"])
		doc.save(path + "/" + filename + ".docx")
		result = subprocess.call( "cd " + path + "; lowriter --convert-to pdf " + filename + ".docx" , shell=True )

		return HttpResponse( json.dumps( {"path":"static/docs/" + str(request.user) + "/" + filename + ".pdf" } ), content_type="application/json" )

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
	elif request.method == 'DELETE':
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
