from django.conf.urls import patterns, include, url
from django.contrib.auth.decorators import login_required

from yard import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'ciao.views.home', name='home'),
	url(r'^accounts/login/$', 'django.contrib.auth.views.login'),
	url(r'^accounts/logout/$', 'django.contrib.auth.views.logout', {'next_page': '/accounts/login'}),

	url(r'^$',  views.my_view , name ='index' ),
	url(r'applications//new$',  views.application_new , name ='application_new' ),
	url(r'applications/(?P<id>[-\w\d]+)/written$',  views.applications_written , name ='applications_written' ),
	url(r'applications/(?P<id>[-\w\d]+)/called$',  views.applications_called , name ='applications_called' ),
	url(r'applications/(?P<id>[-\w\d]+)/interviewed$',  views.applications_interviewed , name ='applications_interviewed' ),
	url(r'applications/(?P<id>[-\w\d]+)/followup$',  views.applications_followup , name ='applications_followup' ),
	url(r'applications$',  views.applications_list , name ='applications_list' ),
	url(r'applications/$',  views.applications_list , name ='applications_list' ),
	url(r'applications/(?P<id>[-\w\d]+)/$',  views.applications_detail , name ='applications_detail' ),
	url(r'skills/$',  views.skills_list , name ='skills_list' ),
	url(r'skills$',  views.skills_list , name ='skills_list' ),
	url(r'skills/(?P<id>[-\w\d]+)/$',  views.skills_detail , name ='skills_detail' ),
	url(r'documents/$',  views.documents_list , name ='documents_list' ),
	url(r'documents/(?P<id>[-\w\d]+)/docx$',  views.documents_docx , name ='documents_detail' ),
	url(r'documents/(?P<id>[-\w\d]+)/$',  views.documents_detail , name ='documents_detail' ),
	url(r'pieces$',  views.pieces_list , name ='pieces_list' ),
	url(r'pieces/(?P<id>[-\w\d]+)/$',  views.pieces_detail , name ='pieces_detail' ),
	url(r'categories/$',  views.categories_list , name ='categories_list' ),
	url(r'categories$',  views.categories_list , name ='categories_list' ),
	url(r'categories/(?P<id>[-\w\d]+)/$',  views.categories_detail , name ='categories_detail' )
)
