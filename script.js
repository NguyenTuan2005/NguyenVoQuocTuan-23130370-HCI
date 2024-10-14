// Shared Utilities
const DateUtils = {
    getCurrentTimestamp(format = 'localeString') {
        const now = new Date();
        switch(format) {
            case 'localeString':
                return now.toLocaleString();
            case 'ISO':
                return now.toISOString().slice(0, 19).replace('T', ' ');
            default:
                return now.toLocaleString();
        }
    }
};

// Navigation Highlighting
const NavigationHandler = {
    init() {
        const currentPage = window.location.pathname.split('/').pop();
        this.highlightMainNav(currentPage);
        this.highlightLabMenu(currentPage);
    },

    highlightMainNav(currentPage) {
        if (currentPage.includes('lab')) {
            document.querySelector('.menu a[href="labs.html"]')?.classList.add('active');
        } else {
            document.querySelector(`.menu a[href="${currentPage}"]`)?.classList.add('active');
        }
    },

    highlightLabMenu(currentPage) {
        if (currentPage === 'labs.html') {
            document.querySelector('.lab-menu a[href="lab1.html"]')?.classList.add('active');
        } else if (currentPage.includes('lab')) {
            document.querySelector(`.lab-menu a[href="${currentPage}"]`)?.classList.add('active');
        }
    }
};

// Account Form Handler (Lab1 Group1)
const AccountFormHandler = {
    init() {
        this.form = document.getElementById('accountForm');
        this.submitButton = document.getElementById('submitButton');
        this.accCreatedAt = document.getElementById('accCreatedAt');
        this.lastUpdatedAt = document.getElementById('lastUpdatedAt');
        this.profilePictureInput = document.getElementById('profilePictureInput');
        this.profilePreview = document.getElementById('profilePreview');
        this.cancelButton = document.getElementById('cancelButton');

        this.initializeTimestamps();
        this.setupEventListeners();
        this.checkFormValidity();
    },

    initializeTimestamps() {
        const now = DateUtils.getCurrentTimestamp('localeString');
        if (this.accCreatedAt != null && !this.accCreatedAt.value) {
            this.accCreatedAt.value = now;
        }
        if (this.lastUpdatedAt != null && !this.lastUpdatedAt.value) {
            this.lastUpdatedAt.value = now;
        }
    },

    setupEventListeners() {
        this.profilePictureInput?.addEventListener('change', this.handleProfilePicture.bind(this));
        this.cancelButton?.addEventListener('click', () => window.history.back());
        this.form?.addEventListener('submit', this.handleSubmit.bind(this));
        this.setupInputValidation();
    },

    handleProfilePicture(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                this.profilePreview.src = event.target.result;
                this.profilePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            this.profilePreview.style.display = 'none';
        }
    },

    setupInputValidation() {
        this.form?.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', () => {
                const errorMessage = input.nextElementSibling;
                errorMessage.textContent = input.checkValidity() ? '' : input.validationMessage;
                this.checkFormValidity();
            });
        });
    },

    checkFormValidity() {
        if (this.form) {
            this.submitButton.disabled = !this.form.checkValidity();
        } else {
            console.warn('Form element not found');
            this.submitButton.disabled = true; // Disable button if form not found
        }
    },

    handleSubmit(e) {
        e.preventDefault();
        if (this.form.checkValidity()) {
            this.lastUpdatedAt.value = DateUtils.getCurrentTimestamp('localeString');
            console.log('Form submitted successfully');
        }
    }
};

// Course Form Handler (Lab1 Group2)
const CourseFormHandler = {
    init() {
        this.form = document.getElementById('courseForm');
        this.courseId = document.getElementById('courseId');
        this.createdAt = document.getElementById('createdAt');
        this.updatedAt = document.getElementById('updatedAt');

        if (this.form) {
            this.populateAutoGeneratedFields();
            this.setupEventListeners();
        }
    },

    generateCourseId() {
        return 'COURSE-' + Math.floor(Math.random() * 10000);
    },

    populateAutoGeneratedFields() {
        if (!this.courseId.value) {
            this.courseId.value = this.generateCourseId();
        }
        if (!this.createdAt.value) {
            this.createdAt.value = DateUtils.getCurrentTimestamp('ISO');
        }
        this.updatedAt.value = DateUtils.getCurrentTimestamp('ISO');
    },

    handleSubmit(event) {
        event.preventDefault();
        const courseName = document.getElementById('courseName').value;
        if (!courseName) {
            alert('Course name is required');
            return;
        }
        this.updatedAt.value = DateUtils.getCurrentTimestamp('ISO');
        alert('Course Created/Updated Successfully!');
    },

    setupEventListeners() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    },
};

// Content Toggler
const ContentToggler = {
    toggle(groupId) {
        const group = document.getElementById(groupId);
        const isShowing = group.classList.contains("show");
        
        if (isShowing) {
            this.hideGroup(group);
        } else {
            this.showGroup(group);
        }
    },

    hideGroup(group) {
        group.style.maxHeight = group.scrollHeight + "px";
        group.style.opacity = "1";

        setTimeout(() => {
            group.style.maxHeight = "0px";
            group.style.opacity = "0";
        }, 10);

        setTimeout(() => {
            group.classList.remove("show");
            group.style.display = "none";
        }, 300);
    },

    showGroup(group) {
        group.style.display = "block";
        group.style.maxHeight = "0px";
        group.style.opacity = "0";
        
        setTimeout(() => {
            group.style.maxHeight = group.scrollHeight + "px";
            group.style.opacity = "1";
        }, 10);

        setTimeout(() => {
            group.classList.add("show");
        }, 300);
    }
};

// Login Form Handler (Lab2 Group1)
const LoginFormHandler = {
    init() {
        this.setupEventListeners();
    },

    showMessage(type, text) {
        const messageDiv = document.getElementById('message');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `<i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>${text}`;
        messageDiv.style.display = 'flex';
        setTimeout(() => messageDiv.classList.add('show'), 100);
    },

    togglePassword() {
        const passwordInput = document.getElementById('password');
        const toggleIcon = document.querySelector('.password-toggle');
        
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        toggleIcon.classList.toggle('fa-eye', !isPassword);
        toggleIcon.classList.toggle('fa-eye-slash', isPassword);
    },

    setupEventListeners() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleSubmit.bind(this));
        }

        document.querySelectorAll('.social-button').forEach(button => {
            button.addEventListener('click', this.handleRippleEffect);
        });
    },

    handleSubmit(e) {
        e.preventDefault();
        const button = e.target.querySelector('.login-button');
        button.classList.add('loading');
        
        setTimeout(() => {
            button.classList.remove('loading');
            // Add actual login logic here
        }, 2000);
    },

    handleRippleEffect(e) {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        
        const ripple = document.createElement('span');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
};

const StudyMaterialApp = {
    init() {
        this.tabContainer = document.querySelector('.tab-container');
        this.modal = document.getElementById('previewModal');
        this.previewFrame = document.getElementById('previewFrame');
        this.addLectureModal = document.getElementById('add-lecture-modal');
        this.lectureTitleInput = document.getElementById('lecture-title');
        this.lectureFileInput = document.getElementById('lecture-file');
        this.subject = ''; // To track which subject is currently active

        this.addEventListeners();
    },

    addEventListeners() {
        if (this.tabContainer) {
            this.tabContainer.addEventListener('click', (event) => {
                if (event.target.classList.contains('tab-link')) {
                    this.openTab(event);
                } else if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Add Lecture') {
                    this.subject = event.target.parentElement.id;
                    this.showAddLectureModal(); // Show modal instead of prompt
                }
            });
        }

        this.modal?.querySelector('.close-button').addEventListener('click', this.closePreview.bind(this));

        document.getElementById('submit-lecture').addEventListener('click', () => this.addLecture()); // Submit button for modal
        document.querySelector('.close-button').addEventListener('click', this.closeAddLectureModal.bind(this));

        document.querySelectorAll('.material-list a').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const fileType = link.querySelector('i').className.includes('word') ? 'doc' :
                    link.querySelector('i').className.includes('pdf') ? 'pdf' : 'ppt';
                this.showPreview(fileType, link.getAttribute('href'));
            });
        });
    },

    showAddLectureModal() {
        this.lectureTitleInput.value = ''; // Reset the input field
        this.lectureFileInput.value = ''; // Reset file input
        this.addLectureModal.style.display = 'block'; // Show the modal
    },

    closeAddLectureModal() {
        this.addLectureModal.style.display = 'none'; // Hide the modal
    },

    addLecture() {
        const title = this.lectureTitleInput.value;
        const file = this.lectureFileInput.files[0];

        if (title && file) {
            const fileExtension = file.name.split('.').pop();
            let fileIcon;

            // Determine file type and assign icon
            if (fileExtension === 'pdf') {
                fileIcon = '<i class="far fa-file-pdf"></i>';
            } else if (fileExtension === 'doc' || fileExtension === 'docx') {
                fileIcon = '<i class="far fa-file-word"></i>';
            } else if (fileExtension === 'ppt' || fileExtension === 'pptx') {
                fileIcon = '<i class="far fa-file-powerpoint"></i>';
            } else {
                alert('Unsupported file type!');
                return;
            }

            // Add the lecture to the correct subject list
            const list = document.querySelector(`#${this.subject} .material-list`);
            const li = document.createElement('li');
            li.innerHTML = `
        <a href="#" onclick="StudyMaterialApp.showPreview('${fileExtension}', '#')">
            ${fileIcon} ${title}
        </a>`;
            list.appendChild(li);

            // Close the modal after submission
            this.closeAddLectureModal();
        } else {
            alert('Please provide a title and select a file.');
        }
    },

    // Existing preview and tab handling functions
    openTab(event) {
        const tabName = event.target.textContent.trim();

        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
            content.classList.remove('active');
        });

        document.querySelectorAll('.tab-link').forEach(link => {
            link.classList.remove('active');
            link.setAttribute('aria-selected', 'false');
        });

        document.getElementById(tabName).style.display = 'block';
        document.getElementById(tabName).classList.add('active');
        event.target.classList.add('active');
        event.target.setAttribute('aria-selected', 'true');
    },

    showPreview(type, url) {
        this.previewFrame.src = url;
        this.modal.style.display = 'block';
    },

    closePreview() {
        this.previewFrame.src = '';
        this.modal.style.display = 'none';
    }
};

// Initialize all handlers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    NavigationHandler.init();
    AccountFormHandler.init();
    CourseFormHandler.init();
    LoginFormHandler.init();
    StudyMaterialApp.init();
});

// Global functions needed for inline HTML onclick handlers
function toggleGroup(groupId) {
    ContentToggler.toggle(groupId);
}

function togglePassword() {
    LoginFormHandler.togglePassword();
}