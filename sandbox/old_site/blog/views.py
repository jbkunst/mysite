# -*- coding: utf-8 -*-
from django.template import RequestContext
from django.http import HttpResponse
from django.shortcuts import render_to_response, get_object_or_404, redirect
from blog.models import *
from blog.forms import ContactForm

def index(request):
	from django.core.paginator import Paginator, InvalidPage, EmptyPage
	entry_list = Entry.objects.filter(status = 1)
	paginator = Paginator(entry_list, 3)
	
	try:
		page = int(request.GET.get('page', '1'))
	except ValueError:
		page = 1
	try:
		entries = paginator.page(page)
	except (EmptyPage, InvalidPage):
		entries = paginator.page(paginator.num_pages)	
	
	entries = entries
	categories = Category.objects.all()
	random = Entry.objects.filter(status = 1).order_by('?')[0:4]
	return render_to_response('blog/blog.html',	locals(), context_instance=RequestContext(request))
	
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
	
def contact(request):
	categories = Category.objects.all()
	random = Entry.objects.filter(status = 1).order_by('?')[0:4]
	if request.method == 'POST':
		form = ContactForm(request.POST)
		if form.is_valid():
			form.save()
			return redirect('/thanks/')
	else:		
		form = ContactForm()
	return render_to_response('blog/contact.html', locals(), context_instance=RequestContext(request))	

def random(request):
	entry = Entry.objects.filter(status = 1).order_by('?')[0]
	categories = Category.objects.all()
	random = Entry.objects.filter(status = 1).order_by('?')[0:4]
	return render_to_response('blog/post.html', locals(), context_instance=RequestContext(request))	

def about(request):
	categories = Category.objects.all()
	random = Entry.objects.filter(status = 1).order_by('?')[0:4]
	return render_to_response('blog/about.html', locals(), context_instance=RequestContext(request))	


def thanks(request):
	categories = Category.objects.all()
	random = Entry.objects.filter(status = 1).order_by('?')[0:4]
	return render_to_response('blog/thanks.html', locals(), context_instance=RequestContext(request))	

def my_custom_404_view(request):
	categories = Category.objects.all()
	random = Entry.objects.filter(status = 1).order_by('?')[0:4]
	return render_to_response('blog/404.html', locals(), context_instance=RequestContext(request))	

def my_custom_500_view(request):
	categories = Category.objects.all()
	random = Entry.objects.filter(status = 1).order_by('?')[0:4]
	return render_to_response('blog/404.html', locals(), context_instance=RequestContext(request))	

def robots(request):
	return HttpResponse('User-agent: *\nDisallow: /admin/', 'text/plain')