from django.contrib.syndication.views import Feed, FeedDoesNotExist
from blog.models import Category, Entry
from django.shortcuts import get_object_or_404
from django.conf import settings

class LatestEntriesFeed(Feed):
	title = settings.SITE_URL + ": Latest Entries Feed"
	link = "/"
	description = "Latest Entries on the site " + settings.SITE_URL

	def items(self, obj):
		return Entry.objects.filter(status = 1)[:30]
		
	def item_title(self, item):
		return item.title

	def item_description(self, item):
		return item.body
		
	def item_pubdate(self, item):
		return item.pub_date
		
	author_email = 'jbkunst@gmail.com'
		
class CategoryFeed(Feed):

	def get_object(self, request, slug):
		return get_object_or_404(Category, slug=slug)

	def title(self, obj):
		return settings.SITE_URL + ": Entries for category %s" % obj.name

	def link(self, obj):
		return obj.get_absolute_url()

	def description(self, obj):
		return "Recently post in category %s" % obj.name

	def items(self, obj):
		return Entry.objects.filter(category = obj, status = 1)[:30]
		
	def item_title(self, item):
		return item.title

	def item_description(self, item):
		return item.body

	def item_pubdate(self, item):
		return item.pub_date
		
	author_email = 'jbkunst@gmail.com'