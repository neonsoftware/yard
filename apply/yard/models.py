from django.db import models
from django.forms import ModelForm

from django.contrib.auth.models import User

from uuidfield import UUIDField



class CreatedUpdatedModel(models.Model):
	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)

	class Meta:
			abstract = True

class Skill( models.Model ):
	name 		= models.CharField(max_length=4096)

class Portal( CreatedUpdatedModel ):
	name 		= models.CharField(max_length=4096)
	website		= models.CharField(max_length=4096)
	description	= models.CharField(max_length=4096)
	#countries	= models.CharField(max_length=4096)
	skills 		= models.ManyToManyField( Skill, related_name="%(app_label)s_%(class)s_related" )

class Company( CreatedUpdatedModel ):
	name 		= models.CharField(max_length=4096)
	website		= models.CharField(max_length=4096)
	description	= models.CharField(max_length=4096)
	skills 		= models.ManyToManyField(Skill, related_name="%(app_label)s_%(class)s_related" )
	note 		= models.CharField(max_length=4096)

class Application( CreatedUpdatedModel ):
	portal 		= models.ForeignKey(Portal)
	company		= models.ForeignKey(Company)
	skills 		= models.ManyToManyField( Skill, related_name="%(app_label)s_%(class)s_related" )
	responded 	= models.BooleanField(default=False)
	interviewed	= models.BooleanField(default=False)
	to_call		= models.BooleanField(default=False)
	to_send_other	= models.BooleanField(default=False)
	note 		= models.CharField(max_length=4096)


# User
class Profile( CreatedUpdatedModel ):
	user 	= models.OneToOneField(User)
	uuid 	= UUIDField(auto=True)
	bio 	= models.TextField()
	website = models.URLField(null=True)
	has_avatar 	= models.BooleanField(default=False)
	avatar 		= models.CharField(max_length=4096)


class ProfileForm(ModelForm):
    class Meta:
        model = Profile
        fields = ['user', 'bio', 'website']

class PortalForm(ModelForm):
    class Meta:
        model = Portal
        fields = ['name', 'description', 'skills']

class SkillForm(ModelForm):
    class Meta:
        model = Skill
        fields = ['name']

class CompanyForm(ModelForm):
    class Meta:
        model = Company
        fields = ['name', 'description', 'skills']

class ApplicationForm(ModelForm):
    class Meta:
        model = Application
        fields = ['portal', 'company', 'skills']

