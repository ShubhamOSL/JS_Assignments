document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("resume-form");
    const generateButton = document.getElementById("generate-resume");
    const saveButton = document.getElementById("save-resume");
    const loadButton = document.getElementById("load-resume");
    const resumeOutput = document.getElementById("resume-output");

    // Counter for education and work experience entries
    let educationEntryCount = 1;
    let experienceEntryCount = 1;

    generateButton.addEventListener("click", generateResume);
    saveButton.addEventListener("click", saveResume);
    loadButton.addEventListener("click", loadResume);

    // Add Education and Work Experience entries
    const addEducationButton = document.getElementById("add-education");
    const addExperienceButton = document.getElementById("add-experience");

    addEducationButton.addEventListener("click", addEducationEntry);
    addExperienceButton.addEventListener("click", addExperienceEntry);

    function addEducationEntry() {
        const educationEntries = document.getElementById("education-entries");
        const educationEntry = document.createElement("div");
        educationEntry.classList.add("education-entry");
        educationEntry.innerHTML = `
            <h3>Education Entry ${++educationEntryCount}</h3>
            <input type="text" class="degree" placeholder="Degree" required>
            <input type="text" class="university" placeholder="University" required>
            <input type="text" class="graduation-year" placeholder="Graduation Year" required>
            <button type="button" class="delete-education">Delete</button>
        `;
        educationEntries.appendChild(educationEntry);

        // Add delete event listener to the new entry
        const deleteEducationButton = educationEntry.querySelector(".delete-education");
        deleteEducationButton.addEventListener("click", () => deleteEducationEntry(educationEntry));
    }

    function addExperienceEntry() {
        const experienceEntries = document.getElementById("experience-entries");
        const experienceEntry = document.createElement("div");
        experienceEntry.classList.add("experience-entry");
        experienceEntry.innerHTML = `
            <h3>Work Experience Entry ${++experienceEntryCount}</h3>
            <input type="text" class="position" placeholder="Position" required>
            <input type="text" class="company" placeholder="Company Name" required>
            <input type="text" class="duration" placeholder="Duration" required>
            <button type="button" class="delete-experience">Delete</button>
        `;
        experienceEntries.appendChild(experienceEntry);

        // Add delete event listener to the new entry
        const deleteExperienceButton = experienceEntry.querySelector(".delete-experience");
        deleteExperienceButton.addEventListener("click", () => deleteExperienceEntry(experienceEntry));
    }

    function deleteEducationEntry(entry) {
        const educationEntries = document.getElementById("education-entries");
        // Ensure there is at least one education entry
        if (educationEntryCount === 1) {
            alert("At least one education entry must be present.");
            return;
        }
        educationEntries.removeChild(entry);
        educationEntryCount--;
    }

    function deleteExperienceEntry(entry) {
        const experienceEntries = document.getElementById("experience-entries");
        // Ensure there is at least one work experience entry
        if (experienceEntryCount === 1) {
            alert("At least one work experience entry must be present.");
            return;
        }
        experienceEntries.removeChild(entry);
        experienceEntryCount--;
    }

    function generateResume() {
        // Retrieve user input
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;
        const programmingLanguages = document.getElementById("programming-languages").value.split(',').map(lang => lang.trim());
        const tools = document.getElementById("tools").value.split(',').map(tool => tool.trim());

        // Validate input
        if (!name || !email || !phone || !address || !programmingLanguages || !tools) {
            alert("Please fill in all required fields.");
            return;
        }

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Validate phone number format (only digits, spaces, or dashes allowed)
        const phonePattern = /^[0-9\s\-]+$/;
        if (!phonePattern.test(phone)) {
            alert("Please enter a valid phone number.");
            return;
        }

        // Get education entries
        const educationEntries = document.querySelectorAll(".education-entry");
        const educationData = [];
        educationEntries.forEach((entry, index) => {
            const degree = entry.querySelector(".degree").value;
            const university = entry.querySelector(".university").value;
            const graduationYear = entry.querySelector(".graduation-year").value;

            // Check for required fields
            if (!degree || !university || !graduationYear) {
                alert("Please fill in all fields for Education Entry " + (index + 1));
                return;
            }

            // Validate graduation year as a number within the range 2000-2023
            if (isNaN(graduationYear) || graduationYear < 2000 || graduationYear > 2023) {
                alert("Please enter a valid Graduation Year (2000-2023) for Education Entry " + (index + 1));
                return;
            }

            educationData.push({ degree, university, graduationYear, index });
        });

        // Get work experience entries
        const experienceEntries = document.querySelectorAll(".experience-entry");
        const experienceData = [];
        experienceEntries.forEach((entry, index) => {
            const position = entry.querySelector(".position").value;
            const company = entry.querySelector(".company").value;
            const duration = entry.querySelector(".duration").value;

            // Check for required fields
            if (!position || !company || !duration) {
                alert("Please fill in all fields for Work Experience Entry " + (index + 1));
                return;
            }

            // Validate duration as a number
            if (isNaN(duration)) {
                alert("Please enter a valid Duration (number of years) for Work Experience Entry " + (index + 1));
                return;
            }

            experienceData.push({ position, company, duration, index });
        });

        // Create a unique ID for this resume
        const resumeId = generateUniqueId();

        // Create the formatted resume
        const formattedResume = `
            <h1>${name}</h1>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            <p>Address: ${address}</p>
            
            <h2>Educational Background</h2>
            ${educationData.map((edu) => `
                <h3>Education Entry ${edu.index + 1}</h3>
                <p><strong>Degree:</strong> ${edu.degree}</p>
                <p><strong>University:</strong> ${edu.university}</p>
                <p><strong>Graduation Year:</strong> ${edu.graduationYear}</p>
            `).join('')}
            
            <h2>Work Experience</h2>
            ${experienceData.map((exp) => `
                <h3>Work Experience Entry ${exp.index + 1}</h3>
                <p><strong>Position:</strong> ${exp.position}</p>
                <p><strong>Company:</strong> ${exp.company}</p>
                <p><strong>Duration:</strong> ${exp.duration} years</p>
            `).join('')}
            
            <h2>Skills</h2>
            <h3>Programming Languages</h3>
            <p>${programmingLanguages}</p>
            <h3>Tools</h3>
            <p>${tools}</p>
        `;

        // Display the resume
        resumeOutput.innerHTML = formattedResume;

        const resumeData = {
            id: resumeId,
            name,
            email,
            phone,
            address,
            programmingLanguages,
            tools,
            educationData,
            experienceData
        };

        // Load existing resume data from local storage
        const savedResumeData = JSON.parse(localStorage.getItem("allResumes")) || {};

        // Add the new resume data to the existing data
        savedResumeData[resumeId] = resumeData;

        // Store the updated resume data back in local storage
        localStorage.setItem("allResumes", JSON.stringify(savedResumeData));

        // Redirect to the resume.html page with the unique ID
        window.location.href = `resume.html?id=${resumeId}`;
    }

    function saveResume() {
        const resumeData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
            programmingLanguages: document.getElementById("programming-languages").value.split(',').map(lang => lang.trim()),
            tools: document.getElementById("tools").value.split(',').map(tool => tool.trim()),
            educationEntries: [],
            experienceEntries: []
        };

        // Save education entries
        const educationEntries = document.querySelectorAll(".education-entry");
        educationEntries.forEach((entry) => {
            const degree = entry.querySelector(".degree").value;
            const university = entry.querySelector(".university").value;
            const graduationYear = entry.querySelector(".graduation-year").value;
            resumeData.educationEntries.push({ degree, university, graduationYear });
        });

        // Save work experience entries
        const experienceEntries = document.querySelectorAll(".experience-entry");
        experienceEntries.forEach((entry) => {
            const position = entry.querySelector(".position").value;
            const company = entry.querySelector(".company").value;
            const duration = entry.querySelector(".duration").value;
            resumeData.experienceEntries.push({ position, company, duration });
        });

        // Store the resume data in local storage
        localStorage.setItem("resumeData", JSON.stringify(resumeData));
        alert("Resume saved to local storage.");
    }

    function loadResume() {
        const savedResumeData = JSON.parse(localStorage.getItem("allResumes"));

        if (savedResumeData) {
            const resumeId = window.location.search.substring(4); // Get the resume ID from the URL

            if (resumeId && resumeId in savedResumeData) {
                const resumeData = savedResumeData[resumeId];

                // Populate form fields
                document.getElementById("name").value = resumeData.name;
                document.getElementById("email").value = resumeData.email;
                document.getElementById("phone").value = resumeData.phone;
                document.getElementById("address").value = resumeData.address;
                document.getElementById("programming-languages").value = resumeData.programmingLanguages.join(', ');
                document.getElementById("tools").value = resumeData.tools.join(', ');

                // Remove existing education and experience entries
                const educationEntries = document.getElementById("education-entries");
                educationEntries.innerHTML = "";
                const experienceEntries = document.getElementById("experience-entries");
                experienceEntries.innerHTML = "";

                // Populate education entries
                resumeData.educationData.forEach((entryData) => {
                    addEducationEntry();
                    const educationEntry = educationEntries.lastChild;
                    educationEntry.querySelector(".degree").value = entryData.degree;
                    educationEntry.querySelector(".university").value = entryData.university;
                    educationEntry.querySelector(".graduation-year").value = entryData.graduationYear;
                });

                // Populate experience entries
                resumeData.experienceData.forEach((entryData) => {
                    addExperienceEntry();
                    const experienceEntry = experienceEntries.lastChild;
                    experienceEntry.querySelector(".position").value = entryData.position;
                    experienceEntry.querySelector(".company").value = entryData.company;
                    experienceEntry.querySelector(".duration").value = entryData.duration;
                });

                alert("Resume loaded from local storage.");
            } else {
                alert("Resume not found in local storage.");
            }
        } else {
            alert("No saved resumes found in local storage.");
        }
    }

    function generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
});
