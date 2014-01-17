from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.contrib.sitemaps import GenericSitemap
from django.http import HttpResponse
from blog.models import Entry
admin.autodiscover()

info_dict = {
    'queryset': Entry.objects.filter(status=1),
    'date_field': 'pub_date',
}

sitemaps = {
    'blog': GenericSitemap(info_dict, priority=0.6),
}

urlpatterns = patterns('',
	url(r'^', include('blog.urls')),
	url(r'^admin/', include(admin.site.urls)),
	url(r'^comments/', include('django.contrib.comments.urls')),	
	url(r'^sitemap.xml$', 'django.contrib.sitemaps.views.sitemap', {'sitemaps': sitemaps})
)

urlpatterns += patterns('',
	url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT,}),
	url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT,}),
)

#from django.contrib.staticfiles.urls import staticfiles_urlpatterns
#urlpatterns += staticfiles_urlpatterns()
