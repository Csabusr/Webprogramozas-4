import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import Loading from "../Loading";
import config from "../../config";

const Students = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [students, setStudents] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
       if (!isLoaded) {
           const url = `${config.API_URL}/student`;
           fetch(url)
               .then(res => res.json())
               .then(data => setStudents(data))
               .then(() => setIsLoaded(true));
       }
    });

    function deleteStudent(id) {
        const url = `${config.API_URL}/student/${id}`;
        fetch(url, {
            method: 'DELETE'
        }).then(res => {
            if (res.status === 200) {
                setStudents(students.filter(students => students.id !== id));
            } else {
                setErrors([...errors, `Hiba a törlés során!`]);
            }
        }).catch(() => {
        });
    }

    if (!isLoaded) {
        return <Loading/>;
    }

    return (
        <div>

            <div className='row align-items-bottom'>
                <div className='col-md-8'>
                    <h1>Studentek</h1>
                </div>
                <div className='col-md-4 text-right'>
                    {/* TODO: align bottom-right */}
                    <Link to='/students/new' className='btn btn-primary'>
                        <strong><i className="bi bi-plus-lg"/>&nbsp;Új hozzáadása</strong>
                    </Link>
                </div>
            </div>
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>#</th>
                    <th>name</th>
                    <th>tin</th>
                    <th>ssn</th>
                    <th>email</th>
                    <th>phone</th>
                    <th>Neptun_id</th>
                    <th>Address_id</th>
                    <th className='text-center'>Műveletek</th>
                </tr>
                </thead>
                <tbody>

                {students.map((student, index) =>

                    <tr key={student.id}>
                        <td>{index + 1}</td>
                        <td>{student.name}</td>
                        <td>{student.tin}</td>
                        <td>{student.ssn}</td>
                        <td>{student.email}</td>
                        <td>{student.phone}</td>
                        <td>{student.neptun_id.id}</td>
                        <td>{student.address_id.id}</td>
                        <td className='text-center'>
                            <Link to={`/students/${student.id}`} state={{student: student}}
                                  className='btn btn-outline-primary btn-sm'>
                                <i className="bi bi-pencil-fill"/>&thinsp;
                                Módosít
                            </Link>
                            &nbsp;

                            <button className='btn btn-outline-danger btn-sm'
                                    onClick={() => deleteStudent(student.id)}>
                                <i className="bi bi-trash-fill"/>&thinsp;
                                Töröl
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default Students;