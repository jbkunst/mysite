# -*- coding: utf-8 -*-
from django.template import RequestContext
from django.http import HttpResponse
from django.shortcuts import render_to_response, get_object_or_404, redirect
from blog.models import *

def category(request, slug):
	from django.core.paginator import Paginator, InvalidPage, EmptyPage
	cat = get_object_or_404(Category, slug = slug)
	entries = Entry.objects.filter(category = cat, status = 1)
	categories = Category.objects.all()
	return render_to_response('blog/portfolio.html', locals(), context_instance=RequestContext(request))

def entry(request, slug):
	entry = get_object_or_404(Entry, slug = slug)
	categories = Category.objects.all()
	random = Entry.objects.filter(status = 1).order_by('?')[0:4]
	return render_to_response('blog/post.html', locals(), context_instance=RequestContext(request))

def random(request):
	entry = Entry.objects.filter(status = 1).order_by('?')[0]
	categories = Category.objects.all()
	random = Entry.objects.filter(status = 1).order_by('?')[0:4]
	return render_to_response('blog/post.html', locals(), context_instance=RequestContext(request))	
