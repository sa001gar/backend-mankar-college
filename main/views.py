from django.shortcuts import render,redirect, get_object_or_404
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
import json


from .models import GalleryItem, GalleryCategory, Alumni, Notice, StudentFeedback
from .forms import AlumniForm


# Create your views here.
def home(request):
    highlights = Notice.objects.filter(highlight=True).order_by('date')[:5]
    notices = Notice.objects.order_by('date')[:7]
    return render(request, 'main/index.html',{'highlights':highlights,'notices':notices})

def about(request):
    return render(request, 'main/about.html')

def team(request):
    return render(request, 'main/team.html')

def notices(request):
    notices = Notice.objects.order_by('-date')[:10]
    return render(request, 'main/notices.html',{'notices':notices})

def faculty(request):
    return render(request, 'main/faculty.html')


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
            'image': item.image.url if item.image else item.image_link,
            'title': item.title,
            'description': item.description,
            'date': item.date.strftime('%b %Y') if item.date else ''
        }
        for item in items
    ]
    return JsonResponse(data, safe=False)

def feedback(request):
    
    return render(request, 'main/feedback.html')



def register_alumni(request):
    if request.method == "POST":
        form = AlumniForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Alumni registered successfully! Use your passcode to update your profile later.")
            return redirect("register-alumni")  # Change this to your actual alumni list view
    else:
        form = AlumniForm()

    return render(request, "main/register_alumni.html", {
        "form": form,
        "form_title": "Register Alumni",
        "submit_button_text": "Register",
        "passcode_label":"Create a 6-Digit Passcode",
        "passcode_help_text":"This passcode will be required for profile updates.",
        
    })


def update_alumni_profile(request, pk):
    alumni = get_object_or_404(Alumni, pk=pk)

    # Step 1: Require Passcode Verification Before Update
    if "passcode_verified" not in request.session or request.session["passcode_verified"] != pk:
        if request.method == "POST":
            entered_passcode = request.POST.get("passcode")
            if entered_passcode == alumni.passcode:
                request.session["passcode_verified"] = pk  # Store verification in session
                return redirect("update-alumni", pk=pk)  # Reload update page
            else:
                messages.error(request, "Incorrect passcode. Please try again.")
        
        return render(request, "main/alumni_passcode_verify.html", {"alumni": alumni})

    # Step 2: Show the Update Form if Passcode is Verified
    if request.method == "POST":
        form = AlumniForm(request.POST, request.FILES, instance=alumni)

        if form.is_valid():
            form.save()  # Prevent auto-save
            request.session.pop("passcode_verified", None)  # Remove session after update
            messages.success(request, "Profile updated successfully!")
            return redirect("alumni")  # Redirect to alumni list

    else:
        form = AlumniForm(instance=alumni)
        form.fields["passcode"].required = False  # Make passcode optional in the form

    return render(request, "main/register_alumni.html", {
        "form": form,
        "form_title": "Update Alumni Profile",
        "submit_button_text": "Update Profile",
        "passcode_label": "Enter Passcode",
        "passcode_help_text": "Enter a new 6-digit passcode (Or enter the current one).",
    })


def alumni_profile(request, pk):
    # Get the alumni object with all related data using prefetch_related
    # 
    alumni=Alumni.objects.get(pk=pk)
    return render(request, 'main/alumni_profile.html', {
        'alumni': alumni,
        
    })

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


# def register_alumni_api(request):
#     if request.method == 'POST' and request.headers.get('X-Requested-With') == 'XMLHttpRequest':
#         try:
#             name = request.POST.get('name')
#             batch_year = request.POST.get('batch_year')
#             current_position = request.POST.get('current_position')
#             company = request.POST.get('company')
#             linkedin_url = request.POST.get('linkedin_url', '')
#             github = request.POST.get('github', '')
#             email = request.POST.get('email', '')

#             # Get profile image
#             profile_image = request.FILES.get('profile_image')

#             # Validate required fields
#             if not name or not batch_year or not current_position or not company:
#                 return JsonResponse({'status': 'error', 'message': 'Missing required fields'}, status=400)

#             # Create Alumni object
#             alumni = Alumni.objects.create(
#                 name=name,
#                 batch_year=batch_year,
#                 current_position=current_position,
#                 company=company,
#                 linkedin_url=linkedin_url,
#                 github=github,
#                 email=email,
#                 profile_image=profile_image  # Save the uploaded image
#             )

#             return JsonResponse({'status': 'success', 'message': 'Alumni registered successfully!'})

#         except Exception as e:
#             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

#     return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)


def syllabus(request):
    number=range(1,9)
    return render(request, 'main/syllabus.html',{'number':number})
    
def previous_papers(request):
    return render(request, 'main/previous-year-questions.html')


def submit_feedback(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            feedback = StudentFeedback.objects.create(
                name=data.get('name'),
                email_id=data.get('email_id'),
                whatsapp_number=data.get('whatsapp_number'),
                is_alumni=data.get('is_alumni'),
                course_content_rating=data.get('course_content_rating'),
                learning_objectives_clarity=data.get('learning_objectives_clarity'),
                teaching_methods_effectiveness=data.get('teaching_methods_effectiveness'),
                course_difficulty=data.get('course_difficulty'),
                course_resources_rating=data.get('course_resources_rating'),
                lab_sessions_helpfulness=data.get('lab_sessions_helpfulness'),
                course_assignments_rating=data.get('course_assignments_rating'),
                course_improvement_suggestion=data.get('course_improvement_suggestion'),
                additional_comments=data.get('additional_comments')

            )

            return JsonResponse({"message": "Success"}, status=200)
        
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)