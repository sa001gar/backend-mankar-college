from django.contrib.sitemaps import Sitemap
from django.urls import reverse

class StaticViewSitemap(Sitemap):
    priority = 1.0
    changefreq = 'weekly'

    def items(self):
        return ['home', 'about', 'faculty','notices', 'faculty', 
            'alumni', 
            'gallery', 
            'feedback', 
            'syllabus', 
            'previous-papers', 
            'study-material',
            'team']  # named URL patterns

    def location(self, item):
        return reverse(item)