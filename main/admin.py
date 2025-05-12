from django.contrib import admin
"""
This module customizes the Django admin interface for the Mankar College website.
It extends the default Django admin functionality by:
- Unregistering the default `User` and `Group` models from the admin site.
- Registering custom admin classes for `User` and `Group` models using `unfold`'s `ModelAdmin` for enhanced styling and functionality.
- Associating custom forms (`UserChangeForm`, `UserCreationForm`, and `AdminPasswordChangeForm`) with the `UserAdmin` class for managing user data and password changes.
- Registering additional models (`GalleryCategory`, `GalleryItem`, `Alumni`, `Notice`, `NoticeCategory`, and `StudentFeedback`) with the admin site using `unfold`'s `ModelAdmin`.
Each registered model is associated with a corresponding admin class, which inherits from `ModelAdmin` to provide a consistent and styled admin interface.
This module ensures that the admin interface is tailored to the specific needs of the Mankar College website, providing a user-friendly and visually appealing experience for administrators.
"""
from unfold.admin import ModelAdmin
# Styling User & Admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.admin import GroupAdmin as BaseGroupAdmin
from django.contrib.auth.models import User, Group

from unfold.forms import AdminPasswordChangeForm, UserChangeForm, UserCreationForm
from unfold.admin import ModelAdmin

admin.site.unregister(User)
admin.site.unregister(Group)

@admin.register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    # Forms loaded from `unfold.forms`
    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm

@admin.register(Group)
class GroupAdmin(BaseGroupAdmin, ModelAdmin):
    pass



"""Here all models of the app are registered with the admin site"""
# Register your models here.
from .models import GalleryCategory, GalleryItem , Alumni, Notice, NoticeCategory, StudentFeedback, StudyMaterial
@admin.register(Notice)
class NoticeAdmin(ModelAdmin):
    pass

@admin.register(NoticeCategory)
class NoticeCategoryAdmin(ModelAdmin):
    pass

@admin.register(GalleryCategory)
class GalleryCategoryAdmin(ModelAdmin):
    pass

@admin.register(GalleryItem)
class GalleryItemAdmin(ModelAdmin):
    pass

@admin.register(Alumni)
class AlumniAdmin(ModelAdmin):
    pass

@admin.register(StudentFeedback)
class StudentFeedbackAdmin(ModelAdmin):
    pass

@admin.register(StudyMaterial)
class StudyMaterialAdmin(ModelAdmin):
    pass