# -*- coding: utf-8 -*
import datetime
from django.conf import settings
import random


def themes(request):

	themes = ['forest', 'clouds']
	selection = datetime.datetime.now().hour % len(themes)
	theme = themes[selection]
	# theme = themes[random.choice([0,1])]
 	theme_css = settings.STATIC_URL + "css/" + "custom_theme_%s.css" % theme

 	return { "theme_css" : theme_css }
