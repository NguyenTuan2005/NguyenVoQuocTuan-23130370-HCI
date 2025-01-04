const { useState } = React;

const INITIAL_SUBJECTS = [
    { key: 'mathematics', label: 'Mathematics' },
    { key: 'physics', label: 'Physics' },
    { key: 'chemistry', label: 'Chemistry' },
    { key: 'biology', label: 'Biology' }
];

const StudyMaterialsApp = () => {
    const [selectedSubject, setSelectedSubject] = useState('All');
    const [showAddModal, setShowAddModal] = useState(false);
    const [materials, setMaterials] = useState({
        mathematics: [
            { id: 1, title: 'Lecture 1 - Introduction to Calculus', type: 'doc', url: 'https://example.com/math_lecture1.doc' },
            { id: 2, title: 'Lecture 2 - Linear Algebra', type: 'pdf', url: 'https://example.com/math_lecture2.pdf' },
            { id: 4, title: 'Lecture 3 - Differential Equations', type: 'pdf', url: 'https://example.com/math_lecture3.pdf' },
            { id: 5, title: 'Lecture 4 - Multivariable Calculus', type: 'ppt', url: 'https://example.com/math_lecture4.ppt' }
        ],
        physics: [
            { id: 3, title: 'Lecture 1 - Classical Mechanics', type: 'ppt', url: 'https://example.com/physics_lecture1.ppt' },
            { id: 6, title: 'Lecture 2 - Electromagnetism', type: 'pdf', url: 'https://example.com/physics_lecture2.pdf' },
            { id: 7, title: 'Lecture 3 - Quantum Mechanics', type: 'doc', url: 'https://example.com/physics_lecture3.doc' }
        ],
        chemistry: [
            { id: 8, title: 'Lecture 1 - Organic Chemistry Basics', type: 'pdf', url: 'https://example.com/chem_lecture1.pdf' },
            { id: 9, title: 'Lecture 2 - Inorganic Chemistry', type: 'ppt', url: 'https://example.com/chem_lecture2.ppt' },
            { id: 10, title: 'Lecture 3 - Chemical Bonding', type: 'doc', url: 'https://example.com/chem_lecture3.doc' }
        ],
        biology: [
            { id: 11, title: 'Lecture 1 - Cell Biology', type: 'pdf', url: 'https://example.com/bio_lecture1.pdf' },
            { id: 12, title: 'Lecture 2 - Genetics', type: 'ppt', url: 'https://example.com/bio_lecture2.ppt' },
            { id: 13, title: 'Lecture 3 - Evolutionary Biology', type: 'doc', url: 'https://example.com/bio_lecture3.doc' }
        ]
    });

    const getFileIcon = (type) => {
        switch (type) {
            case 'doc':
                return <i className="far fa-file-word text-secondary"></i>;
            case 'pdf':
                return <i className="far fa-file-pdf text-secondary"></i>;
            case 'ppt':
                return <i className="far fa-file-powerpoint text-secondary"></i>;
            case 'xls':
            case 'xlsx':
                return <i className="far fa-file-excel text-secondary"></i>;
            default:
                return <i className="far fa-file-alt text-secondary"></i>;
        }
    };

    const [previewUrl, setPreviewUrl] = useState('');
    const [showPreviewModal, setShowPreviewModal] = useState(false);

    const handleFilePreview = (url) => {
        setPreviewUrl(url);
        setShowPreviewModal(true);
    };

    const handleDownload = (url, fileName) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleAddLecture = (event) => {
        event.preventDefault();
        const title = event.target.elements['lecture-title'].value;
        const subject = event.target.elements['lecture-subject'].value;
        const file = event.target.elements['lecture-file'].files[0];

        if (title && subject && file) {
            const newMaterial = {
                id: materials[subject].length + 1,
                title,
                type: file.name.split('.').pop().toLowerCase(),
                url: URL.createObjectURL(file),
                fileName: file.name
            };

            setMaterials(prev => ({
                ...prev,
                [subject]: [...prev[subject], newMaterial]
            }));

            setShowAddModal(false);
            event.target.reset();
        }
    };

    // Filter materials based on selected subject
    const filteredMaterials = selectedSubject === 'All'
        ? Object.values(materials).flat()
        : materials[selectedSubject] || [];

    return (
        <div className="container-fluid mt-4 p-3 bg-light rounded-3 shadow">
            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="fa fa-filter me-2"></i>Filter
                        </span>
                        <select
                            className="form-select"
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                        >
                            <option value="All">All Subjects</option>
                            {INITIAL_SUBJECTS.map(subject => (
                                <option key={subject.key} value={subject.key}>
                                    {subject.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-md-6 text-end">
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowAddModal(true)}
                    >
                        <i className="fa fa-plus me-2"></i>Add Lecture
                    </button>
                </div>
            </div>

            <table className="table table-striped table-hover">
                <thead className="table-light">
                    <tr>
                        <th>Subject</th>
                        <th>Type</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMaterials.map(material => {
                        const subject = Object.keys(materials).find(key =>
                            materials[key].some(m => m.id === material.id)
                        );

                        return (
                            <tr key={material.id}>
                                <td className="align-middle">
                                    {INITIAL_SUBJECTS.find(s => s.key === subject)?.label || subject}
                                </td>
                                <td className="align-middle">
                                    {getFileIcon(material.type)}
                                </td>
                                <td className="align-middle">
                                    {material.title}
                                </td>
                                <td>
                                    <div className="btn-group gap-2" role="group">
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => handleFilePreview(material.url)}
                                            title="Preview"
                                        >
                                            <i className="fa fa-eye me-1"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => handleDownload(material.url, material.title + '.' + material.type)}
                                            title="Download"
                                        >
                                            <i className="fa fa-download me-1"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => {
                                                setMaterials(prev => {
                                                    const updatedMaterials = { ...prev };
                                                    updatedMaterials[subject] = updatedMaterials[subject].filter(m => m.id !== material.id);
                                                    return updatedMaterials;
                                                });
                                            }}
                                            title="Delete"
                                        >
                                            <i className="fa fa-trash me-1"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Add Lecture Modal */}
            {showAddModal && (
                <div className="modal show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Lecture</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowAddModal(false)}
                                ></button>
                            </div>
                            <form onSubmit={handleAddLecture}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="lecture-subject" className="form-label">Subject</label>
                                        <select
                                            id="lecture-subject"
                                            className="form-select"
                                            required
                                        >
                                            <option value="">Select Subject</option>
                                            {INITIAL_SUBJECTS.map(subject => (
                                                <option key={subject.key} value={subject.key}>
                                                    {subject.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lecture-title" className="form-label">Lecture Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lecture-title"
                                            placeholder="Enter lecture title"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lecture-file" className="form-label">File Upload</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="lecture-file"
                                            accept=".pdf,.doc,.ppt"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowAddModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Add Lecture
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Preview Modal */}
            {showPreviewModal && (
                <div className="modal show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">File Preview</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowPreviewModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <iframe
                                    src={previewUrl}
                                    style={{ width: '100%', height: '500px' }}
                                    title="File Preview"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('lab3-root'));
root.render(<StudyMaterialsApp />);