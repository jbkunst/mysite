from django.views.generic import ListView, DetailView, View
from .models import Category, Post
from django.utils import timezone

class CategoryPostList(ListView):

    def get_queryset(self):
        return Post.objects.filter(categoty__tag=self.kwargs['slug'], status = 1)

class PostDetailView(DetailView):

    model = Post

    def get_context_data(self, **kwargs):
        context = super(PostDetailView, self).get_context_data(**kwargs)
        context['now'] = timezone.now()
        return context

class RandomPostView(View):

    template_name = "blog/post.html"

    def get(self, request, *args, **kwargs):
        post = Post.objects.filter(status = 1).order_by('?')[0]
        return HttpResponse('Hello, World!')