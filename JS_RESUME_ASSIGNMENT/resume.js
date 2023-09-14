document.addEventListener("DOMContentLoaded", function () {
    const resumeOutput = document.getElementById("resume-output");
    const editButton = document.getElementById("edit-resume");
    const backToIndexButton = document.getElementById("back-to-index");

    // Get the resume ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const resumeId = urlParams.get("id");

    // Load resume data from local storage
    const savedResumeData = JSON.parse(localStorage.getItem("allResumes"));

    if (savedResumeData && resumeId && resumeId in savedResumeData) {
        const resumeData = savedResumeData[resumeId];

        // Create the formatted resume
        const formattedResume = `
    <div class="resume-container">
        <div class="resume-header">
            <h1>${resumeData.name}</h1>
            <p>Email: ${resumeData.email}</p>
            <p>Phone: ${resumeData.phone}</p>
            <p>Address: ${resumeData.address}</p>
        </div>
        
        <div class="resume-body">
            ${resumeData.educationData.length > 0 ? `
            <div class="resume-section">
                <h2>Educational Background</h2>
                ${resumeData.educationData.map((edu) => `
                    <div class="education-entry">
                        <h3>Education Entry</h3>
                        <p><strong>Degree:</strong> ${edu.degree}</p>
                        <p><strong>University:</strong> ${edu.university}</p>
                        <p><strong>Graduation Year:</strong> ${edu.graduationYear}</p>
                    </div>
                `).join('')}
            </div>` : ''}
            
            ${resumeData.experienceData.length > 0 ? `
            <div class="resume-section">
                <h2>Work Experience</h2>
                ${resumeData.experienceData.map((exp) => `
                    <div class="experience-entry">
                        <h3>Work Experience Entry</h3>
                        <p><strong>Position:</strong> ${exp.position}</p>
                        <p><strong>Company:</strong> ${exp.company}</p>
                        <p><strong>Duration:</strong> ${exp.duration} years</p>
                    </div>
                `).join('')}
            </div>` : ''}
        </div>
        
        <div class="resume-footer">
            <h2>Skills</h2>
            ${resumeData.programmingLanguages.length > 0 ? `
            <div class="skills-section">
                <h3>Programming Languages</h3>
                <p>${resumeData.programmingLanguages.join(', ')}</p>
            </div>` : ''}
            
            ${resumeData.tools.length > 0 ? `
            <div class="skills-section">
                <h3>Tools</h3>
                <p>${resumeData.tools.join(', ')}</p>
            </div>` : ''}
        </div>
    </div>
`;


        // Display the resume
        resumeOutput.innerHTML = formattedResume;

        // Add event listeners to buttons
        editButton.addEventListener("click", function () {
            // Redirect to the resume builder page with the resume ID
            window.location.href = `index.html?id=${resumeId}`;
        });

        backToIndexButton.addEventListener("click", function () {
            // Redirect to the resume builder page
            window.location.href = "index.html";
        });
    } else {
        // If the resume ID is not found or there is no data, display an error message
        resumeOutput.innerHTML = "<p>Resume not found.</p>";
    }
});
