from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('mysite.views',
	url(r'^$', 'index', name = 'index'),
	url(r'^robots.txt$', 'robots'),    
    url(r'^blog/', include('blog.urls')),
    url(r'^admin/', include(admin.site.urls)),
)
