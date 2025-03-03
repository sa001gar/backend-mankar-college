from django import forms
from .models import Alumni

class AlumniForm(forms.ModelForm):
    class Meta:
        model = Alumni
        fields = [
            "name", "batch_year", "current_position", "company",
            "profile_image", "linkedin_url", "github", "email", "bio", "passcode"
        ]
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter your full name'}),
            'batch_year': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Batch Starting year (e.g., 2020)'}),
            'current_position': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Your current job title or student or another'}),
            'company': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Company/Organization name/College name'}),
            'linkedin_url': forms.URLInput(attrs={'class': 'form-control', 'placeholder': 'LinkedIn profile URL'}),
            'github': forms.URLInput(attrs={'class': 'form-control', 'placeholder': 'GitHub profile URL'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Your email address'}),
            "bio": forms.Textarea(attrs={"rows": 3, "class": "form-control", "placeholder": "Write a short bio about yourself"}),
            'passcode': forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': '6-digit passcode'})
        }
    