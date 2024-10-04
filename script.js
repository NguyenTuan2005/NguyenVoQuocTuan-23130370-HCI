document.addEventListener('DOMContentLoaded', function () {
    // Function to show Home page
    window.showHome = function () {
        hideAllContents();
        document.getElementById('home-content').style.display = 'block';
        document.getElementById('lab-menu').style.display = 'none'; // Hide mini menu
    };

    // Function to show About page
    window.showAbout = function () {
        hideAllContents();
        document.getElementById('about-content').style.display = 'block';
        document.getElementById('lab-menu').style.display = 'none'; // Hide mini menu
    };

    // Function to show Lab 1 content
    window.showLab1 = function () {
        hideLabContents();
        document.getElementById('lab1-content').style.display = 'block';
    };

    // Function to show Lab 2 content
    window.showLab2 = function () {
        hideLabContents();
        document.getElementById('lab2-content').style.display = 'block';
    };

    // Hide all main contents
    function hideAllContents() {
        document.getElementById('home-content').style.display = 'none';
        document.getElementById('about-content').style.display = 'none';
        document.getElementById('labs-content').style.display = 'none';
        hideLabContents();
    }

    // Hide all lab-specific content
    function hideLabContents() {
        document.getElementById('lab1-content').style.display = 'none';
        document.getElementById('lab2-content').style.display = 'none';
    }
    /* -------------------------lab1_group2---------------- */
    const courseForm = document.getElementById('courseForm');
    const courseId = document.getElementById('courseId');
    const createdAt = document.getElementById('createdAt');
    const updatedAt = document.getElementById('updatedAt');
    // Simulating dynamic ID and timestamp generation for demonstration
    function generateCourseId() {
        return 'COURSE-' + Math.floor(Math.random() * 10000);
    }

    function getCurrentTimestamp() {
        const now = new Date();
        return now.toISOString().slice(0, 19).replace('T', ' ');
    }

    // Populate auto-generated fields when the form is loaded
    function populateAutoGeneratedFields() {
        if (!courseId.value) {
            courseId.value = generateCourseId();  // Generate and display course ID
        }
        if (!createdAt.value) {
            createdAt.value = getCurrentTimestamp();  // Set creation timestamp
        }
        updatedAt.value = getCurrentTimestamp();  // Set the last updated timestamp
    }

    // Form submission handler
    courseForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Basic validation (course name required)
        const courseName = document.getElementById('courseName').value;
        if (!courseName) {
            alert('Course name is required');
            return;
        }

        // Update the "Last Updated" timestamp
        updatedAt.value = getCurrentTimestamp();

        alert('Course Created/Updated Successfully!');
    });

    // Pre-populate the form with auto-generated fields on load
    populateAutoGeneratedFields();
    /* -------------------------lab1_group2---------------- */
});
/* -------------------------lab1_group1---------------- */
const form = document.getElementById('accountForm');
const submitButton = document.getElementById('submitButton');
const createdAt = document.getElementById('createdAt');
const lastUpdatedAt = document.getElementById('lastUpdatedAt');
const profilePictureInput = document.getElementById('profilePictureInput');
const profilePreview = document.getElementById('profilePreview');
const cancelButton = document.getElementById('cancelButton');

function togglePassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

// Profile picture preview
profilePictureInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            profilePreview.src = event.target.result;
            profilePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        profilePreview.style.display = 'none';
    }
});

// Set initial timestamps
const now = new Date().toLocaleString();
createdAt.value = now;
lastUpdatedAt.value = now;

// Function to check if all required fields are valid
function checkFormValidity() {
    const isValid = form.checkValidity();
    submitButton.disabled = !isValid;
}

// Inline error validation messages
form.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', function () {
        const errorMessage = input.nextElementSibling;
        if (!input.checkValidity()) {
            errorMessage.textContent = input.validationMessage;
        } else {
            errorMessage.textContent = '';
        }
    });
});

// Cancel button to go back to the previous page
cancelButton.addEventListener('click', function () {
    window.history.back();  // Navigate back to the previous page
});

// Form submission handler
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.checkValidity()) {
        lastUpdatedAt.value = new Date().toLocaleString();
        console.log('Form submitted successfully');
    }
});

// Initial check (in case some fields are pre-filled)
checkFormValidity();
/* -------------------------lab1_group1---------------- */

// Toggling Group Content
function toggleGroup(groupId) {
    var group = document.getElementById(groupId);
    if (group.style.display === "none" || group.style.display === "") {
        group.style.display = "block";
    } else {
        group.style.display = "none";
    }
}