from django.core.management.base import BaseCommand
from api.models import Skill, Project, Profile

class Command(BaseCommand):
    help = "Seed DB with sample profile and data"

    def handle(self, *args, **options):
        Skill.objects.all().delete()
        Project.objects.all().delete()
        Profile.objects.all().delete()

        s_python = Skill.objects.create(name='python')
        s_django = Skill.objects.create(name='django')
        s_react = Skill.objects.create(name='react')

        p1 = Project.objects.create(title='Personal Portfolio', description='Portfolio site', links={'github':'https://github.com/you/portfolio'})
        p1.skills.add(s_python, s_react)

        p2 = Project.objects.create(title='VoteChain', description='Decentralized voting POC', links={'github':'https://github.com/you/votechain'})
        p2.skills.add(s_python, s_django)

        profile = Profile.objects.create(name='Your Name', email='you@example.com', education='B.Tech CSE')
        profile.skills.add(s_python, s_django)
        profile.projects.add(p1, p2)
        profile.links = {'github':'https://github.com/you','linkedin':'https://linkedin.com/in/you'}
        profile.save()

        self.stdout.write(self.style.SUCCESS('Database seeded!'))
