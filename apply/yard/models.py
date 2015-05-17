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
	user 		= models.ForeignKey(User)
	name 		= models.CharField(max_length=4096)
	
	def myToObj ( self ):
		return { "id" : self.id , "name": self.name }

	def fill ( self, data ):
		self.name = data["name"]

	def __str__( self ) :
		return self.name

class PieceCategory( models.Model ):
	user 		= models.ForeignKey(User)
	name  		= models.CharField(max_length=4096, default="")
	description	= models.CharField(max_length=4096, default="")
	language	= models.CharField(max_length=7, choices=LANGUAGES, default="en")
	tags		= models.CharField(max_length=4096, default="")
	pieces 		= models.TextField(default="")
	
	def myToObj ( self ):
		data = { "id" : self.id , "name": self.name, "description" : self.description }
		data["language"] = self.language
		data["tags"] = self.tags
		data["pieces"] = self.pieces
		return data

	def fill ( self, data ):
		self.name = data["name"]
		self.description = data["description"]
		self.tags = data["tags"]
		self.language = data["language"]
		self.pieces = data["pieces"]

	def __str__( self ) :
		return self.name

class Piece( models.Model ):
	user 		= models.ForeignKey(User)
	content  	= models.TextField()
	language    = models.CharField(max_length=7, choices=LANGUAGES)
	tags		= models.CharField(max_length=4096, default="")
	legend      = models.CharField(max_length=9064, default="")
	
	def myToObj ( self ):
		return { "id" : self.id , "content"	: self.content, "language"	: self.language, "tags" : self.tags, "legend" : self.legend }

	def fill( self, data ) :
		self.content = data["content"]
		self.language = data["language"]
		self.tags = data["tags"]
		self.legend = data["legend"]

	def __str__( self ) :
		return self.content


class Cover( CreatedUpdatedModel ):
	user 		= models.ForeignKey(User)
	name 		= models.CharField(max_length=4096)
	content		= models.TextField(default="")
	
	def myToObj ( self ):
		return  { "id" : self.id, "name"	: self.name, "content" : self.content }

	def fill( data ):
		self.name 		= data.name
		self.content 	= data.content

	def __str__( self ) :
		return self.name

class Application( CreatedUpdatedModel ):
	user 			= models.ForeignKey(User)
	portal 			= models.CharField(blank=True, max_length=200)
	portal_link		= models.CharField(blank=True, max_length=200, default="")
	company			= models.CharField(blank=True, max_length=200)
	company_link	= models.CharField(blank=True, max_length=200, default="")
	position		= models.CharField(blank=True, max_length=300)
	position_link	= models.CharField(blank=True, max_length=300, default="")
	salary			= models.CharField(blank=True, max_length=100)
	contract		= models.CharField(blank=True, max_length=300)
	latitude		= models.CharField(blank=True, max_length=20)
	longitude		= models.CharField(blank=True, max_length=20)
	skills 			= models.CharField(blank=True, max_length=200)
	written			= models.BooleanField(default=False)
	called			= models.BooleanField(default=False)
	interviewed		= models.BooleanField(default=False)
	followup		= models.BooleanField(default=False)
	notes			= models.TextField(blank=True)
	next			= models.TextField(blank=True)
	cover			= models.TextField(blank=True)
	address1		= models.CharField(blank=True, max_length=100)
	address2		= models.CharField(blank=True, max_length=100)
	c1name			= models.CharField(blank=True, max_length=40)
	c1mail			= models.CharField(blank=True, max_length=40)
	c1phone			= models.CharField(blank=True, max_length=20)
	c2name			= models.CharField(blank=True, max_length=40)
	c2mail			= models.CharField(blank=True, max_length=40)
	c2phone			= models.CharField(blank=True, max_length=20)
	c3name			= models.CharField(blank=True, max_length=40)
	c3mail			= models.CharField(blank=True, max_length=40)
	c3phone			= models.CharField(blank=True, max_length=20)
	c4name			= models.CharField(blank=True, max_length=40)
	c4mail			= models.CharField(blank=True, max_length=40)
	c4phone			= models.CharField(blank=True, max_length=20)
	
	def myToObj ( self ):
		data = { "id" : self.id, "created" : self.created.strftime('%Y-%m-%d %H:%M') , "updated" : self.updated.strftime('%Y-%m-%d %H:%M')   }
		data["portal"] 		= self.portal
		data["company"] 	= self.company
		data["position"] 	= self.position
		data["portal_link"] 	= self.portal_link
		data["company_link"] 	= self.company_link
		data["position_link"] 	= self.position_link
		data["salary"] 		= self.salary
		data["contract"] 	= self.contract
		data["latitude"] 	= self.latitude
		data["longitude"] 	= self.longitude
		data["skills"] 		= self.skills
		data["written"] 	= self.written
		data["called"] 		= self.called
		data["interviewed"] = self.interviewed
		data["followup"] 	= self.followup
		data["notes"]		= self.notes
		data["next"] 		= self.next
		data["cover"]		= self.cover
		data["address1"]	= self.address1
		data["address2"]	= self.address2
		data["c1name"]		= self.c1name
		data["c1mail"]		= self.c1mail
		data["c1phone"]		= self.c1phone
		data["c2name"]		= self.c2name
		data["c2mail"]		= self.c2mail
		data["c2phone"]		= self.c2phone
		data["c3name"]		= self.c3name
		data["c3mail"]		= self.c3mail
		data["c3phone"]		= self.c3phone
		data["c4name"]		= self.c4name
		data["c4mail"]		= self.c4mail
		data["c4phone"]		= self.c4phone
		return data

	def fill( self, data ) :
		self.company 		= data["company"]
		self.portal 		= data["portal"]
		self.position		= data["position"]
		self.company_link	= data["company_link"]
		self.portal_link	= data["portal_link"]
		self.position_link	= data["position_link"]
		self.salary			= data["salary"]
		self.contract		= data["contract"]
		self.latitude		= data["latitude"]
		self.longitude		= data["longitude"]
		self.skills 		= data["skills"]
		self.written 		= data["written"]
		self.called 		= data["called"]
		self.interviewed 	= data["interviewed"]
		self.followup 		= data["followup"]
		self.notes 			= data["notes"]
		self.next 			= data["next"]
		self.cover 			= data["cover"]
		self.address1 		= data["address1"]
		self.address2 		= data["address2"]
		self.c1name 		= data["c1name"]
		self.c1mail 		= data["c1mail"]
		self.c1phone 		= data["c1phone"]
		self.c2name 		= data["c2name"]
		self.c2mail 		= data["c2mail"]
		self.c2phone		= data["c2phone"]
		self.c3name 		= data["c3name"]
		self.c3mail 		= data["c3mail"]
		self.c3phone 		= data["c3phone"]
		self.c4name 		= data["c4name"]
		self.c4mail 		= data["c4mail"]
		self.c4phone 		= data["c4phone"]


	def __str__( self ) :
		return self.company




# User
class Profile( CreatedUpdatedModel ):
	user 	= models.OneToOneField(User)
	uuid 	= UUIDField(auto=True)
	bio 	= models.TextField()
	website = models.URLField(null=True)
	has_avatar 	= models.BooleanField(default=False)
	avatar 		= models.CharField(max_length=4096)
	tutorial	= models.IntegerField()
	
	def myToObj ( self ):
		data = {}
		data["user"] 			= { "id" : self.user.id, "name" : self.user.name } 
		data["uuid"] 			= self.uuid
		data["bio"]				= self.bio
		data["website"] 		= self.website
		data["has_avatar"]		= self.has_avatar
		data["avatar"]			= self.avatar
		data["tutorial"]		= self.tutorial
		return data

	def __str__( self ) :
		return self.user


class ProfileForm(ModelForm):
    class Meta:
        model = Profile
        fields = ['user', 'bio', 'website']


class SkillForm(ModelForm):
    class Meta:
        model = Skill
        fields = ['name']

class ApplicationForm(ModelForm):
    class Meta:
        model = Application
        fields = ['company','portal', 'position','skills', 'written', 'called', 'interviewed', 'followup', 'notes', 'next', 'cover', 'address1', 'address2', 'c1name', 'c1mail', 'c1phone', 'c2name', 'c2mail', 'c2phone','c3name', 'c3mail', 'c3phone','c4name', 'c4mail', 'c4phone']
		
class PieceCategoryForm(ModelForm):
    class Meta:
        model = PieceCategory
        fields = ['name', 'description', 'tags', 'language', 'pieces']
		
class PieceForm(ModelForm):
    class Meta:
        model = Piece
        fields = ['language', 'tags', 'legend', 'content']

