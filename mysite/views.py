# -*- coding: utf-8 -*-
from django.template import RequestContext
from django.http import HttpResponse
from django.shortcuts import render_to_response, get_object_or_404, redirect
from blog.models import *

def index(request):
	entries = Entry.objects.filter(category = cat, status = 1)
	categories = Category.objects.all()
	return render_to_response('index.html', locals(), context_instance=RequestContext(request))

def robots(request):
	return HttpResponse('User-agent: *\nDisallow: /admin/', 'text/plain')