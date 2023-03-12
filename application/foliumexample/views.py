from django.shortcuts import render
from website.models import Content

#folium
import folium

# overpass
import overpass

# Create your views here.
#fetch all the Content from models
def content():
    data = Content.objects.all().order_by('title')
    filtered_data = Content.objects.get(title__exact='Folium Example')
    context = {'content': data, 'filtered_content': filtered_data}
    return context

#homepage
def foliumexample(request):

    #overpy
    #--https://wiki.openstreetmap.org/wiki/Map_features for list of tags
    api = overpass.API()
    osm_result = api.get('way["building"="residential"](47.344290,8.481102,47.417054,8.607273);', verbosity='geom')
    
    #folium
    tiles = folium.TileLayer(tiles='http://localhost:8080/styles/basic-preview/{z}/{x}/{y}.png',
                     name='Base preview tileservergl',
                     attr='tileservergl'
                     )
    
    m = folium.Map(location=[47.384,8.533], tiles=tiles, zoom_start=13)

    geojson_style = lambda x: { "fillColor": "#bf1561","color": "#bf1561","weight": 2,"opacity": 1}
    geojson_highlight_style = lambda x: { "fillColor": "d872a0","color": "d872a0","weight": 2,"opacity": 1} #To DO
    
    geojson = folium.GeoJson(osm_result, name="osm residential", style_function=geojson_style, zoom_on_click=True)
    folium.features.GeoJsonPopup(fields=['building', 'addr:housenumber', 'addr:street', 'addr:postcode'], labels=True).add_to(geojson)
    geojson.add_to(m)
    folium.LayerControl().add_to(m)
    m=m._repr_html_()

    context = content()
    context["folium_map"] = m
    return render(request, 'foliumexample.html', context)