// Shared Utilities
const DateUtils = {
    getCurrentTimestamp(format = 'localeString') {
        const now = new Date();
        switch (format) {
            case 'localeString':
                return now.toLocaleString();
            case 'ISO':
                return now.toISOString().slice(0, 19).replace('T', ' ');
            default:
                return now.toLocaleString();
        }
    }
};

// Account Form Handler (Lab1)
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
            console.warn('Form element is null, falling back to alternative logic.');
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

// Login Form Handler (Lab2)
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

        if (!passwordInput || !toggleIcon) {
            console.error('Password input or toggle icon not found!');
            return;
        }

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

// Dash Board Handler (Lab4)
const DashboardHandler = {
    init() {
        this.navigationTabs = document.querySelector('.navigation-tabs');
        this.continueLearningContainer = document.getElementById('continue-learning-container');
        this.recommendedCoursesContainer = document.getElementById('recommended-courses-container');
        
        this.setupNavigationTabs();
        this.setupContinueLearning();
        this.setupRecommendedCourses();
    },

    setupNavigationTabs() {
        const tabs = ['Courses', 'Learning paths', 'Certification preparation'];
        if (this.navigationTabs) {
            tabs.forEach(tab => {
                const button = document.createElement('button');
                button.textContent = tab;
                button.className = `tab-button ${tab === 'Courses' ? 'active' : ''}`;
                button.addEventListener('click', () => this.handleTabClick(button));
                this.navigationTabs.appendChild(button);
            });
        }
    },

    handleTabClick(clickedTab) {
        document.querySelectorAll('.tab-button').forEach(tab => {
            tab.classList.remove('active');
        });
        clickedTab.classList.add('active');
    },

    setupContinueLearning() {
        if (this.continueLearningContainer) {
            const currentCourses = [
                { title: "Introduction to Programming", type: "Lecture", duration: "1m", progress: 100, imageUrl: "img/Introduction-to-Programming.jpg" },
                { title: "Integration Introduction", type: "Lecture", duration: "6m left", progress: 50, imageUrl: "img/Integration-Introduction.jpg" },
                { title: "Quiz and Questions", type: "Quiz", duration: "9 questions", progress: 0, imageUrl: "img/Quiz-and-Questions.jpg" }
            ];

            currentCourses.forEach(course => {
                const courseCard = this.createCourseCard(course);
                this.continueLearningContainer.appendChild(courseCard);
            });
        }
    },

    createCourseCard({ title, type, duration, progress, imageUrl }) {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <div class="course-card-image">
                <img src="${imageUrl}" alt="${title}" />
            </div>
            <div class="course-card-content">
                <h3>${title}</h3>
                <p class="course-info">
                    <span>${type}</span> • <span>${duration}</span>
                </p>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                </div>
            </div>
        `;
        card.addEventListener('click', () => {
            console.log(`Continuing course: ${title}`);
        });
        return card;
    },

    setupRecommendedCourses() {
        if (this.recommendedCoursesContainer) {
            const recommendedCourses = [
                { title: "Java Programmer (OCAJP) 1Z0-808", instructor: "Andrii Piatakha", rating: 4.6, reviews: 438, imageUrl: "img/Java-Programmer_(OCAJP)_1Z0-808.jpg" },
                { title: "Pass the 1Z0-808 Exam", instructor: "Tim Buchalka", rating: 4.6, reviews: 5906, imageUrl: "img/Pass-the_1Z0-808_Exam.jpg" }
            ];

            const grid = document.createElement('div');
            grid.className = 'recommended-courses-grid';

            recommendedCourses.forEach(course => {
                grid.appendChild(this.createRecommendedCourseCard(course));
            });

            this.recommendedCoursesContainer.appendChild(grid);
        }
    },

    createRecommendedCourseCard({ title, instructor, rating, reviews, imageUrl }) {
        const card = document.createElement('div');
        card.className = 'recommended-course-card';
        card.innerHTML = `
            <div class="course-image">
                <img src="${imageUrl}" alt="${title}" />
            </div>
            <div class="course-content">
                <h3>${title}</h3>
                <p class="instructor">${instructor}</p>
                <div class="rating">
                    ${'★'.repeat(Math.floor(rating))}${'☆'.repeat(5 - Math.floor(rating))}
                    <span class="reviews">(${reviews})</span>
                </div>
            </div>
        `;
        return card;
    },
};

// Learning Dashboard Handler (Lab5)
const LearningDashboardHandler = {
    init() {
        this.watchedTime = document.querySelector('.watched-time');
        this.courseGrid = document.querySelector('.course-grid');
        this.searchInput = document.querySelector('.search-input');
        this.filterButtons = document.querySelectorAll('.filter-button');
        this.navigationTabs = document.querySelector('.navigation-tabs');
        
        this.setupEventListeners();
        this.loadCourses();
    },

    setupEventListeners() {
        // Search functionality
        this.searchInput?.addEventListener('input', (e) => {
            this.filterCourses(e.target.value);
        });

        // Filter buttons
        this.filterButtons?.forEach(button => {
            button.addEventListener('click', () => {
                this.toggleFilter(button);
            });
        });

        // Navigation tabs
        this.navigationTabs?.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                this.switchTab(e.target);
            }
        });
    },

    filterCourses(searchTerm) {
        const courses = document.querySelectorAll('.course-card');
        courses.forEach(course => {
            const title = course.querySelector('h3').textContent.toLowerCase();
            const matches = title.includes(searchTerm.toLowerCase());
            course.style.display = matches ? 'block' : 'none';
        });
    },

    toggleFilter(button) {
        const wasActive = button.classList.contains('active');
        
        // Reset all filters in the same group
        const filterGroup = button.closest('.filter-group');
        filterGroup?.querySelectorAll('.filter-button').forEach(btn => {
            btn.classList.remove('active');
        });

        if (!wasActive) {
            button.classList.add('active');
            this.applyFilters();
        }
    },

    switchTab(tab) {
        // Remove active class from all tabs
        this.navigationTabs.querySelectorAll('button').forEach(t => {
            t.classList.remove('active');
        });
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Update content based on selected tab
        this.loadCourses(tab.textContent.toLowerCase());
    },

    applyFilters() {
        const activeFilters = {
            category: document.querySelector('.category-filter .active')?.dataset.value,
            progress: document.querySelector('.progress-filter .active')?.dataset.value,
            instructor: document.querySelector('.instructor-filter .active')?.dataset.value
        };

        // Apply filters to courses
        const courses = document.querySelectorAll('.course-card');
        courses.forEach(course => {
            let shouldShow = true;
            
            // Check each active filter
            if (activeFilters.category && course.dataset.category !== activeFilters.category) {
                shouldShow = false;
            }
            if (activeFilters.progress && course.dataset.progress !== activeFilters.progress) {
                shouldShow = false;
            }
            if (activeFilters.instructor && course.dataset.instructor !== activeFilters.instructor) {
                shouldShow = false;
            }

            course.style.display = shouldShow ? 'block' : 'none';
        });
    },

    loadCourses(tabName = 'all courses') {
        // You can implement actual course loading logic here
        console.log(`Loading courses for ${tabName} tab`);
    }
};

// Initialize all handlers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    AccountFormHandler.init();
    LoginFormHandler.init();
    DashboardHandler.init();
    LearningDashboardHandler.init();
});

window.togglePassword = function () {
    LoginFormHandler.togglePassword();
};

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    document.querySelectorAll('.d-flex a').forEach(link => {
        if (link.getAttribute('onclick') === `showSection('${sectionId}')`) {
            link.classList.remove('fw-light');
            link.classList.add('fw-bold');
        } else {
            link.classList.remove('fw-bold');
            link.classList.add('fw-light');
        }
    });
};