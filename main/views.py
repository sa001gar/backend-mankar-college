from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.db.models import Q

from .models import GalleryItem, GalleryCategory, Alumni, Notice

# Create your views here.
def home(request):
    highlights = Notice.objects.filter(highlight=True).order_by('-date')[:5]
    notices = Notice.objects.order_by('-date')[:7]
    return render(request, 'main/index.html',{'highlights':highlights,'notices':notices})

def about(request):
    return render(request, 'main/about.html')

def faculty(request):
    return render(request, 'main/faculty.html')

def team(request):
    return render(request, 'main/team.html')

def alumni(request):
    batch_years = Alumni.objects.values_list('batch_year', flat=True).distinct().order_by('-batch_year')
    
    return render(request, 'main/alumni.html',{'batch_years':batch_years,})

def gallery(request):
    catagories=GalleryCategory.objects.all()
    return render(request, 'main/department-gallery.html',{'catagories':catagories})

def gallery_data(request):
    items = GalleryItem.objects.select_related('category').all()
    data = [
        {
            'id': item.id,
            'category': item.category.name if item.category else '',  # Used 'name' since 'slug' doesn't exist
            'image': item.image.url if item.image else '',
            'title': item.title,
            'description': item.description,
            'date': item.date.strftime('%b %Y') if item.date else ''
        }
        for item in items
    ]
    return JsonResponse(data, safe=False)

def feedback(request):
    
    return render(request, 'main/feedback.html')

def get_alumni_by_batch(request):
    batch_no = request.GET.get('batch_no')
    
    # Get all alumni if no batch number is provided
    if not batch_no:
        alumni_list = Alumni.objects.all()
    else:
        try:
            batch_no = int(batch_no)
            alumni_list = Alumni.objects.filter(batch_year=batch_no)
        except ValueError:
            return JsonResponse({'error': 'Invalid batch number'}, status=400)
    
    # Convert alumni data to JSON format
    alumni_data = []
    for alumni in alumni_list:
        alumni_data.append({
            'id': alumni.id,
            'name': alumni.name,
            'batch_year': alumni.batch_year,
            'current_position': alumni.current_position,
            'company': alumni.company,
            'profile_image': alumni.profile_image.url if alumni.profile_image else None,
            'linkedin_url': alumni.linkedin_url,
            'github': alumni.github,
            'email': alumni.email
        })
    
    return JsonResponse({
        'count': len(alumni_data),
        'alumni': alumni_data
    })


def syllabus(request):
    number=range(1,9)
    return render(request, 'main/syllabus.html',{'number':number})
    