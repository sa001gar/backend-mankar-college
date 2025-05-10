document.addEventListener('DOMContentLoaded', function() {
    // Sample data structure
    const courseData = {
        sem1: {
            name: "Semester 1",
            subjects: {
                "programming-basics": {
                    name: "Programming Basics",
                    description: "Introduction to programming concepts and problem-solving techniques.",
                    type: "Core Course"
                },
                "digital-logic": {
                    name: "Digital Logic",
                    description: "Basic concepts of digital systems, Boolean algebra, and logic circuits.",
                    type: "Core Course"
                },
                "mathematics-1": {
                    name: "Mathematics I",
                    description: "Discrete mathematics, calculus, and linear algebra for computer science.",
                    type: "Core Course"
                }
            }
        },
        sem2: {
            name: "Semester 2",
            subjects: {
                "oop": {
                    name: "Object Oriented Programming",
                    description: "Learn OOP concepts including classes, inheritance, polymorphism, and encapsulation.",
                    type: "Core Course"
                },
                "data-communication": {
                    name: "Data Communication",
                    description: "Fundamentals of data communication, transmission media, and signal processing.",
                    type: "Core Course"
                },
                "mathematics-2": {
                    name: "Mathematics II",
                    description: "Probability, statistics, and numerical methods for computer science.",
                    type: "Core Course"
                }
            }
        },
        sem3: {
            name: "Semester 3",
            subjects: {
                "data-structures": {
                    name: "Data Structures",
                    description: "Comprehensive study of data structures including arrays, linked lists, trees, and graphs.",
                    type: "Core Course"
                },
                "computer-architecture": {
                    name: "Computer Architecture",
                    description: "Study of computer organization, CPU design, memory systems, and I/O interfaces.",
                    type: "Core Course"
                },
                "discrete-structures": {
                    name: "Discrete Structures",
                    description: "Mathematical structures for computer science including sets, relations, and graph theory.",
                    type: "Core Course"
                }
            }
        },
        sem4: {
            name: "Semester 4",
            subjects: {
                "dbms": {
                    name: "Database Management Systems",
                    description: "Complete materials for DBMS including SQL, normalization, and database design principles.",
                    type: "Core Course"
                },
                "operating-systems": {
                    name: "Operating Systems",
                    description: "Complete materials on OS concepts, process management, memory management, and file systems.",
                    type: "Core Course"
                },
                "algorithms": {
                    name: "Design and Analysis of Algorithms",
                    description: "Study of algorithm design techniques, complexity analysis, and optimization methods.",
                    type: "Core Course"
                }
            }
        },
        sem5: {
            name: "Semester 5",
            subjects: {
                "computer-networks": {
                    name: "Computer Networks",
                    description: "Study materials covering network protocols, OSI model, TCP/IP, and network security.",
                    type: "Core Course"
                },
                "web-technologies": {
                    name: "Web Technologies",
                    description: "Learn HTML, CSS, JavaScript, and modern web frameworks for building responsive websites.",
                    type: "Elective"
                },
                "software-engineering": {
                    name: "Software Engineering",
                    description: "Software development lifecycle, methodologies, testing, and project management.",
                    type: "Core Course"
                }
            }
        },
        sem6: {
            name: "Semester 6",
            subjects: {
                "compiler-design": {
                    name: "Compiler Design",
                    description: "Study of lexical analysis, parsing, semantic analysis, and code generation techniques.",
                    type: "Core Course"
                },
                "ai": {
                    name: "Artificial Intelligence",
                    description: "Introduction to AI concepts, search algorithms, knowledge representation, and machine learning.",
                    type: "Elective"
                },
                "information-security": {
                    name: "Information Security",
                    description: "Cybersecurity principles, cryptography, network security, and security management.",
                    type: "Core Course"
                }
            }
        }
    };

    const semesterSelect = document.getElementById('semester');
    const subjectSelect = document.getElementById('subject');
    const materialsContainer = document.getElementById('materials-container');

    // Function to populate subject dropdown based on selected semester
    function populateSubjects(selectedSemester) {
        subjectSelect.innerHTML = '<option value="">-- Select Subject --</option>';
        
        if (selectedSemester && courseData[selectedSemester]) {
            const subjects = courseData[selectedSemester].subjects;
            
            for (const subjectId in subjects) {
                const option = document.createElement('option');
                option.value = subjectId;
                option.textContent = subjects[subjectId].name;
                subjectSelect.appendChild(option);
            }
        }
    }

    // Function to display material cards based on filters
    function displayMaterials(semesterId, subjectId) {
        materialsContainer.innerHTML = '';
        
        if (!semesterId) {
            // Display a selection of materials from all semesters
            Object.keys(courseData).forEach(sem => {
                const randomSubject = Object.keys(courseData[sem].subjects)[0];
                createMaterialCard(sem, randomSubject);
            });
            return;
        }
        
        const semester = courseData[semesterId];
        if (!semester) return;
        
        if (subjectId && semester.subjects[subjectId]) {
            // Display selected subject
            createMaterialCard(semesterId, subjectId);
        } else {
            // Display all subjects for selected semester
            for (const subId in semester.subjects) {
                createMaterialCard(semesterId, subId);
            }
        }
    }

    // Function to create material card
    function createMaterialCard(semesterId, subjectId) {
        const semester = courseData[semesterId];
        const subject = semester.subjects[subjectId];
        
        const card = document.createElement('div');
        card.className = 'material-card';
        
        card.innerHTML = `
            <div class="card-header">
                <h3>${subject.name}</h3>
                <p>${semester.name} • ${subject.type}</p>
            </div>
            <div class="card-content">
                <p>${subject.description}</p>
                <div class="card-actions">
                    <a href="#" class="card-action-link">
                        <i class="fas fa-book"></i> Lecture Notes
                    </a>
                    <a href="#" class="card-action-link">
                        <i class="fas fa-tasks"></i> Assignments
                    </a>
                </div>
            </div>
        `;
        
        materialsContainer.appendChild(card);
    }

    // Event listeners for the select elements
    semesterSelect.addEventListener('change', function() {
        const selectedSemester = this.value;
        populateSubjects(selectedSemester);
        displayMaterials(selectedSemester, '');
    });
    
    subjectSelect.addEventListener('change', function() {
        const selectedSemester = semesterSelect.value;
        const selectedSubject = this.value;
        displayMaterials(selectedSemester, selectedSubject);
    });

    // Initial display
    displayMaterials('', '');
});