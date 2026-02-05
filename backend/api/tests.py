from django.test import TestCase
from django.urls import reverse
from .models import Skill, Project, Profile

class SimpleAPITests(TestCase):
    def setUp(self):
        s = Skill.objects.create(name='python')
        p = Project.objects.create(title='X', description='x')
        p.skills.add(s)
        pr = Profile.objects.create(name='You', email='you@example.com')
        pr.skills.add(s)
        pr.projects.add(p)

    def test_health(self):
        r = self.client.get('/api/health/')
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json()['status'],'ok')

    def test_projects_by_skill(self):
        r = self.client.get('/api/projects/?skill=python')
        self.assertEqual(r.status_code, 200)
        self.assertTrue(len(r.json()) >= 1)
