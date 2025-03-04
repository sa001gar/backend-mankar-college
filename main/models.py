from django.db import models
from django.core.validators import FileExtensionValidator 

# Notice Catagory
class NoticeCategory(models.Model):
    name = models.CharField(max_length=255)
    
    class Meta:
        ordering = ['name']
        verbose_name_plural = 'Notice Categories'
    
    def __str__(self):
        return self.name

# Notices 
class Notice(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(NoticeCategory, on_delete=models.CASCADE, null=True, blank=True)
    pdf = models.FileField(upload_to='notices/', validators=[
        FileExtensionValidator(allowed_extensions=['pdf'])
    ], blank=True)
    link = models.URLField(blank=True)
    date = models.DateField()
    highlight = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-date']
        verbose_name_plural = 'Notices'
    
    def __str__(self):
        return self.title


# Gallery Catagory 
class GalleryCategory(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        ordering = ['name']
        verbose_name_plural = 'Gallery Categories'

        
    def __str__(self):
        return self.name
    
# Gallery Items 
class GalleryItem(models.Model):
    category = models.ForeignKey(GalleryCategory, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='gallery_images/',blank=True)
    image_link=models.URLField(blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()

    def __str__(self):
        return self.title

# Alumni
class Alumni(models.Model):
    name = models.CharField(max_length=100)
    batch_year = models.IntegerField()
    current_position = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    profile_image = models.ImageField(upload_to='alumni_photos/', null=True, blank=True)
    linkedin_url = models.URLField(blank=True)
    github = models.URLField(blank=True)
    email = models.EmailField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    display = models.BooleanField(default=False)
    bio=models.TextField(blank=True)
    passcode = models.CharField(max_length=6) # Stores the 6-digit passcode
    
    class Meta:
        ordering = ['-batch_year', 'name']
        verbose_name_plural = 'Alumni'
    
    def __str__(self):
        return f"{self.name} - Batch {self.batch_year}"

# Student Feedback
class StudentFeedback(models.Model):
    ALUMNI_CHOICES = [
        ('Yes', 'Yes'),
        ('No', 'No'),
    ]
    
    RATING_CHOICES = [
        ('Excellent', 'Excellent'),
        ('Good', 'Good'),
        ('Average', 'Average'),
        ('Poor', 'Poor'),
    ]
    AGREEMENT_CHOICES = [
        ('Strongly Agree', 'Strongly Agree'),
        ('Agree', 'Agree'),
        ('Neutral', 'Neutral'),
        ('Disagree', 'Disagree'),
    ]
    EFFECTIVENESS_CHOICES = [
        ('Very Effective', 'Very Effective'),
        ('Effective', 'Effective'),
        ('Somewhat Effective', 'Somewhat Effective'),
        ('Not Effective', 'Not Effective'),
    ]
    DIFFICULTY_CHOICES = [
        ('Too Difficult', 'Too Difficult'),
        ('Moderately Difficult', 'Moderately Difficult'),
        ('Just Right', 'Just Right'),
        ('Too Easy', 'Too Easy'),
    ]
    HELPFULNESS_CHOICES = [
        ('Very Helpful', 'Very Helpful'),
        ('Helpful', 'Helpful'),
        ('Somewhat Helpful', 'Somewhat Helpful'),
        ('Not Helpful', 'Not Helpful'),
    ]
    ASSIGNMENT_DIFFICULTY = [
        ('Very Challenging', 'Very Challenging'),
        ('Challenging', 'Challenging'),
        ('Moderate', 'Moderate'),
        ('Easy', 'Easy'),
    ]
    IMPROVEMENT_CHOICES = [
        ('More Practical Sessions', 'More Practical Sessions'),
        ('Better Study Materials', 'Better Study Materials'),
        ('More Interactive Classes', 'More Interactive Classes'),
        ('Other', 'Other'),
    ]

    name = models.CharField(max_length=255)
    email_id = models.EmailField()
    whatsapp_number = models.CharField(max_length=15)
    is_alumni = models.CharField(max_length=15, choices=ALUMNI_CHOICES)
    
    course_content_rating = models.CharField(max_length=10, choices=RATING_CHOICES)
    learning_objectives_clarity = models.CharField(max_length=20, choices=AGREEMENT_CHOICES)
    teaching_methods_effectiveness = models.CharField(max_length=20, choices=EFFECTIVENESS_CHOICES)
    course_difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    
    course_resources_rating = models.CharField(max_length=10, choices=RATING_CHOICES)
    lab_sessions_helpfulness = models.CharField(max_length=20, choices=HELPFULNESS_CHOICES)
    course_assignments_rating = models.CharField(max_length=20, choices=ASSIGNMENT_DIFFICULTY)
    course_improvement_suggestion = models.CharField(max_length=30, choices=IMPROVEMENT_CHOICES)

    additional_comments = models.TextField(blank=True)

    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email_id}"

