const App = () => {
    // Navigation links for the Services section
    const services = [
        {
            title: "Responsive Design",
            description: "Creating fluid and adaptive layouts that work seamlessly across all devices. Implementing mobile-first design principles and flexible grid systems.",
            icon: "fas fa-mobile-alt"
        },
        {
            title: "Web Development",
            description: "Building robust and scalable web applications using modern JavaScript frameworks like React. Focus on clean code and performance optimization.",
            icon: "fas fa-code" 
        },
        {
            title: "UI/UX Design",
            description: "Designing intuitive interfaces with strong focus on user experience, accessibility and modern design principles. Creating engaging visual hierarchies.",
            icon: "fas fa-palette"
        }
    ];

    // Skills with proficiency levels
    const skills = [
        { name: "HTML/CSS", level: 90 },
        { name: "JavaScript/React", level: 85 },
        { name: "Responsive Design", level: 88 },
        { name: "UI/UX Design", level: 82 }
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="hero-section container text-center py-5">
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-6">
                        <h1 className="fw-bold text-nowrap display-4">HI I'M THANIEL NGUYEN</h1>
                        <h2 className="text-muted h3">Front-end Developer</h2>
                        <p className="mt-4 lead text-muted">
                            Building visually stunning and user-friendly websites that bring creative ideas to life through clean and efficient code.
                        </p>
                        <a href="about.html" className="btn btn-dark btn-lg mt-4">
                            <span className="me-2">Here me</span>
                            <i className="fas fa-arrow-right"></i>
                        </a>
                    </div>
                    <div className="col-md-4">
                        <div className="position-relative">
                            <img
                                src="img/avatar-img.jpg"
                                alt="Thaniel Nguyen"
                                className="img-fluid rounded-circle shadow"
                                style={{ 
                                    aspectRatio: "1 / 1", 
                                    objectFit: "cover",
                                    border: "4px solid #fff"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services-section container text-center py-5">
                <h2 className="fw-bold mb-5">What I Do</h2>
                <div className="row g-4">
                    {services.map((service, index) => (
                        <div key={index} className="col-md-4">
                            <div className="card h-100 shadow hover-lift">
                                <div className="card-body p-4">
                                    <i className={`${service.icon} fa-2x text-primary mb-3`}></i>
                                    <h3 className="card-title h5 fw-bold">{service.title}</h3>
                                    <p className="card-text text-muted">{service.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills Section */}
            <section className="skills-section container shadow py-5 bg-light">
                <h2 className="text-center fw-bold mb-5">My Skills</h2>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        {skills.map((skill, index) => (
                            <div key={index} className="mb-4">
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="fw-bold">{skill.name}</span>
                                    <span>{skill.level}%</span>
                                </div>
                                <div className="progress" style={{ height: "10px" }}>
                                    <div
                                        className="progress-bar bg-secondary"
                                        role="progressbar"
                                        style={{ width: `${skill.level}%` }}
                                        aria-valuenow={skill.level}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-section container text-center py-5">
                <h2 className="fw-bold mb-4">Let's Work Together</h2>
                <p className="lead text-muted mb-4">
                    Interested in collaborating? Let's discuss your next project.
                </p>
                <a href="mailto:work.thanielnguyen@gmail.com" 
                   className="btn btn-dark btn-lg">
                    Get in Touch
                </a>
            </section>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("index-root"));
root.render(<App />);