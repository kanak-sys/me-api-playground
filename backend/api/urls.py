from django.urls import path
from .views import ProfileDetail, ProjectList, TopSkills, SearchView, health

urlpatterns = [
    path("profile/<int:id>/", ProfileDetail.as_view(), name="profile-detail"),
    path("projects/", ProjectList.as_view(), name="projects-list"),
    path("skills/top/", TopSkills.as_view(), name="skills-top"),
    path("search/", SearchView.as_view(), name="search"),
    path("health/", health, name="health"),
]
