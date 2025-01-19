const { useState } = React;

const galleryData = [
    {
        id: 1,
        title: "About page",
        images: [
            "img/about.png"
        ],
        link: "https://duyhuunguyen.github.io/GroupWeb/GroupWeb/public/about.html",
        description: "About page with company info.",
        progress: 100
    },
    {
        id: 2,
        title: "Template F pattern",
        images: [
            "img/blog_templateF.png",
            "img/blog_templateF(1).png"
        ],
        link: "https://duyhuunguyen.github.io/GroupWeb/GroupWeb/public/blog_StartupCNVN.html",
        description: "Blog page with posts and sidebar.",
        progress: 100
    },
    {
        id: 3,
        title: "Template Z pattern",
        images: [
            "img/homestay_templateZ.png",
            "img/homestay_templateZ(1).png",
            "img/homestay_templateZ(2).png",
            "img/homestay_templateZ(3).png"
        ],
        link: "https://duyhuunguyen.github.io/HotelManagerWeb/giaoDienNguoiDung/23130370_NguyenVoQuocTuan_Pearl_Stand_Detail.html",
        description: "Hotel detail page.",
        progress: 100
    },
    {
        id: 4,
        title: "Dashboard",
        images: [
            "img/bang_dieu_khien.png",
            "img/bang_dieu_khien(1).png"
        ],
        link: "https://duyhuunguyen.github.io/HotelManagerWeb/23130370_NguyenVoQuocTuan_dashboard.html",
        description: "Hotel management dashboard.",
        progress: 100
    },
    {
        id: 5,
        title: "Rooms",
        images: [
            "img/danh_sach_phong.png"
        ],
        link: "https://duyhuunguyen.github.io/HotelManagerWeb/23130370_NguyenVoQuocTuan_rooms.html",
        description: "List of hotel rooms.",
        progress: 100
    }
];

const ImageSlider = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="carousel slide p-2" style={{ height: '200px' }}>
            <div className="carousel-inner" style={{ height: '100%' }}>
                {images.map((img, index) => (
                    <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`} style={{ height: '100%' }}>
                        <img src={img} className="d-block w-100" alt={`Slide ${index + 1}`} style={{ objectFit: 'cover', height: '100%' }} />
                    </div>
                ))}
            </div>
            {images.length > 1 && (
                <>
                    <button className="carousel-control-prev" type="button" onClick={prevSlide}>
                        <span className="carousel-control-prev-icon" aria-hidden="true" style={{ filter: 'invert(1)' }}></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" onClick={nextSlide}>
                        <span className="carousel-control-next-icon" aria-hidden="true" style={{ filter: 'invert(1)' }}></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </>
            )}
        </div>
    );
};

const GalleryItem = ({ item }) => {
    return (
        <div className="col-md-4 mb-2">
            <div className="card h-100 d-flex flex-column shadow-lg" style={{ transition: 'transform 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <ImageSlider images={item.images} />
                <a className="card-body d-flex flex-column justify-content-center align-items-center mt-auto text-decoration-none" href={item.link} rel="noopener noreferrer" title="View details">
                    <div className="d-flex justify-content-center align-items-center w-100">
                        <h5 className="text-dark card-title flex-fill">{item.title}</h5>
                        <a className="btn btn-sm mb-2" href={item.link} rel="noopener noreferrer" title="View details">
                            <i className="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                    <div className="w-100">
                        <p className="card-text text-secondary">{item.description}</p>
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-secondary small text-muted">Completion</span>
                            <span className="small text-muted">{item.progress}%</span>
                        </div>
                        <div className="progress w-100 position-relative" style={{ height: '0.5rem' }}>
                            <div className="progress-bar bg-secondary " role="progressbar" style={{ width: `${item.progress}%` }} aria-valuenow={item.progress} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <div className="container py-5">
            <h1 className="text-center fw-bold mb-4">Project Gallery</h1>
            <div className="row g-3">
                {galleryData.map((item) => (
                    <GalleryItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('result-root'));
root.render(<App />);
