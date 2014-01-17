from django.forms import ModelForm
from blog.models import Contact

class ContactForm(ModelForm):
	class Meta:
		model = Contact
		fields = ('name', 'email', 'message')
		#widgets = {'name': Textarea(attrs={'cols': 80, 'rows': 20}),}