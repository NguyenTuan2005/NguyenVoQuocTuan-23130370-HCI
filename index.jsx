const App = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="container text-center py-5">
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-6">
                        <h1 className="fw-bold">HI I'M THANIEL NGUYEN</h1>
                        <h2 className="text-muted">I am Front-end Developer</h2>
                        <p className="mt-3 text-muted">
                            Explore the art of building visually stunning and user-friendly websites that bring ideas to life.
                        </p>
                        <a href="#" className="btn btn-dark mt-3">HERE ME</a>
                    </div>
                    <div className="col-md-3">
                        <img
                            src="img/avatar-img.jpg"
                            alt="Hero"
                            className="img-fluid rounded-circle"
                            style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                        />
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="container text-center py-5">
                <h2 className="fw-bold mb-4">What I Do</h2>
                <div className="row g-3">
                    <div className="col-md-4">
                        <div className="card h-100 text-center">
                            <div className="card-body">
                                <h5 className="card-title">Responsive Design</h5>
                                <p className="card-text">Crafting websites that look great on all devices and screen sizes.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 text-center">
                            <div className="card-body">
                                <h5 className="card-title">Web Development</h5>
                                <p className="card-text">Building fast, dynamic, and accessible websites using modern tools.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 text-center">
                            <div className="card-body">
                                <h5 className="card-title">UI/UX Design</h5>
                                <p className="card-text">Designing intuitive and visually appealing user interfaces.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("index-root"));
root.render(<App />);
