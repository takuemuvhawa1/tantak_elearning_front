import React, { useEffect, useState } from "react"; // Import useState
import Sidebar from "../sidebar";
import Topnav from "../TopNav";
import Footer from "../Footer";
import { API_URL } from "../config";
import Swal from "sweetalert2";
import '../Courses/Courses.css'

const Notes = () => {
    const [dataSource, setDataSource] = useState([]);
    const [moduleId, setmoduleId] = useState(localStorage.getItem('moduleId'));
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [adminId, setAdminId] = useState(localStorage.getItem('Admin'));
    const [teacherId, setTeacherId] = useState(localStorage.getItem('teacher'));
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [file, setFile] = useState(null);

    const handleShowModal = () => {
        setShowAddModal(true);
    };

    const fetchNotes = async () => {
        try {
            const response = await fetch(`${API_URL}/notes/mod/${moduleId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDataSource(data);
        } catch (error) {
            console.error("Error fetching colleges:", error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

        useEffect(() => {
        const checkAdmin = () => {
            if (userId == adminId || userId == teacherId) {
                setIsAdmin(true);
            }
        };

        checkAdmin();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('module_id', moduleId);
            formData.append('title', title);
            formData.append('author', author);
            if (file) {
                formData.append('file', file);
            }

            console.log([...formData]); // Log FormData entries for debugging

            // Upload Assignment
            const response = await fetch(`${API_URL}/notes/note`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Addition failed');

            setShowAddModal(false);
            Swal.fire({
                text: "Assignment uploaded successfully!",
                icon: "success"
            });

            fetchNotes();
        } catch (error) {
            Swal.fire({
                text: error.message || "An error occurred!",
                icon: "error"
            });
        }
    };

    return (
        <html lang="en">

            <body id="page-top">

                <div id="wrapper">

                    <Sidebar></Sidebar>

                    <div id="content-wrapper" className="d-flex flex-column" >
                        <div id="content">

                            <Topnav></Topnav>

                            <div className="container-fluid" style={{ textAlign: 'left', overflow: 'auto', maxHeight: '550px' }}>

                                {/* <!-- Page Heading --> */}

                                {!isAdmin ? (
                                    <h1 className="h3 mb-4 text-gray-800">Notes</h1>
                                ) : (
                                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                        <h1 className="h3 mb-0 text-gray-800">Notes</h1>
                                        <button onClick={handleShowModal} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                            <i className="fas fa-upload fa-sm text-white-50"></i> Upload Notes
                                        </button>
                                    </div>
                                )}

                                {/* TABLE TEXT */}
                                <div class="card shadow mb-4">
                                    <div class="card-header py-3">
                                        <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table" id="dataTable" width="100%" cellspacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Author</th>
                                                        <th>Download</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataSource.map((element) => (
                                                        <tr key={element.notes_id}>
                                                            <td>{element.title}</td>
                                                            <td>{element.author}</td>
                                                            <td><a href={element.path}>download</a></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

                {/* Submit Assignment Modal */}
                {showAddModal && (
                    <div className="modal fade show" style={{ display: 'block' }} onClick={() => setShowAddModal(false)}>
                        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-content" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Upload Notes</h5>
                                    <button type="button" className="close" onClick={() => setShowAddModal(false)}>&times;</button>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label className="modal-label">Title</label>
                                            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                        </div>
                                        <div className="form-group">
                                            <label className="modal-label">Author</label>
                                            <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                                        </div>
                                        <div className="form-group">
                                            <div style={{ float: 'left' }}>
                                                <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
                                            </div>
                                        </div><br></br>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Close</button>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

            </body>

        </html >
    );


};

export default Notes;



