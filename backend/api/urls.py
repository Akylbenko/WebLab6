from django.contrib import admin
from django.urls import path, include
from .views import register_view, me_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', register_view),
    path('me/', me_view),
]