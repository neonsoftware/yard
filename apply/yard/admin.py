from django.contrib import admin

from yard.models import Skill, Cover, Company, Application, Profile, Piece, PieceCategory

# Register your models here.
admin.site.register(Skill)
admin.site.register(Company)
admin.site.register(Application)
admin.site.register(Profile)
admin.site.register(Piece)
admin.site.register(PieceCategory)
admin.site.register(Cover)
