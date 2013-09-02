from django.conf.urls.defaults import *
# from blog.feed import CategoryFeed, LatestEntriesFeed

urlpatterns = patterns('blog.views',
	# url(r'^rss/$', LatestEntriesFeed()),
	url(r'^category/(?P<slug>[-\w]+)/$', 'category'),
	# url(r'^category/(?P<slug>[-\w]+)/rss/$', CategoryFeed()),
	url(r'^post/(?P<slug>[-\w]+)/', 'entry'),
	url(r'^random/$', 'random'),
)

