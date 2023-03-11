from django.shortcuts import render
from website.models import Content

#fetch all the Content from models
def content():
    data = Content.objects.all().order_by('title')
    filtered_data = Content.objects.get(title__exact='Earthquake Tracker')
    context = {'content': data, 'filtered_content': filtered_data}
    return context

#homepage
def earthquaketracker(response):
    context = content()
    return render(response, 'earthquaketracker.html', context)