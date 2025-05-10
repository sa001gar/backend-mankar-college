const questionPapersData = {
    "2023": [
        {
            "subject": "Introduction to Programming",
            "code": "CS101",
            "semester": "1",
            "date": "May 10, 2023",
            "examType": "Midterm",
            "duration": "1.5 hours",
            "maxMarks": 50
        },
        {
            "subject": "Data Structures and Algorithms",
            "code": "CS201",
            "semester": "2",
            "date": "June 15, 2023",
            "examType": "Final",
            "duration": "3 hours",
            "maxMarks": 100
        }
    ],
    "2024": [
        {
            "subject": "Introduction to Programming",
            "code": "CS101",
            "semester": "1",
            "date": "May 10, 2024",
            "examType": "Midterm",
            "duration": "1.5 hours",
            "maxMarks": 50
        }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    const yearFilter = document.getElementById('yearFilter');
    const semesterFilter = document.getElementById('semesterFilter');
    const subjectFilter = document.getElementById('subjectFilter');
    const paperSearch = document.getElementById('paperSearch');
    const resetFilters = document.getElementById('resetFilters');
    const questionPapersContent = document.getElementById('questionPapersContent');

    function renderPapers(papers) {
        let html = '<div class="papers-grid">';
        papers.forEach(paper => {
            html += `
                <div class="paper-card" data-year="${paper.date.split(', ')[1]}" data-semester="${paper.semester}" data-subject="${paper.code}">
                    <div class="paper-header">
                        <h3 class="paper-title">${paper.subject}</h3>
                        <p class="paper-code">${paper.code}</p>
                    </div>
                    <div class="paper-details">
                        <div class="detail-item">
                            <span class="detail-label">Year</span>
                            <span class="detail-value">${paper.date.split(', ')[1]}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Semester</span>
                            <span class="detail-value">${paper.semester}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Exam Type</span>
                            <span class="detail-value">${paper.examType}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Duration</span>
                            <span class="detail-value">${paper.duration}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Max Marks</span>
                            <span class="detail-value">${paper.maxMarks}</span>
                        </div>
                    </div>
                    <div class="paper-actions">
                        <button class="paper-btn download-paper-btn">
                            <i class="fas fa-download"></i> Download
                        </button>
                        <button class="paper-btn view-paper-btn">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        questionPapersContent.innerHTML = html;
    }

    function filterPapers() {
        const year = yearFilter.value;
        const semester = semesterFilter.value;
        const subject = subjectFilter.value;
        const searchTerm = paperSearch.value.toLowerCase();

        let filteredPapers = [];
        
        for (const [paperYear, papers] of Object.entries(questionPapersData)) {
            if (year === 'all' || year === paperYear) {
                filteredPapers = filteredPapers.concat(papers);
            }
        }

        filteredPapers = filteredPapers.filter(paper => {
            const yearMatch = year === 'all' || paper.date.includes(year);
            const semesterMatch = semester === 'all' || paper.semester.toString() === semester;
            const subjectMatch = subject === 'all' || paper.code === subject;
            const searchMatch = paper.subject.toLowerCase().includes(searchTerm) || 
                                paper.code.toLowerCase().includes(searchTerm);

            return yearMatch && semesterMatch && subjectMatch && searchMatch;
        });

        renderPapers(filteredPapers);
    }

    function populateSubjectFilter() {
        const subjects = new Set();
        Object.values(questionPapersData).forEach(yearPapers => {
            yearPapers.forEach(paper => {
                subjects.add(`<option value="${paper.code}">${paper.subject} (${paper.code})</option>`);
            });
        });
        subjectFilter.innerHTML = '<option value="all">All Subjects</option>' + Array.from(subjects).join('');
    }

    yearFilter.addEventListener('change', filterPapers);
    semesterFilter.addEventListener('change', filterPapers);
    subjectFilter.addEventListener('change', filterPapers);
    paperSearch.addEventListener('input', filterPapers);

    resetFilters.addEventListener('click', function() {
        yearFilter.value = 'all';
        semesterFilter.value = 'all';
        subjectFilter.value = 'all';
        paperSearch.value = '';
        filterPapers();
    });

    populateSubjectFilter();
    filterPapers();

    // Handle download and view button clicks
    questionPapersContent.addEventListener('click', function(e) {
        if (e.target.classList.contains('download-paper-btn')) {
            e.preventDefault();
            alert('Download functionality to be implemented');
        } else if (e.target.classList.contains('view-paper-btn')) {
            e.preventDefault();
            alert('View functionality to be implemented');
        }
    });
});