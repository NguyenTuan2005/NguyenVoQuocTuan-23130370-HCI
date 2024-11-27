const CV = () => {
  return (
    <div className="container p-4 shadow-lg" style={{ maxWidth: '210mm', minHeight: '297mm', backgroundColor: 'white' }}>
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-4 fw-bold text-start text-dark mb-0">THANIEL</h1>
          <h1 className="display-4 fw-bold text-start text-dark mb-3">NGUYEN</h1>
          <h2 className="h4 mb-0">Frontend Developer Intern</h2>
        </div>
      </div>

      {/* Horizontal Separator Line */}
      <hr className="border-2 m-0" />

      {/* Main Content */}
      <div className="row">
        {/* Left Column */}
        <div className="col-md-4 pt-3">
          {/* Details Section */}
          <div className="mb-4">
            <h3 className="h5 text-uppercase fw-bold m-0">Details</h3>
            <hr className="border-2 opacity-100 border-dark" style={{ height: '3px', width: '25px' }} />
            <div className="mb-3">
              <div className="fw-bold mb-1">ADDRESS</div>
              <div>Bien Hoa - Dong Nai</div>
              <div>Viet Nam</div>
            </div>
            <div className="mb-3">
              <div className="fw-bold mb-1">PHONE</div>
              <div>0356916931</div>
            </div>
            <div className="mb-3">
              <div className="fw-bold mb-1">EMAIL</div>
              <div className="text-break">work.thanielnguyen@gmail.com</div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-4">
            <h3 className="h5 text-uppercase fw-bold m-0">Skills</h3>
            <hr className="border-2 opacity-100 border-dark" style={{ height: '3px', width: '25px' }} />
            <ul className="list-unstyled">
              <li className="mb-2">Using Git to manage versions of the project and publish website to GitHub</li>
              <li className="mb-2">Microsoft Excel, PPT</li>
            </ul>
          </div>

          {/* Languages Section */}
          <div className="mb-4">
            <h3 className="h5 text-uppercase fw-bold m-0">Languages</h3>
            <hr className="border-2 opacity-100 border-dark" style={{ height: '3px', width: '25px' }} />
            <div>English</div>
          </div>
        </div>

        <div className="col">
          <div className="border-end h-100 border-2"></div>  
        </div>

        {/* Right Column */}
        <div className="col-md-7 pt-3">
          {/* Profile Section */}
          <div className="mb-4">
            <h3 className="h5 text-uppercase fw-bold m-0 ">Profile</h3>
            <hr className="border-2 opacity-100 border-dark" style={{ height: '3px', width: '25px' }} />
            <p className="text-muted w-100" style={{ textAlign: 'justify' }}>
              Dynamic Frontend Developer Intern with a Bachelor of Information Technology 
              from Nong Lam University. I possess a keen analytical mindset and a 
              collaborative approach, adept at mastering new technologies while fostering 
              positive team dynamics. Committed to leveraging academic foundations and 
              technical aptitude in a professional environment, I bring calm reliability and clear, 
              respectful communication to development projects. Proficient in using Git to 
              manage project versions and publish websites to GitHub, as well as Microsoft 
              Excel and PPT. Eager to contribute fresh perspectives and develop practical 
              expertise through hands-on experience and mentorship. Equipped with a 
              growth-oriented mindset and genuine enthusiasm for creating impactful 
              solutions through technology.
            </p>
          </div>
          <hr className="border-2" />

          {/* Education Section */}
          <div className="mb-4">
            <h3 className="h5 text-uppercase fw-bold m-0">Education</h3>
            <hr className="border-2 opacity-100 border-dark" style={{ height: '3px', width: '25px' }} />
            <div className="mb-3">
              <div className="fw-bold">Bachelor of Information Technology, Nong Lam University</div>
              <div className="text-muted">Aug 2023 — Present</div>
            </div>
          </div>
          <hr className="border-2" />

          {/* Courses Section */}
          <div className="mb-4">
            <h3 className="h5 text-uppercase fw-bold m-0">Courses</h3>
            <hr className="border-2 opacity-100 border-dark" style={{ height: '3px', width: '25px' }} />
            <div className="mb-3">
              <div className="fw-bold">MOS, Tin hoc Minh Long</div>
              <div className="text-muted">Aug 2023 — Oct 2023</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('about-root'));
root.render(<CV />);