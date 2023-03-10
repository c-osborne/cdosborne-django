from django.db import models

# Create your models here.
class Content(models.Model):
    title = models.TextField()
    category = models.TextField()
    date = models.DateField()
    image = models.TextField(default = '../static/images/default-card.png')
    summary = models.TextField()
    content = models.TextField() #include breaks for inserting links
    link = models.TextField()

    def __str__(self):
        return self.title
