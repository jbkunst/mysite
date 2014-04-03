from django.conf.urls import patterns, include, url
from .views import IndexView, ResumeView, RobotsTextView
from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin
admin.autodiscover()

from django.contrib.sitemaps import GenericSitemap
from blog.models import Post
info_dict = {
    'queryset': Post.objects.filter(status=1),
    'date_field': 'pub_date',
}

sitemaps = {
    'blog': GenericSitemap(info_dict, priority=0.6),
}

urlpatterns = patterns('',
    url(r'^$', IndexView.as_view(), name='index'),
    url(r'^resume/$', ResumeView.as_view(), name='resume'),
    url(r'^sitemap.xml$', 'django.contrib.sitemaps.views.sitemap', {'sitemaps': sitemaps}),
    url(r'^robots.txt$', RobotsTextView.as_view(), name='robots'),
    url(r'^blog/', include('blog.urls')),
    url(r'^admin/', include(admin.site.urls)),
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
