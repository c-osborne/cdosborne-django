from django.urls import path
from . import views

urlpatterns= [
    path('', views.foliumexample, name="foliumexample")
]