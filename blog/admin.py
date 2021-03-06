from django.contrib import admin
from blog.models import *

class CategoryAdmin(admin.ModelAdmin):
	prepopulated_fields = {'slug': ('name',)}
admin.site.register(Category,CategoryAdmin)


class PostAdmin(admin.ModelAdmin):
	prepopulated_fields = {'slug': ('title',)}
	list_display = ('title', 'pub_date', 'status',)
	list_filter = ('pub_date', 'category')
	filter_horizontal = ("category",)
	# class Media:
	# 	js = ("/static/js/tiny_mce/tiny_mce.js","/static/js/tiny_mce/textareas.js")
admin.site.register(Post,PostAdmin)
