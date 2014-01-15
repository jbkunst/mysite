from django.template import Library
import urllib
from django.utils import simplejson

register = Library()

@register.filter
def twitter_status( username ):
    url = "http://twitter.com/statuses/user_timeline/%s.json?count=1" % username
    file  = urllib.urlopen(url)
    json_response = file.read()
    try:
       twit = simplejson.loads(json_response)
       msg = twit[0]["text"]
    except :
       msg = " ..."	
    return "%s" % msg