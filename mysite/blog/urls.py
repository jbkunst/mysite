from django.conf.urls import patterns, url
from .views import CategoryPostList, PostDetailView, RandomPostView
from .feed import CategoryFeed, LatestPostsFeed

urlpatterns = patterns('blog.views',
    url(r'^rss/$', LatestPostsFeed(), name='blog-rss'),
    url(r'^category/(?P<slug>[-\w]+)/$', CategoryPostList.as_view(), name='category'),
    url(r'^category/(?P<slug>[-\w]+)/rss/$', CategoryFeed()),
    url(r'^post/(?P<slug>[-\w]+)/', PostDetailView.as_view(), name='post'),
    url(r'^random/$', RandomPostView.as_view(), name='random-post'),
)
