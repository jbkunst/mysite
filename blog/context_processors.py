# -*- coding: utf-8 -*
from blog.models import Category, Post
from django.conf import settings
import datetime
import random

def blog(request):

    categories = Category.objects.all()
    some_posts = Post.objects.filter(status = 1).order_by('?')[0:len(categories)]

    return {
        'categories': categories,
        'some_posts': some_posts
    }

def random_theme(request):

	themes = ['forest', 'clouds', 'forest_yellow']
	selection = datetime.datetime.now().hour % len(themes)
	theme = themes[selection]
	# theme = themes[random.choice(xrange(len(themes)))]
 	theme_css = "/static/" + "css/" + "custom_theme_%s.css" % theme

 	return { "theme_css" : theme_css }