# -*- coding: utf-8 -*
from blog.models import Category, Post


def blog(request):

    categories = Category.objects.all()
    some_posts = Post.objects.filter(status = 1).order_by('?')[0:len(categories)]

    return {
        'categories': categories,
        'some_posts': some_posts
    }
