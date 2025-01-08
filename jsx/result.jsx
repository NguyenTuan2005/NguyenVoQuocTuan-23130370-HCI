const { useState } = React;

const galleryData = [
    {
        id: 1,
        title: "About page",
        images: [
            "img/about.png"
        ],
        link: "https://duyhuunguyen.github.io/GroupWeb/GroupWeb/public/about.html"
    },
    {
        id: 2,
        title: "Template F pattern",
        images: [
            "img/blog_templateF.png",
            "img/blog_templateF(1).png"
        ],
        link: "https://duyhuunguyen.github.io/GroupWeb/GroupWeb/public/blog_StartupCNVN.html"
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
        link: "https://duyhuunguyen.github.io/HotelManagerWeb/giaoDienNguoiDung/Pearl_Stand_Detail.html"
    },
    {
        id: 4,
        title: "Dashboard",
        images: [
            "img/bang_dieu_khien.png",
            "img/bang_dieu_khien(1).png"
        ],
        link: "https://duyhuunguyen.github.io/HotelManagerWeb/index.html"
    },
    {
        id: 5,
        title: "Rooms",
        images: [
            "img/danh_sach_phong.png"
        ],
        link: "https://duyhuunguyen.github.io/HotelManagerWeb/listOfRoom.html"
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
            <div className="card h-100 d-flex flex-column shadow-lg">
                <ImageSlider images={item.images} />
                <div className="card-body d-flex justify-content-center align-items-center mt-auto">
                    <h5 className="card-title flex-fill">{item.title}</h5>
                    <a className="btn btn-sm btn-secondary" href={item.link} target="_blank" rel="noopener noreferrer" title="View details">
                        <i className="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <div className="container py-5">
            <h1 className="text-center fw-bold mb-4">Web Template Design Elements</h1>
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
