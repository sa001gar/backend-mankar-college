from django.shortcuts import render,redirect, get_object_or_404
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
import json


from django.views.decorators.http import require_POST
import json
import os
import requests
from django.conf import settings


from .models import GalleryItem, GalleryCategory, Alumni, Notice, StudentFeedback,StudyMaterial, Reminder
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
        

# # Update Alumni Profile View Function
# def update_alumni_profile(request, pk):
#     alumni = get_object_or_404(Alumni, pk=pk)

#     # Step 1: Enforce Passcode Verification Before Allowing Updates
#     if request.session.get("passcode_verified") != pk:
#         if request.method == "POST":
#             entered_passcode = request.POST.get("passcode")
#             if entered_passcode == alumni.passcode:
#                 request.session["passcode_verified"] = pk  # Store verification in session
#                 return redirect("update-alumni", pk=pk)  
#             else:
#                 messages.error(request, "Incorrect passcode. Please try again.")

#         return render(request, "main/alumni_passcode_verify.html", {"alumni": alumni})

#     # Step 2: Allow Profile Update Only If Passcode Is Verified
#     if request.method == "POST":
#         form = AlumniForm(request.POST, request.FILES, instance=alumni)
#         if form.is_valid():
#             form.save()
#             request.session.pop("passcode_verified", None)  # Remove verification after updating
#             messages.success(request, "Profile updated successfully!")
#             return redirect("alumni")  # Redirect to alumni page after update
#         else:
#             messages.error(request, "Please correct the errors in the form.")

#     else:
#         form = AlumniForm(instance=alumni)

#     return render(request, "main/register_alumni.html", {
#         "form": form,
#         "form_title": "Update Alumni Profile",
#         "submit_button_text": "Update Profile",
#         "passcode_label": "Enter Passcode",
#         "passcode_help_text": "Enter your 6-digit passcode to update the profile.",
#     })


# Alumni Profile View Function
def alumni_profile(request, name):
    # Convert 'john-doe' -> 'John Doe'
    name_from_url = name.replace('-', ' ')
    alumni = get_object_or_404(Alumni, name__iexact=name_from_url)
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
            'profile_image': alumni.profile_image.url if alumni.profile_image and alumni.profile_image.url else (alumni.img_url if alumni.img_url and alumni.img_url else None),
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
# def previous_papers(request):
#     return render(request, 'main/previous-year-questions.html')


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

def study_materials(request):
    # Get all study materials
    study_materials = StudyMaterial.objects.all()
    subjects= StudyMaterial.objects.values_list('subject', flat=True).distinct()
    semesters= StudyMaterial.objects.values_list('semester', flat=True).distinct()
    return render(request, 'main/study-materials.html', {
        'study_materials': study_materials,
        'subjects': subjects,
        'semesters': semesters,
    })



# Chatbot Response API
API_KEY = os.environ.get('GEMINI_API_KEY') 
API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent'

# Fallback responses if API fails
def fallback_response(message):
    message_lower = message.lower()
    
    if any(term in message_lower for term in ["course", "program"]):
        return "The Department of Computer Science offers various programs including B.Sc. in Computer Science, BCA, and M.Sc. in Computer Science. Each program is designed to provide both theoretical knowledge and practical skills needed in the industry. Would you like specific information about any of these programs?"
    elif any(term in message_lower for term in ["faculty", "professor", "teacher"]):
        return "Our department has 12 faculty members specializing in various areas of computer science including AI, data science, networking, and software engineering. All our faculty members hold advanced degrees and have significant research or industry experience. Would you like to know about specific faculty members or research areas?"
    elif any(term in message_lower for term in ["admission", "apply", "enroll"]):
        return "Admission to our programs is based on merit and entrance examinations. The application process typically begins in May each year. You'll need to submit an online application, academic transcripts, and attend an entrance test. Would you like details about eligibility criteria or application deadlines?"
    elif any(term in message_lower for term in ["lab", "facility", "infrastructure"]):
        return "We have 5 state-of-the-art computer labs equipped with the latest hardware and software. This includes specialized labs for AI research, networking, and software development. Our facilities also include high-performance computing resources, IoT lab, and cybersecurity testing environments."
    elif any(term in message_lower for term in ["research", "project"]):
        return "The CS Department focuses on several key research areas including Machine Learning, Cybersecurity, Cloud Computing, Internet of Things (IoT), and Data Analytics. Faculty members actively publish in these fields and we have multiple ongoing projects with industry collaboration. Students can join these research groups based on their interests."
    elif any(term in message_lower for term in ["career", "job", "placement"]):
        return "Our CS graduates have excellent career prospects. Many join leading tech companies as software developers, data scientists, cybersecurity specialists, or system architects. We have strong industry connections and a dedicated placement cell that helps students with internships and job placements. Our placement rate is consistently above 90% for all programs."
    elif any(term in message_lower for term in ["contact", "reach", "email"]):
        return "You can contact the Department of Computer Science at cs@mankarcollege.edu or call us at +91-XXXXXXXXXX. Our office is located in the Science Building, Room 301. Office hours are Monday to Friday, 9 AM to 5 PM. For admissions-specific queries, you can also contact admissions@mankarcollege.edu."
    else:
        return "Thank you for your question about our Computer Science department. While I'm currently operating in offline mode, I'd be happy to help with information about our courses, faculty, research areas, admissions, facilities, or career opportunities. Could you please provide more specific details about what you're looking for?"

def call_gemini_api(message, conversation_history=None):
    if conversation_history is None:
        conversation_history = []
    
    try:
        # Build the prompt with enhanced context for better responses
        system_prompt = """You are an AI assistant for the Computer Science Department at Mankar College. 
        You are helpful, clear, and knowledgeable about computer science topics and the department's offerings.
        
        Some key information about the CS Department at Mankar College:
        1. Programs: B.Sc. in Computer Science.
        2. Faculty: 8 faculty members specializing in AI, data science, networking, and software engineering
        3. Facilities: 5 state-of-the-art computer labs for AI research, networking, and software development
        4. Research Areas: Machine Learning, Cybersecurity, Cloud Computing, IoT, and Data Analytics
        5. Contact: deptofcompsc@mankarcollege.ac.in, Phone: +91-94759 29208, Office hours: Monday to Friday, 9 AM to 5 PM
        
        Always be conversational, concise, and accurate in your responses.
        Your task is to assist users with their queries related to the CS Department.
        User's question: {}""".format(message)
        
        # Prepare the API request data
        request_data = {
            "contents": [
                {
                    "role": "user",
                    "parts": [{"text": system_prompt}]
                }
            ]
        }
        
        # Add conversation history to the request (limit to last 10 for performance)
        recent_messages = conversation_history[-10:] if len(conversation_history) > 10 else conversation_history
        for msg in recent_messages:
            request_data["contents"].append({
                "role": "model" if msg["role"] == "assistant" else "user",
                "parts": [{"text": msg["content"]}]
            })
        
        # Make the API request
        response = requests.post(
            f"{API_URL}?key={API_KEY}",
            headers={"Content-Type": "application/json"},
            json=request_data
        )
        
        # Check if the response is successful
        if response.status_code != 200:
            print(f"Gemini API error: {response.text}")
            return fallback_response(message)
        
        # Parse the response
        response_data = response.json()
        
        # Extract and return the response text
        return response_data["candidates"][0]["content"]["parts"][0]["text"]
    
    except Exception as e:
        print(f"Error in Gemini API call: {str(e)}")
        return fallback_response(message)

@csrf_exempt
@require_POST
def chatbot_response(request):
    try:
        data = json.loads(request.body)
        user_message = data.get('message', '')
        conversation_history = data.get('conversation_history', [])
        
        # Validate input
        if not user_message:
            return JsonResponse({'status': 'error', 'message': 'No message provided'}, status=400)
        
        # Call the Gemini API or use fallback
        response_text = call_gemini_api(user_message, conversation_history)
        
        # Return the response
        return JsonResponse({
            'status': 'success',
            'response': response_text
        })
    
    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return JsonResponse({
            'status': 'error', 
            'message': 'An error occurred processing your request',
            'response': fallback_response(user_message) if 'user_message' in locals() else "I'm sorry, I couldn't process your request."
        })

# Endpoint to check if the API is available (helpful for client-side decisions)
def check_api_status(request):
    try:
        response = requests.get(
            f"https://generativelanguage.googleapis.com/v1/models?key={API_KEY}",
            timeout=5
        )
        api_available = response.status_code == 200
    except:
        api_available = False
    
    return JsonResponse({
        'status': 'success',
        'api_available': api_available
    })

@csrf_exempt  # For simplicity; better to use CSRF token properly in production
def create_reminder(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            whatsapp = data.get('whatsapp_number')

            if not name or not email or not whatsapp:
                return JsonResponse({'error': 'All fields are required'}, status=400)

            Reminder.objects.create(name=name, email=email, whatsapp_number=whatsapp)
            return JsonResponse({'message': 'Reminder saved successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request'}, status=400)


def previous_papers(request):
    # Sample data structure - in a real app, this would come from your database
    papers_2023 = [
        {
            "subject": "Introduction to Programming",
            "code": "CS101",
            "semester": "1",
            "exam_type": "Midterm",
            "duration": "1.5 hours",
            "max_marks": 50
        },
        {
            "subject": "Data Structures and Algorithms",
            "code": "CS201",
            "semester": "2",
            "exam_type": "Final",
            "duration": "3 hours",
            "max_marks": 100
        }
    ]
    
    papers_2024 = [
        {
            "subject": "Introduction to Programming",
            "code": "CS101",
            "semester": "1",
            "exam_type": "Midterm",
            "duration": "1.5 hours",
            "max_marks": 50
        }
    ]
    
    context = {
        'papers_2023': papers_2023,
        'papers_2024': papers_2024,
    }
    
    return render(request, 'main/previous-year-questions.html', context)