from django.views.generic import TemplateView

class IndexView(TemplateView):
    
    template_name = "index.html"

class ResumeView(TemplateView):
    
    template_name = "resume.html"

class RobotsTextView(TemplateView):
    # thanks to https://github.com/nkuttler/django-robots-txt
    template_name = 'robots.txt'
    
    def render_to_response(self, context, **kwargs):
        return super(RobotsTextView, self).render_to_response(context, content_type='text/plain', **kwargs)