from django.conf.urls import patterns, url
from .views import CategoryPostList, PostDetailView, RandomPostView

urlpatterns = patterns('blog.views',
	url(r'^category/(?P<slug>[-\w]+)/$', CategoryPostList.as_view(), name='category'),
	url(r'^post/(?P<slug>[-\w]+)/', PostDetailView.as_view(), name='post'),
	url(r'^random/$', RandomPostView.as_view(), name='random-post'),
)
