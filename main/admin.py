from django.contrib import admin
from .models import GalleryCategory, GalleryItem , Alumni, Notice, NoticeCategory, StudentFeedback

# Register your models here.
admin.site.register(Notice)
admin.site.register(NoticeCategory)

admin.site.register(GalleryCategory)
admin.site.register(GalleryItem)

admin.site.register(Alumni)

admin.site.register(StudentFeedback)