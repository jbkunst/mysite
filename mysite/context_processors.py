# -*- coding: utf-8 -*
import datetime
from django.conf import settings
import random


def themes(request):

	themes = ['forest', 'clouds', 'forest_yellow']
	selection = datetime.datetime.now().hour % len(themes)
	theme = themes[selection]
	theme = themes[random.choice(xrange(len(themes)))]
 	theme_css = settings.STATIC_URL + "css/" + "custom_theme_%s.css" % theme

 	return { "theme_css" : theme_css }
