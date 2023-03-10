from django.urls import path
from . import views

urlpatterns= [
    path('', views.isstracker, name="isstracker")
]