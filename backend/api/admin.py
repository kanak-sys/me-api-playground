from django.contrib import admin
from .models import Skill, Project, Profile

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title',)
    filter_horizontal = ('skills',)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name','email')
    filter_horizontal = ('skills','projects')
