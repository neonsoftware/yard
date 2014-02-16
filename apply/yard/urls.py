from django.conf.urls import patterns, include, url

from yard import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'ciao.views.home', name='home'),
    url(r'^$', views.my_view, name ='index' ),

)
