from django.shortcuts import render
from django.http import HttpResponse

from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.forms.models import model_to_dict

from yard.models import Portal, Skill, Application, Company
from yard.models import PortalForm, SkillForm, ApplicationForm, CompanyForm

import json

@csrf_exempt
def my_view( req ):

	#a = Artist.objects.all()

	return render( req, 'my_index.html', { }  )

@csrf_exempt
def portal_new( request ):
	if request.method == 'GET':
		form = PortalForm()
		return render(request, 'forms/simple_form.html', { 'title' : 'Portal', 'api' : 'portals', 'form': form } )

@csrf_exempt
def skill_new( request ):
	if request.method == 'GET':
		form = SkillForm()
		return render(request, 'forms/simple_form.html', { 'title' : 'Skill', 'api' : 'skills','form': form } )


@csrf_exempt
def application_new( request ):
	if request.method == 'GET':
		form = ApplicationForm()
		return render(request, 'forms/simple_form.html', { 'title' : 'Application', 'api' : 'applications','form': form } )


@csrf_exempt
def company_new( request ):
	if request.method == 'GET':
		form = CompanyForm()
		return render(request, 'forms/simple_form.html', { 'title' : 'Company', 'api' : 'companies','form': form } )

@csrf_exempt
def skills_list(request) :

	if request.method == 'GET':

		return HttpResponse( json.dumps( [ skill.myToObj() for skill in Skill.objects.all() ] ), content_type="application/json" )

	elif request.method == 'POST':

		#try :
		
		print '\tPost = ' , request.POST
		print '\tBody = ' , request.body
		received_data    =       json.loads(request.body)
		received_name    =       received_data['name']

		print 'New skill : name = ' , received_name

		s = Skill( name = received_name )
		s = SkillForm( received_data )

		s.save()
	
		#except:
		#	return HttpResponse(content="Input to API not valid for resource addition.", status=400)


		return HttpResponse(content="Object correctly added. ", status=200 )


def skills_detail(request, id) :

	if request.method == 'GET':
				
		skill = get_object_or_404( Skill, id=id )

		return HttpResponse( json.dumps( skill.myToObj() ), content_type="application/json" )


def portals_list(request) :

	if request.method == 'GET':

		return HttpResponse( json.dumps( [ port.myToObj() for port in Portal.objects.all() ] ), content_type="application/json" )

	elif request.method == 'POST':

		return render(request, 'list/skills_list.html', {'skills' : za_skills })


def portals_detail(request, id) :

	if request.method == 'GET':

		portal = get_object_or_404( Portal, id=id )

		return HttpResponse( json.dumps( portal.myToObj() ), content_type="application/json" )


def companies_list(request) :

	if request.method == 'GET':

		return HttpResponse( json.dumps( [ comp.myToObj() for comp in Company.objects.all() ] ), content_type="application/json" )

	elif request.method == 'POST':

		return render(request, 'list/skills_list.html', {'skills' : za_skills })


def companies_detail(request, id) :

	if request.method == 'GET':

		company = get_object_or_404( Company, id=id )

		return HttpResponse( json.dumps( company.myToObj() ), content_type="application/json" )


def applications_list(request) :

	if request.method == 'GET':

		return HttpResponse( json.dumps( [ app.myToObj() for app in Application.objects.all() ] ), content_type="application/json" )

	elif request.method == 'POST':

		return render(request, 'list/skills_list.html', {'skills' : za_skills })


def applications_detail( request, id ) :

	if request.method == 'GET':

		application = get_object_or_404( Skill, id=id )

		return HttpResponse( json.dumps( application.myToObj() ), content_type="application/json" )



def angu(request) :

	return render(request, 'angu.html', {})


