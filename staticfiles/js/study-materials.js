document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab")
    renderYearContent(1)
  
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"))
        tab.classList.add("active")
        const yearNumber = tab.getAttribute("data-year")
        renderYearContent(yearNumber)
      })
    })
  })
  
  function renderYearContent(year) {
    fetch(`/api/study-materials/${year}/`)
      .then((response) => response.json())
      .then((data) => {
        let html = ""
        data.forEach((semester) => {
          html += `
                      <div class="semester-header" onclick="toggleMaterials(${year}, ${semester.semester})">
                          <h2>Semester ${semester.semester}</h2>
                          <p>Computer Science & Engineering</p>
                      </div>
                      <div class="materials-grid" id="materials-${year}-${semester.semester}">
                          ${renderSubjects(semester.subject)}
                      </div>
                  `
        })
  
        html += renderQuestionPapers(year)
        document.getElementById("content").innerHTML = html
      })
  }
  
  function renderSubjects(subject) {
    return `
          <div class="subject-card">
              <div class="subject-header">
                  <h3>${subject.name}</h3>
                  <p>${subject.code} • Core Subject</p>
              </div>
              <div class="material-list">
                  ${renderMaterials(subject.materials)}
              </div>
          </div>
      `
  }
  
  function renderMaterials(materials) {
    return materials
      .map(
        (material) => `
          <div class="material-item">
              <div class="material-icon">
                  <i class="${material.icon}"></i>
              </div>
              <div class="material-info">
                  <h4>${material.title}</h4>
                  <p>${material.description}</p>
              </div>
              <a href="${material.file_url}" class="download-link">
                  <i class="fas fa-download"></i>
                  Download
              </a>
          </div>
      `,
      )
      .join("")
  }
  
  function renderQuestionPapers(year) {
    return `
          <div class="question-papers">
              <h3>Question Papers</h3>
              <select class="year-select" onchange="updateQuestionPapers(this.value)">
                  <option value="${year}">${year}</option>
              </select>
              <div class="papers-grid" id="papers-grid">
                  <!-- Question papers will be loaded here -->
              </div>
          </div>
      `
  }
  
  function updateQuestionPapers(year) {
    fetch(`/api/question-papers/${year}/`)
      .then((response) => response.json())
      .then((data) => {
        const papersGrid = document.getElementById("papers-grid")
        papersGrid.innerHTML = renderPapers(data)
      })
  }
  
  function renderPapers(papers) {
    return papers
      .map(
        (paper) => `
          <div class="paper-card">
              <div class="paper-header">
                  <div class="paper-icon">
                      <i class="fas fa-file-alt"></i>
                  </div>
                  <div class="paper-info">
                      <h4>${paper.subject}</h4>
                      <p>${paper.code}</p>
                  </div>
              </div>
              <div class="paper-details">
                  <div class="detail-item">
                      <span>Duration</span>
                      <span>${paper.duration}</span>
                  </div>
                  <div class="detail-item">
                      <span>Max Marks</span>
                      <span>${paper.maxMarks}</span>
                  </div>
              </div>
              <a href="${paper.file_url}" class="download-link">
                  <i class="fas fa-download"></i> Download PDF
              </a>
          </div>
      `,
      )
      .join("")
  }
  
  function toggleMaterials(year, semester) {
    const materialsGrid = document.getElementById(`materials-${year}-${semester}`)
    materialsGrid.classList.toggle("active")
  }
  
  