from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('',views.home, name='home'),
    path('about/', views.about, name='about'),
    path('team/', views.team, name='team'),

    path('notices/', views.notices, name='notices'),

    path('faculty/', views.faculty, name='faculty'),
    path('alumni/', views.alumni, name='alumni'),
    path('gallery/', views.gallery, name='gallery'),
    path('feedback/', views.feedback, name='feedback'),
    path('syllabus/', views.syllabus, name='syllabus'),
    path('previous-papers/', views.previous_papers, name='previous-papers'),

    path('api/submit-feedback/', views.submit_feedback, name='submit-feedback'),

    path('gallery-data/', views.gallery_data, name='gallery-data'),
    path('api/alumni/', views.get_alumni_by_batch, name='get_alumni_by_batch'),
]