from django.shortcuts import render
from website.models import Content

#folium
import folium

# Create your views here.
#fetch all the Content from models
def content():
    data = Content.objects.all().order_by('title')
    filtered_data = Content.objects.get(title__exact='Folium Example')
    context = {'content': data, 'filtered_content': filtered_data}
    return context

#homepage
def foliumexample(request):
    tiles = folium.TileLayer(tiles='http://localhost:8080/styles/basic-preview/{z}/{x}/{y}.png',
                     name='Base preview tileservergl',
                     attr='tileservergl'
                     )
    
    m = folium.Map(location=[47.384,8.533], tiles=tiles)
    folium.LayerControl().add_to(m)
    m=m._repr_html_()
    context = content()
    context["folium_map"] = m
    return render(request, 'foliumexample.html', context)