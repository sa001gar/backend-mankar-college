// Updated sample faculty data with additional properties
const facultyMembers = [
    { 
        "id": 1,
        "name": "Amitava Bondyopadhay",
        "email": "in.amitava@gmail.com",
        "image": "https://media.computersciencemancoll.in/media/images/faculty/ab_sir.jpg",
        "featured": false,
        "isTeaching": true,
        "department": "Computer Science",
        "position": "Assistant Professor & Head",
        "publications": 15,
        "courses": 3,
        "books": ["Introduction to Machine Learning", "Data Mining Techniques"],
        "talks": ["AI in Healthcare", "The Future of Big Data"],
        "experiences": ["5 years in industry", "7 years in academia"],
        "areasOfInterest": ["Machine Learning", "Data Mining", "Artificial Intelligence"],
        "socialMedia": {
            "linkedin": "https://www.linkedin.com/in/amitava-bandyopadhyay/",
            "twitter": "https://twitter.com/amitavabandyop",
            "researchGate": "https://www.researchgate.net/profile/Amitava_Bandyopadhyay"
        }
    },
    { 
        "id": 2,
        "name": "Kunal Kumar Mandal",
        "email": "kkm.nitdgp@gmail.com",
        "image": "https://media.computersciencemancoll.in/media/images/kunal_sir.enc",
        "featured": false,
        "isTeaching": true,
        "department": "Computer Science",
        "position": "Assistant Professor",
        "publications": 10,
        "courses": 5,
        "books": ["Advanced Algorithms", "Computational Geometry"],
        "talks": ["Cloud Computing", "Blockchain Basics"],
        "experiences": ["3 years in industry", "8 years in academia"],
        "areasOfInterest": ["Cloud Computing", "Blockchain", "Distributed Systems"],
        "socialMedia": {
            "linkedin": "https://www.linkedin.com/in/kunal-kumar-mandal/",
            "twitter": "https://twitter.com/kkmandal",
            "researchGate": "https://www.researchgate.net/profile/Kunal_Kumar_Mandal"
        }
    },
    { 
        "id": 3,
        "name": "Monalisa Sardar",
        "email": "monalisasardar14@gmail.com",
        "image": "https://beta.computersciencemancoll.in/admin/fimages/1589545013-1587303664-fac3.jpg",
        "featured": false,
        "isTeaching": true,
        "department": "Computer Science",
        "position": "Assistant Professor",
        "publications": 5,
        "courses": 4,
        "books": [],
        "talks": ["Women in Tech", "Inclusive AI"],
        "experiences": ["2 years in industry", "5 years in academia"],
        "areasOfInterest": ["Human-Computer Interaction", "Educational Technology"],
        "socialMedia": {
            "linkedin": "https://www.linkedin.com/in/monalisa-sardar/",
            "twitter": "",
            "researchGate": "https://www.researchgate.net/profile/Monalisa_Sardar"
        }
    },
    { 
        "id": 4,
        "name": "Bappaditya Modak",
        "email": "modak.bappaditya@gmail.com",
        "image": "https://beta.computersciencemancoll.in/admin/fimages/1589545171-1587303758-fac4.jpg",
        "featured": false,
        "isTeaching": true,
        "department": "Computer Science",
        "position": "Contractual Whole Time Teacher",
        "publications": 2,
        "courses": 2,
        "books": [],
        "talks": ["Introduction to Programming"],
        "experiences": ["1 year in industry", "3 years in academia"],
        "areasOfInterest": ["Programming Languages", "Educational Technology"],
        "socialMedia": {
            "linkedin": "",
            "twitter": "",
            "researchGate": ""
        }
    },
    { 
        "id": 5,
        "name": "Sk. Anamul Hoda",
        "email": "skanamulhoda@yahoo.com",
        "image": "https://beta.computersciencemancoll.in/admin/fimages/1589545350-1587303857-fac5.jpg",
        "featured": false,
        "isTeaching": true,
        "department": "Computer Science",
        "position": "Contractual Whole Time Teacher",
        "publications": 0,
        "courses": 1,
        "books": [],
        "talks": ["Career in Programming"],
        "experiences": ["3 years in academia"],
        "areasOfInterest": ["Programming", "Open Source"],
        "socialMedia": {
            "linkedin": "",
            "twitter": "",
            "researchGate": ""
        }
    },
    { 
        "id": 6,
        "name": "Puja Bhakta",
        "email": "pujabhakta95@gmail.com",
        "image": "https://beta.computersciencemancoll.in/admin/fimages/1589545490-1587303919-fac6.jpg",
        "featured": false,
        "isTeaching": true,
        "department": "Computer Science",
        "position": "Guest Lecturer",
        "publications": 0,
        "courses": 1,
        "books": [],
        "talks": ["Basics of Web Development"],
        "experiences": ["1 year in academia"],
        "areasOfInterest": ["Web Development", "Frontend Design"],
        "socialMedia": {
            "linkedin": "",
            "twitter": "",
            "researchGate": ""
        }
    },
    { 
        "id": 7,
        "name": "Anurag Mukherjee",
        "email": "anurag902009@gmail.com",
        "image": "https://beta.computersciencemancoll.in/admin/fimages/1589545645-1587303975-fac7.jpg",
        "featured": false,
        "isTeaching": true,
        "department": "Computer Science",
        "position": "Guest Lecturer",
        "publications": 0,
        "courses": 1,
        "books": [],
        "talks": ["Intro to Cybersecurity"],
        "experiences": ["6 months in academia"],
        "areasOfInterest": ["Cybersecurity", "Cryptography"],
        "socialMedia": {
            "linkedin": "",
            "twitter": "",
            "researchGate": ""
        }
    },
    { 
        "id": 8,
        "name": "Prasun Pal",
        "email": "prasunpal3394@gmail.com",
        "image": "https://beta.computersciencemancoll.in/admin/fimages/1589545742-1587304060-fac8.jpg",
        "featured": false,
        "isTeaching": true,
        "department": "Computer Science",
        "position": "Guest Lecturer",
        "publications": 0,
        "courses": 1,
        "books": [],
        "talks": ["Basics of Networking"],
        "experiences": ["6 months in academia"],
        "areasOfInterest": ["Networking", "Computer Architecture"],
        "socialMedia": {
            "linkedin": "",
            "twitter": "",
            "researchGate": ""
        }
    },
    {
        id: 9,
        name: 'Bapi Mondal',
        email: 'bapi.m@example.com',
        image: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1741016611~exp=1741020211~hmac=0077e334fa3d55a25de05d0e897c39e794840c6707c8849a530831e89b3136cc&w=740',
        featured: false,
        isTeaching: false,
        department: 'Administration',
        position: 'Administrative Assistant',
        publications: 0,
        courses: 0,
        books: [],
        talks: [],
        experiences: ['5 years in university administration'],
        areasOfInterest: ['Office Management', 'Student Affairs'],
        socialMedia: {
            linkedin: null,
            twitter: null,
            researchGate: null
        }
    }
];

// Function to create faculty card
function createFacultyCard(faculty) {
    return `
        <div class="faculty-card magicpattern">
            <div class="faculty-card-header">
                <div class="star-icon ${faculty.featured ? 'active' : ''}" onclick="toggleFeatured(${faculty.id})">
                    <i class="fas fa-star"></i>
                </div>
                <img src="${faculty.image}" alt="${faculty.name}" class="faculty-image">
                <h3 class="faculty-name">${faculty.name}</h3>
                <p class="faculty-position">${faculty.position}</p>
            </div>
            <div class="faculty-card-body">
                <p class="faculty-email">${faculty.email}</p>
                <div class="card-actions">
                    <button class="action-button contact" onclick="contactFaculty('${faculty.email}')">Contact</button>
                    <button class="action-button view" onclick="viewFacultyDetails(${faculty.id})">View</button>
                </div>
            </div>
        </div>
    `;
}

// Function to toggle featured status
function toggleFeatured(id) {
    const faculty = facultyMembers.find(f => f.id === id);
    if (faculty) {
        faculty.featured = !faculty.featured;
        filterFaculty(currentFilter);
    }
}

// Function to filter faculty members
function filterFaculty(filter) {
    const grid = document.getElementById('facultyGrid');
    grid.innerHTML = ''; // Clear current content

    const filteredMembers = filter === 'teaching' 
        ? facultyMembers.filter(member => member.isTeaching)
        : facultyMembers.filter(member => !member.isTeaching);

    filteredMembers.forEach(member => {
        grid.insertAdjacentHTML('beforeend', createFacultyCard(member));
    });
}

// Function to contact faculty
function contactFaculty(email) {
    window.location.href = `mailto:${email}`;
}

// Function to view faculty details
function viewFacultyDetails(id) {
    const faculty = facultyMembers.find(f => f.id === id);
    if (faculty) {
        const modal = document.getElementById('facultyModal');
        const detailsContainer = document.getElementById('facultyDetails');
        
        detailsContainer.innerHTML = `
            <div class="faculty-details">
                <div class="faculty-header">
                    <img src="${faculty.image}" alt="${faculty.name}">
                    <div class="faculty-info">
                        <h2>${faculty.name}</h2>
                        <p>${faculty.position}</p>
                        <p>${faculty.department}</p>
                    </div>
                    <div class="social-media-links">
                        ${faculty.socialMedia.linkedin ? `<a href="${faculty.socialMedia.linkedin}" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a>` : ''}
                        ${faculty.socialMedia.twitter ? `<a href="${faculty.socialMedia.twitter}" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>` : ''}
                        ${faculty.socialMedia.researchGate ? `<a href="${faculty.socialMedia.researchGate}" target="_blank" rel="noopener noreferrer"><i class="fab fa-researchgate"></i></a>` : ''}
                    </div>
                </div>
                <div class="faculty-stats">
                    <div class="stat-card">
                        <h3>${faculty.publications}</h3>
                        <p>Publications</p>
                    </div>
                    <div class="stat-card">
                        <h3>${faculty.courses}</h3>
                        <p>Courses Taught</p>
                    </div>
                </div>
                ${faculty.books.length > 0 ? `
                    <div class="faculty-section">
                        <h3>Books Written</h3>
                        <ul>
                            ${faculty.books.map(book => `<li>${book}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                ${faculty.talks.length > 0 ? `
                    <div class="faculty-section">
                        <h3>Talks Given</h3>
                        <ul>
                            ${faculty.talks.map(talk => `<li>${talk}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                <div class="faculty-section">
                    <h3>Experiences</h3>
                    <ul>
                        ${faculty.experiences.map(exp => `<li>${exp}</li>`).join('')}
                    </ul>
                </div>
                <div class="faculty-section">
                    <h3>Areas of Interest</h3>
                    <ul>
                        ${faculty.areasOfInterest.map(area => `<li>${area}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        modal.style.display = 'block';
    }
}

// Close modal when clicking on the close button or outside the modal
window.onclick = function(event) {
    const modal = document.getElementById('facultyModal');
    if (event.target == modal || event.target.className == 'close') {
        modal.style.display = 'none';
    }
}

let currentFilter = 'teaching';

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Initial load with teaching faculty
    filterFaculty('teaching');

    // Add click handlers for filter buttons
    const buttons = document.querySelectorAll('.button-group .button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button state
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter faculty
            currentFilter = button.dataset.filter;
            filterFaculty(currentFilter);
        });
    });
});

