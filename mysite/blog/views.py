from django.views.generic import ListView, DetailView, View
from .models import Category, Post
from django.utils import timezone

class CategoryPostList(ListView):

    def get_queryset(self):
        return Post.objects.filter(category__slug=self.kwargs['slug'], status = 1)

    def get_context_data(self, **kwargs):
        context = super(CategoryPostList, self).get_context_data(**kwargs)
        context['category'] = Category.objects.get(slug=self.kwargs['slug'])
        return context

class PostDetailView(DetailView):

    model = Post

    def get_context_data(self, **kwargs):
        context = super(PostDetailView, self).get_context_data(**kwargs)
        return context

class RandomPostView(PostDetailView):

    def get_object(self):
        return Post.objects.filter(status = 1).order_by('?')[0]