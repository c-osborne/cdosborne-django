from django.shortcuts import render
from .models import Content

#fetch all the Content from models
def content():
    data = Content.objects.all().order_by('title')
    context = {'content': data}
    return context

#homepage
def home(response):
    context = content()
    return render(response, 'index.html', context)