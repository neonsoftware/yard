from django.contrib import admin

from yard.models import Skill, Cover, Application, Profile, Piece, PieceCategory

# Register your models here.

class SkillAdmin(admin.ModelAdmin):
    fields = ['user', 'name']
    list_display = ('user', 'name')

class PieceCategoryAdmin(admin.ModelAdmin):
    fields = ['user', 'name', 'description', 'language', 'tags', 'pieces']
    list_display = ('user', 'name', 'description', 'language', 'tags', 'pieces')

class PieceAdmin(admin.ModelAdmin):
    fields = ['user', 'content', 'language', 'tags', 'legend']
    list_display = ('user', 'content', 'language', 'tags', 'legend')

class ApplicationAdmin(admin.ModelAdmin):
    fields = ['user', 'position', 'company']
    list_display = ('user', 'position', 'company')

class CoverAdmin(admin.ModelAdmin):
    fields = ['user', 'name', 'content']
    list_display = ('user', 'name', 'content')


admin.site.register(Skill, SkillAdmin)
admin.site.register(PieceCategory, PieceCategoryAdmin)
admin.site.register(Piece, PieceAdmin)
admin.site.register(Application, ApplicationAdmin)
admin.site.register(Profile)
admin.site.register(Cover, CoverAdmin)
