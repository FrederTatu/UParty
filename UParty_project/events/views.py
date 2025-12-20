
from django.shortcuts import render, redirect 
from django.template.response import TemplateResponse
from .models import Event

def main(request):
    return TemplateResponse(request, "base.html")
 
def adddb(request):
    if request.method == "POST":
        eventname = request.POST.get("event_name")
        eventtext = request.POST.get("event_text")  
        eventtimebegin = request.POST.get("event_time_begin")  
        eventtimeend = request.POST.get("event_time_end")  
        eventprice = request.POST.get("event_price")  
        eventurl = request.POST.get("event_url")
        eventcoords = request.POST.get("event_coords")
        eventmaxparticipants = request.POST.get("event_max_participants")
        eventstatus = request.POST.get("event_status")
        
        
        
        userevent = Event()
        userevent.event_name = eventname
        userevent.event_text = eventtext
        userevent.event_time_begin = eventtimebegin
        userevent.event_time_end = eventtimeend
        userevent.event_max_participants = eventmaxparticipants

        if eventurl:
            userevent.event_url = eventurl
        else:
            userevent.event_url = "https://yandex.ru/maps/195/ulyanovsk/?ll=48.403131%2C54.314194&z=14"
       

        """ if request.user.is_authenticated:
            userevent.event_creator_id = request.user """
        
        userevent.event_status = eventstatus if eventstatus else 'active'
       
        try:
            max_participants = int(eventmaxparticipants)
            userevent.event_remaining_seats = max_participants
        except ValueError:
            userevent.event_remaining_seats = 0
        
    

        try:
            userevent.event_price = float(eventprice) if eventprice else 0
        except ValueError:
            userevent.event_price = 0


        userevent.save()
        print("Событие сохранено:", userevent.id)
        
        return redirect("app:main")  

def eventscatalog(request):
    events = Event.objects.all() 
   
    context = {
        "eventlist": events
    }
   
    return TemplateResponse(request, "eventlist.html", context)