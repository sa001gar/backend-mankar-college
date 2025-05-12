from django.contrib import admin
from django.urls import path

from django.contrib import sitemaps
from django.contrib.sitemaps.views import sitemap
from .sitemaps import StaticViewSitemap

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
    path('study-material/', views.study_materials, name='study-material'),

    path('alumni/register', views.register_alumni, name='register-alumni'),
    # path('alumni/update/<slug:pk>/', views.update_alumni_profile, name='update-alumni'),
    path('alumni/profile/<slug:name>/', views.alumni_profile, name='alumni-profile'),

   


    path('api/submit-feedback/', views.submit_feedback, name='submit-feedback'),
    path('gallery-data/', views.gallery_data, name='gallery-data'),
    path('api/alumni/', views.get_alumni_by_batch, name='get_alumni_by_batch'),


    path('api/chatbot/response/', views.chatbot_response, name='chatbot_response'),
    path('api/chatbot/status/', views.check_api_status, name='chatbot_api_status'),

    path('sitemap.xml', sitemap, {'sitemaps': {'static': StaticViewSitemap}}, name='sitemap'),
]