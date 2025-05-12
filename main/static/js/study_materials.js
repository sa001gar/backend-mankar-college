document.addEventListener('DOMContentLoaded', () => {
            const semesterFilter = document.getElementById('lp-semester-filter');
            const subjectFilter = document.getElementById('lp-subject-filter');
            const courseCards = document.querySelectorAll('.lp-learning-course-card');

            function filterCourses() {
                const selectedSemester = semesterFilter.value;
                const selectedSubject = subjectFilter.value;

                courseCards.forEach(card => {
                    const semesterMatch = !selectedSemester || card.dataset.semester === selectedSemester;
                    const subjectMatch = !selectedSubject || card.dataset.subject === selectedSubject;

                    if (semesterMatch && subjectMatch) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            }

            semesterFilter.addEventListener('change', filterCourses);
            subjectFilter.addEventListener('change', filterCourses);
        });