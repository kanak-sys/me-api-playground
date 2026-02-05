from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Count, Q
from .models import Profile, Project, Skill
from .serializers import ProfileSerializer, ProjectSerializer, SkillSerializer
import logging
logger = logging.getLogger(__name__)

class ProfileDetail(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'id'

class ProjectList(generics.ListAPIView):
    serializer_class = ProjectSerializer
    def get_queryset(self):
        qs = Project.objects.all()
        skill = self.request.query_params.get('skill')
        if skill:
            logger.debug("Filter projects by skill=%s", skill)
            qs = qs.filter(skills__name__iexact=skill)
        return qs.distinct()

class TopSkills(generics.GenericAPIView):
    def get(self, request):
        top = Skill.objects.annotate(count=Count('projects')).order_by('-count')[:20]
        data = [{'name': s.name, 'count': s.count} for s in top]
        return Response(data)

class SearchView(generics.GenericAPIView):
    def get(self, request):
        q = request.query_params.get('q','').strip()
        if not q:
            return Response({'projects': [], 'profiles': []})
        projects = Project.objects.filter(
            Q(title__icontains=q) | Q(description__icontains=q) | Q(skills__name__icontains=q)
        ).distinct()
        profiles = Profile.objects.filter(
            Q(name__icontains=q) | Q(education__icontains=q) | Q(skills__name__icontains=q)
        ).distinct()
        return Response({
            'projects': ProjectSerializer(projects, many=True).data,
            'profiles': ProfileSerializer(profiles, many=True).data
        })

@api_view(['GET'])
def health(request):
    return Response({'status':'ok'}, status=200)
