from django.db import models
from django.forms import ModelForm
from django.conf.global_settings import LANGUAGES

from django.contrib.auth.models import User

from uuidfield import UUIDField

class CreatedUpdatedModel(models.Model):
	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)

	class Meta:
			abstract = True


class Skill( models.Model ):
	name 		= models.CharField(max_length=4096)
	
	def myToObj ( self ):
		return { "id" : self.id , "name": self.name }

	def __str__( self ) :
		return self.name

class PieceCategory( models.Model ):
	name  		= models.CharField(max_length=40)
	description	= models.CharField(max_length=100)
	
	def myToObj ( self ):
		return { "id" : self.id , "name": self.name, "description" : self.description }

	def __str__( self ) :
		return self.name

class Piece( models.Model ):
	content  	= models.TextField()
	language    = models.CharField(max_length=7, choices=LANGUAGES)
	skills 		= models.ManyToManyField( Skill, related_name="%(app_label)s_%(class)s_related" )
	category	= models.ForeignKey(PieceCategory)
	schema      = models.CharField(max_length=4094)
	
	def myToObj ( self ):
		data 			= { "id" : self.id , "content"	: self.content, "language"	: self.language, "category" : self.category.id, "schema" : self.schema }
		data["skills"]  = [ { "id" : sk.id, "name" : sk.name } for sk in self.skills.all() ]
		return data

	def __str__( self ) :
		return self.content


class Portal( CreatedUpdatedModel ):
	name 		= models.CharField(max_length=4096)
	website		= models.CharField(max_length=4096)
	description	= models.CharField(max_length=4096)
	#countries	= models.CharField(max_length=4096)
	skills 		= models.ManyToManyField( Skill, related_name="%(app_label)s_%(class)s_related" )
	
	def myToObj ( self ):
		data 			= { "id" : self.id, "name"	: self.name, "website" : self.website, "description" : self.description }
		data["skills"]  = [ { "id" : sk.id, "name" : sk.name } for sk in self.skills.all()   ]
		return data

	def __str__( self ) :
		return self.name

class Company( CreatedUpdatedModel ):
	name 		= models.CharField(max_length=4096)
	website		= models.CharField(max_length=4096)
	description	= models.CharField(max_length=4096)
	skills 		= models.ManyToManyField(Skill, related_name="%(app_label)s_%(class)s_related" )
	note 		= models.CharField(max_length=4096)

	def myToObj ( self ):
		data 			= { "id" : self.id, "name"	: self.name, "website" : self.name, "description" : self.description, "note" : self.note }
		data["skills"]  = [ { "id" : sk.id, "name" : sk.name } for sk in self.skills.all()   ]
		return data


	def __str__( self ) :
		return self.name

class Application( CreatedUpdatedModel ):
	portal 			= models.ForeignKey(Portal)
	company			= models.ForeignKey(Company)
	skills 			= models.ManyToManyField( Skill, related_name="%(app_label)s_%(class)s_related" )
	responded 		= models.BooleanField(default=False)
	interviewed		= models.BooleanField(default=False)
	to_call			= models.BooleanField(default=False)
	to_send_other	= models.BooleanField(default=False)
	note 			= models.CharField(max_length=4096)
	pieces_list    	= models.CharField(max_length=4094)
	
	def myToObj ( self ):
		data = { "id" : self.id, "created" : self.created.strftime('%Y-%m-%d %H:%M') , "updated" : self.updated.strftime('%Y-%m-%d %H:%M')   }
		data["portal"] 			= { "id" : self.portal.id, "name" : self.portal.name } 
		data["company"] 		= { "id" : self.company.id, "name" : self.company.name }
		data["responded"] 		= self.responded
		data["interviewed"]		= self.interviewed
		data["to_call"] 		= self.to_call
		data["to_send_other"]	= self.to_send_other
		data["note"]			= self.note
		data["skills"] 			= [ { "id" : sk.id, "name" : sk.name } for sk in self.skills.all()   ]
		data["list"]			= self.pieces_list
		return data

	def __str__( self ) :
		return self.company.name


# User
class Profile( CreatedUpdatedModel ):
	user 	= models.OneToOneField(User)
	uuid 	= UUIDField(auto=True)
	bio 	= models.TextField()
	website = models.URLField(null=True)
	has_avatar 	= models.BooleanField(default=False)
	avatar 		= models.CharField(max_length=4096)
	
	def myToObj ( self ):
		data = {}
		data["user"] 			= { "id" : self.user.id, "name" : self.user.name } 
		data["uuid"] 			= self.uuid
		data["bio"]				= self.bio
		data["website"] 		= self.website
		data["has_avatar"]		= self.has_avatar
		data["avatar"]			= self.avatar
		return data

	def __str__( self ) :
		return self.user


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
		
class PieceCategoryForm(ModelForm):
    class Meta:
        model = PieceCategory
        fields = ['name', 'description']
		
class PieceForm(ModelForm):
    class Meta:
        model = Piece
        fields = ['language', 'category', 'skills', 'content']

