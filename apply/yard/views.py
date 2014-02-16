from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt

from yard.models import Portal, Skill, Application, Company
from yard.models import PortalForm, SkillForm, ApplicationForm, CompanyForm


@csrf_exempt
def my_view( req ):

	#a = Artist.objects.all()

    return render( req, 'empty.html', { }  )

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


def skills_list(request) :

	if request.method == 'GET':

		za_skills = Skill.objects.all()

		return render(request, 'list/skills_list.html', {'skills' : za_skills })

	elif request.method == 'POST':

		return render(request, 'list/skills_list.html', {'skills' : za_skills })


def skills_detail(request, name) :

	if request.method == 'GET':

		skill = get_object_or_404( Skill, name=name )

		return render(request, 'detail/skill_detail.html', {'skill' : skill })


def portals_list(request) :

	if request.method == 'GET':

		za_portal = Portal.objects.all()

		return render(request, 'list/portals_list.html', {'portals' : za_portal })

	elif request.method == 'POST':

		return render(request, 'list/skills_list.html', {'skills' : za_skills })


def portals_detail(request, name) :

	if request.method == 'GET':

		portal = get_object_or_404( Portal, name=name )

		return render(request, 'detail/portal_detail.html', {'portal' : portal })


def companies_list(request) :

	if request.method == 'GET':

		za_companies = Company.objects.all()

		return render(request, 'list/companies_list.html', {'companies' : za_companies })

	elif request.method == 'POST':

		return render(request, 'list/skills_list.html', {'skills' : za_skills })


def companies_detail(request, name) :

	if request.method == 'GET':

		company = get_object_or_404( Company, name=name )

		return render(request, 'detail/company_detail.html', {'company' : company })


def applications_list(request) :

	if request.method == 'GET':

		za_applications = Application.objects.all()

		return render(request, 'list/applications_list.html', {'applications' : za_applications })

	elif request.method == 'POST':

		return render(request, 'list/skills_list.html', {'skills' : za_skills })


def applications_detail( request, uuid ) :

	if request.method == 'GET':

		application = get_object_or_404( Skill, uuid=uuid )

		return render(request, 'detail/application_detail.html', {'application' : application })

