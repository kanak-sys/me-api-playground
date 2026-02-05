from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=80, unique=True)
    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    links = models.JSONField(default=dict, blank=True)
    skills = models.ManyToManyField(Skill, related_name='projects', blank=True)
    def __str__(self):
        return self.title

class Profile(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    education = models.TextField(blank=True)
    skills = models.ManyToManyField(Skill, related_name='profiles', blank=True)
    projects = models.ManyToManyField(Project, related_name='profiles', blank=True)
    links = models.JSONField(default=dict, blank=True)
    def __str__(self):
        return self.name
