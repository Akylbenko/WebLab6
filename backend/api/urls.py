from rest_framework.routers import DefaultRouter
from .views import register_view, me_view, ArticleViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r"articles", ArticleViewSet)

urlpatterns = [
    path("register/", register_view),
    path("me/", me_view),
    path("", include(router.urls)),
]