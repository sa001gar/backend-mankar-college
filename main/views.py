from django.shortcuts import render,redirect, get_object_or_404
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
import json


from .models import GalleryItem, GalleryCategory, Alumni, Notice, StudentFeedback
from .forms import AlumniForm

"""
Add the following views to main/views.py
"""
# Home View Function
def home(request):
    highlights = Notice.objects.filter(highlight=True).order_by('-date')[:5]
    notices = Notice.objects.order_by('-date')[:7]
    filtered_alumni = Alumni.objects.filter(display=True)
    return render(request, 'main/index.html',{'highlights':highlights,'notices':notices,'alumnis':filtered_alumni})

# About View Function
def about(request):
    # filtered_alumni = Alumni.objects.filter(display=True)
    # return render(request, 'main/about.html',{'alumnis':filtered_alumni})
    return render(request, 'main/about.html')


# Team View Function
def team(request):
    return render(request, 'main/team.html')

# Notices View Function
def notices(request):
    notices = Notice.objects.order_by('-date')[:10]
    return render(request, 'main/notices.html',{'notices':notices})

# Faculty View Function
def faculty(request):
    return render(request, 'main/faculty.html')

# Gallery View Function
def gallery(request):
    catagories=GalleryCategory.objects.all()
    return render(request, 'main/department-gallery.html',{'catagories':catagories})

# API to get gallery data
def gallery_data(request):
    items = GalleryItem.objects.select_related('category').all()
    data = [
        {
            'id': item.id,
            'category': item.category.name if item.category else '',
            'image': item.image.url if item.image else item.image_link,
            'title': item.title,
            'description': item.description,
            'date': item.date.strftime('%b %Y') if item.date else ''
        }
        for item in items
    ]
    return JsonResponse(data, safe=False)

# Alumni View Function
def alumni(request):
    batch_years = Alumni.objects.values_list('batch_year', flat=True).distinct().order_by('-batch_year')
    return render(request, 'main/alumni.html',{'batch_years':batch_years,})

# Register Alumni View Function
def register_alumni(request):
    if request.method == "POST":
        form = AlumniForm(request.POST, request.FILES)
        
        if form.is_valid():
            form.save()
            return JsonResponse({"success": True, "message": "Alumni registered successfully!"})
        else:
            return JsonResponse({
                "success": False,
                "error": "Please correct the errors in the form.",
                "errors": form.errors  # Send form errors as JSON
            }, status=400)

    # If it's NOT an AJAX request, return HTML page
    if request.headers.get("X-Requested-With") == "XMLHttpRequest":
        return JsonResponse({"error": "Invalid request method"}, status=400)

    form = AlumniForm()
    return render(request, "main/register_alumni.html", {"form": form,"form_title": "Register Alumni",
        "submit_button_text": "Register",
        "passcode_label": "Create a 6-Digit Passcode",
        "passcode_help_text": "This passcode will be required for profile updates.",})
        

# Update Alumni Profile View Function
def update_alumni_profile(request, pk):
    alumni = get_object_or_404(Alumni, pk=pk)

    # Step 1: Enforce Passcode Verification Before Allowing Updates
    if request.session.get("passcode_verified") != pk:
        if request.method == "POST":
            entered_passcode = request.POST.get("passcode")
            if entered_passcode == alumni.passcode:
                request.session["passcode_verified"] = pk  # Store verification in session
                return redirect("update-alumni", pk=pk)  
            else:
                messages.error(request, "Incorrect passcode. Please try again.")

        return render(request, "main/alumni_passcode_verify.html", {"alumni": alumni})

    # Step 2: Allow Profile Update Only If Passcode Is Verified
    if request.method == "POST":
        form = AlumniForm(request.POST, request.FILES, instance=alumni)
        if form.is_valid():
            form.save()
            request.session.pop("passcode_verified", None)  # Remove verification after updating
            messages.success(request, "Profile updated successfully!")
            return redirect("alumni")  # Redirect to alumni page after update
        else:
            messages.error(request, "Please correct the errors in the form.")

    else:
        form = AlumniForm(instance=alumni)

    return render(request, "main/register_alumni.html", {
        "form": form,
        "form_title": "Update Alumni Profile",
        "submit_button_text": "Update Profile",
        "passcode_label": "Enter Passcode",
        "passcode_help_text": "Enter your 6-digit passcode to update the profile.",
    })


# Alumni Profile View Function
def alumni_profile(request, pk):
    alumni=Alumni.objects.get(pk=pk)
    return render(request, 'main/alumni_profile.html', {
        'alumni': alumni,
        
    })

# API to get alumni data by batch number
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


# Syllabus View Function
def syllabus(request):
    number=range(1,9)
    return render(request, 'main/syllabus.html',{'number':number})

# Previous Year Questions View Function    
def previous_papers(request):
    return render(request, 'main/previous-year-questions.html')


# Feedback = StudentFeedback View Function
def feedback(request):
    return render(request, 'main/feedback.html')

# Submit Feedback API
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