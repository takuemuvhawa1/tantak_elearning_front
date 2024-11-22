// import React, { useEffect, useState } from "react"; // Import useState
// import Sidebar from "../sidebar";
// import Topnav from "../TopNav";
// import Footer from "../Footer";
// import { API_URL } from "../config";
// import Swal from "sweetalert2";
// import '../Courses/Courses.css'

// const Assignments = () => {
//     const [dataSource, setDataSource] = useState([]);
//     const [moduleId, setmoduleId] = useState(localStorage.getItem('moduleId'))
//     const [isAdmin, setIsAdmin] = useState(true);
//     const [userId, setUserId] = useState(localStorage.getItem('userId'));
//     const [assignments, setAssignments] = useState([]);
//     const [topic, setTopic] = useState('');
//     const [type, setType] = useState('');
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [file, setFile] = useState(null);


//     // useEffect({
//     //     setCourseId(localStorage.getItem('courseId'))
//     // },[])

//     const handleShowModal = () => {
//         setShowAddModal(true);
//     };

//     const fetchAssignments = async () => {
//         try {
//             const response = await fetch(`${API_URL}/assignments/mod/${moduleId}`);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             setDataSource(data);
//         } catch (error) {
//             console.error("Error fetching colleges:", error);
//         }
//     };

//     useEffect(() => {
//         fetchAssignments();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Prevent default form submission

//         try {
//             const formData = new FormData();
//             formData.append('module_id', moduleId);
//             formData.append('topic', topic);
//             formData.append('type', type);
//             if (file) {
//                 formData.append('file', file); // Append the file
//             }

//             console.log(formData);

//             // Upload Assignment
//             const response = await fetch(`${API_URL}/assignments`, {
//                 method: 'POST',
//                 body: formData, // Send FormData directly
//             });

//             if (!response.ok) throw new Error('Addition failed');
//             setShowAddModal(false);
//             Swal.fire({
//                 text: "Assignment uploaded successfully!",
//                 icon: "success"
//             });

//             fetchAssignments();
//         } catch (error) {
//             Swal.fire({
//                 text: error.message || "An error occurred!",
//                 icon: "error"
//             });
//         }
//     }

//     return (
//         <html lang="en">

//             <body id="page-top">

//                 <div id="wrapper">

//                     <Sidebar></Sidebar>

//                     <div id="content-wrapper" className="d-flex flex-column" >
//                         <div id="content">

//                             <Topnav></Topnav>

//                             <div className="container-fluid" style={{ textAlign: 'left', overflow: 'auto', maxHeight: '550px' }}>

//                                 {/* <!-- Page Heading --> */}
//                                 {!isAdmin && (
//                                     <h1 className="h3 mb-4 text-gray-800" style={{ textAlign: 'left' }}>Assignments</h1>
//                                 )}

//                                 {isAdmin && (
//                                     <div class="d-sm-flex align-items-center justify-content-between mb-4">
//                                         <h1 class="h3 mb-0 text-gray-800">Assignments</h1>
//                                         <button onClick={handleShowModal} class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
//                                             class="fas fa-upload fa-sm text-white-50"></i> Upload Assignment</button>
//                                     </div>
//                                 )}

//                                 {/* TABLE TEXT */}
//                                 <div class="card shadow mb-4">
//                                     <div class="card-header py-3">
//                                         <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
//                                     </div>
//                                     <div class="card-body">
//                                         <div class="table-responsive">
//                                             <table class="table" id="dataTable" width="100%" cellspacing="0">
//                                                 <thead>
//                                                     <tr>
//                                                         <th>Date</th>
//                                                         <th>Topic</th>
//                                                         <th>Type</th>
//                                                         <th>Download</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     {dataSource.map((element) => (
//                                                         <tr key={element.assignment_id}>
//                                                             <td>{element.date.slice(0, 10)}</td>
//                                                             <td>{element.topic}</td>
//                                                             <td>{element.type}</td>
//                                                             <td><a href={element.path}>download</a></td>
//                                                         </tr>
//                                                     ))}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>

//                     </div>

//                 </div>

//                 {/* Submit Assignment Modal */}
//                 {showAddModal && (
//                     <div className="modal fade show" style={{ display: 'block' }} onClick={() => setShowAddModal(false)}>
//                         <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
//                             <div className="modal-content" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
//                                 <div className="modal-header">
//                                     <h5 className="modal-title">Upload Assignment</h5>
//                                     <button type="button" className="close" onClick={() => setShowAddModal(false)}>&times;</button>
//                                 </div>
//                                 <form onSubmit={handleSubmit}>
//                                     <div className="modal-body">
//                                         <div className="form-group">
//                                             <label className="modal-label">Topic</label>
//                                             <input type="text" className="form-control" value={topic} onChange={(e) => setTopic(e.target.value)} required />
//                                         </div>
//                                         <div className="form-group">
//                                             <label className="modal-label">Type</label>
//                                             <input type="text" className="form-control" value={type} onChange={(e) => setType(e.target.value)} required />
//                                         </div>
//                                         <div className="form-group">
//                                             <div style={{ float: 'left' }}>
//                                                 <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
//                                             </div>
//                                         </div><br></br>
//                                     </div>
//                                     <div className="modal-footer">
//                                         <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Close</button>
//                                         <button type="submit" className="btn btn-primary">Submit</button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//             </body>

//         </html >
//     );


// };

// export default Assignments;

import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar";
import Topnav from "../TopNav";
import Footer from "../Footer";
import { API_URL } from "../config";
import Swal from "sweetalert2";
import '../Courses/Courses.css';

const Assignments = () => {
    const [dataSource, setDataSource] = useState([]);
    const [moduleId, setModuleId] = useState(localStorage.getItem('moduleId'));
    const [adminId, setAdminId] = useState(localStorage.getItem('Admin'));
    const [teacherId, setTeacherId] = useState(localStorage.getItem('teacher'));
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [topic, setTopic] = useState('');
    const [type, setType] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [file, setFile] = useState(null);


    const handleShowModal = () => {
        setShowAddModal(true);
    };

    const fetchAssignments = async () => {
        try {
            const response = await fetch(`${API_URL}/assignments/mod/${moduleId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDataSource(data);
        } catch (error) {
            console.error("Error fetching assignments:", error);
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, [moduleId]);

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
            formData.append('topic', topic);
            formData.append('type', type);
            if (file) {
                formData.append('file', file);
            }

            console.log([...formData]); // Log FormData entries for debugging

            // Upload Assignment
            const response = await fetch(`${API_URL}/assignments/assignment`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Addition failed');

            setShowAddModal(false);
            Swal.fire({
                text: "Assignment uploaded successfully!",
                icon: "success"
            });

            fetchAssignments();
        } catch (error) {
            Swal.fire({
                text: error.message || "An error occurred!",
                icon: "error"
            });
        }
    };

    return (
        <div lang="en" id="page-top">
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topnav />
                        <div className="container-fluid" style={{ textAlign: 'left', overflow: 'auto', maxHeight: '550px' }}>
                            {!isAdmin ? (
                                <h1 className="h3 mb-4 text-gray-800">Assignments</h1>
                            ) : (
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Assignments</h1>
                                    <button onClick={handleShowModal} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                        <i className="fas fa-upload fa-sm text-white-50"></i> Upload Assignment
                                    </button>
                                </div>
                            )}

                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Assignments List</h6>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table" id="dataTable" width="100%" cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Topic</th>
                                                    <th>Type</th>
                                                    <th>Download</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataSource.map((element) => (
                                                    <tr key={element.assignment_id}>
                                                        <td>{element.date.slice(0, 10)}</td>
                                                        <td>{element.topic}</td>
                                                        <td>{element.type}</td>
                                                        <td><a href={element.path} download>Download</a></td>
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
                                <h5 className="modal-title">Upload Assignment</h5>
                                <button type="button" className="close" onClick={() => setShowAddModal(false)}>&times;</button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="modal-label">Topic</label>
                                        <input type="text" className="form-control" value={topic} onChange={(e) => setTopic(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="modal-label">Type</label>
                                        <input type="text" className="form-control" value={type} onChange={(e) => setType(e.target.value)} required />
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
        </div>
    );
};

export default Assignments;


