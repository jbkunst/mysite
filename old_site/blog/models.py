from django.db import models
from django.contrib.sitemaps import ping_google
from random import randrange
import datetime

class Category(models.Model):
	name = models.CharField(max_length=100)
	slug = models.SlugField(unique=True) 

	def counter(self):
		return self.entry_set.all().count()
	
	class Meta:
		verbose_name_plural = 'Categories'
		ordering = ('?',)

	class Admin:
		pass
	
	def __unicode__(self):
		return self.name
		
	@models.permalink
	def get_absolute_url(self):
		return ('blog.views.category', (), { 'slug': self.slug })
	
class Entry(models.Model):

	STATUS_CHOICES = ((1, 'Live'), (2, 'Draft'), (3, 'Hidden'))

	category = models.ManyToManyField(Category)
	title = models.CharField(max_length=250)
	slug = models.SlugField(unique=True)
	body = models.TextField()
	pub_date = models.DateTimeField(default=datetime.datetime.now())
	status = models.IntegerField(choices=STATUS_CHOICES, default=2)
	image = models.ImageField(blank=True,upload_to= 'images_pf/')
	allow_comments = models.BooleanField(default=True)
 
	def save(self, force_insert=False, force_update=False):
		super(Entry, self).save(force_insert, force_update)
		
		for field in self._meta.fields:
			if field.name == 'file':
				field.upload_to = 'images_pf/'
		super(Entry, self).save()
		
		try:
			ping_google()
		except Exception:
			# Bare 'except' because we could get a variety
			# of HTTP-related exceptions.
			pass
		
	# Always in any project change the "class"
	# Image for port folio, imgborder
	def get_image(self,):
		if self.image:
			return u'<img src="%s" class="imgborder">' % (self.image.url)
		else:
			col = "%s" % "".join([hex(randrange(0, 255))[2:] for i in range(3)])
			return u'<img src="http://ipsumimage.appspot.com/193x158,%s?l=OMGSH!|Here+must+be+an+image" class="imgborder">' % (col)
			
	# Image for post, allgin left
	def get_image2(self,):
		if self.image:
			return u'<img src="%s" alt="" class="alignleft imgframe2"/>' % (self.image.url)
		else:
			col = "%s" % "".join([hex(randrange(0, 255))[2:] for i in range(3)])
			return u'<img src="http://ipsumimage.appspot.com/193x158,%s?l=OMGSH!|Here+must+be+an+image" class="alignleft imgframe2">' % (col)
				
	get_image.allow_tags = True
	get_image.short_description = 'Image'
 
	def get_categories(self):
		return self.category.all()
		#cats =  [ c.name for c in self.category.all()]
		#return ", ".join(cats)
	
	def get_categories_admin(self):
		cats =  [ c.name for c in self.category.all()]
		return ", ".join(cats)
	
	get_categories.allow_tags =True
 
	class Meta:
		verbose_name_plural = "Entries"
		ordering = ('-pub_date',)
	
	class Admin:
		pass
		
	def __unicode__(self):
		return self.title

	@models.permalink
	def get_absolute_url(self):
		return ('blog.views.entry', (), { 'slug': self.slug })
		
class Contact(models.Model):
	name = models.CharField(max_length=250)
	email = models.EmailField()
	date = models.DateTimeField(default=datetime.datetime.now())
	message = models.TextField()
	