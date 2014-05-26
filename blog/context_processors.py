# -*- coding: utf-8 -*
from blog.models import Category, Post
import datetime
from mysite import settings
import random

def blog(request):

    categories = Category.objects.all()
    some_posts = Post.objects.filter(status = 1).order_by('?')[0:len(categories)]

    return {
        'categories': categories,
        'some_posts': some_posts
    }


def themes(request):

	themes = ['forest', 'clouds', 'forest_yellow']
	selection = datetime.datetime.now().hour % len(themes)
	theme = themes[selection]
	# theme = themes[random.choice(xrange(len(themes)))]
 	theme_css = settings.STATIC_URL + "css/" + "custom_theme_%s.css" % theme

 	return { "theme_css" : theme_css }
