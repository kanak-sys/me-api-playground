from django.urls import path
from .views import (
    profile_default,
    ProfileDetail,
    ProjectList,
    TopSkills,
    SearchView,
    health
)

urlpatterns = [
    path("profile/", profile_default),              # 👈 IMPORTANT (NO ID)
    path("profile/<int:id>/", ProfileDetail.as_view()),
    path("projects/", ProjectList.as_view()),
    path("skills/top/", TopSkills.as_view()),
    path("search/", SearchView.as_view()),
    path("health/", health),
]
