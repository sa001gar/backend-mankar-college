document.addEventListener('DOMContentLoaded', function() {
    const yearFilter = document.getElementById('yearFilter');
    const semesterFilter = document.getElementById('semesterFilter');
    const subjectFilter = document.getElementById('subjectFilter');
    const resetFilters = document.getElementById('resetFilters');
    const paperCards = document.querySelectorAll('.paper-card');

    function filterPapers() {
        const year = yearFilter.value;
        const semester = semesterFilter.value;
        const subject = subjectFilter.value;

        paperCards.forEach(card => {
            const cardYear = card.getAttribute('data-year');
            const cardSemester = card.getAttribute('data-semester');
            const cardSubject = card.getAttribute('data-subject');

            const yearMatch = year === 'all' || cardYear === year;
            const semesterMatch = semester === 'all' || cardSemester === semester;
            const subjectMatch = subject === 'all' || cardSubject === subject;

            if (yearMatch && semesterMatch && subjectMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    yearFilter.addEventListener('change', filterPapers);
    semesterFilter.addEventListener('change', filterPapers);
    subjectFilter.addEventListener('change', filterPapers);

    resetFilters.addEventListener('click', function() {
        yearFilter.value = 'all';
        semesterFilter.value = 'all';
        subjectFilter.value = 'all';
        filterPapers();
    });

    // Handle download and view button clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('download-paper-btn') || 
            e.target.parentElement.classList.contains('download-paper-btn')) {
            e.preventDefault();
            alert('Download functionality to be implemented');
        } else if (e.target.classList.contains('view-paper-btn') || 
                  e.target.parentElement.classList.contains('view-paper-btn')) {
            e.preventDefault();
            alert('View functionality to be implemented');
        }
    });
});