import json
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'MCCS.settings')
django.setup()

from main.models import Alumni

# JSON file path
json_path = os.path.join(os.path.dirname(__file__), 'fixtures', 'alumni-list.json')

# Image prefix
IMG_URL_PREFIX = "https://beta.computersciencemancoll.in/admin/alumniimg/"

# PID to batch year mapping
def get_batch_year(pyid):
    return 1996 + int(pyid)  # pyid 1 → 1997

# Load data
with open(json_path, 'r', encoding='utf-8') as f:
    alumni_data = json.load(f)

# Import alumni
for entry in alumni_data:
    name = entry.get("Name", "").strip()
    batch_year = get_batch_year(entry.get("pyid", "1"))
    current_position = entry.get("currentocupation", "").strip()
    company = entry.get("companyname", "").strip()
    email = entry.get("email", "").strip() or ""
    linkedin = entry.get("sociallink", "").strip() or ""
    education = entry.get("hqualification", "").strip()
    image_filename = entry.get("image", "").strip()
    img_url = IMG_URL_PREFIX + image_filename if image_filename else ""

    alumni, created = Alumni.objects.get_or_create(
        name=name,
        batch_year=batch_year,
        defaults={
            "current_position": current_position,
            "company": company,
            "email": email,
            "linkedin_url": linkedin,
            "github": "",
            "bio": entry.get("your_message", "").strip(),
            "education": education,
            "skills": [],
            "display": True,  # You can toggle this
            "img_url": img_url,
        }
    )

    if created:
        print(f"✅ Created: {name} ({batch_year})")
    else:
        print(f"⚠️ Already exists: {name} ({batch_year})")
