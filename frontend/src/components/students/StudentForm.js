import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import config from "../../config";
import Loading from "../Loading";

const StudentForm = () => {
    const [errors, setErrors] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    let id = location.state ? location.state.student.id : '';
    let name = location.state ? location.state.student.name : '';
    let tin = location.state ? location.state.student.tin : '';
    let ssn = location.state ? location.state.student.ssn : '';
    let email = location.state ? location.state.student.email : '';
    let phone = location.state ? location.state.student.phone : '';
    let neptun_id = location.state ? location.state.student.neptun_id.id : '';
    let address_id = location.state ? location.state.student.address_id.id : '';


    function handleNameChange(e) {
        name = e.target.value;
    }

    function handleTinChange(e) {
        tin = e.target.value;
    }
    function handleSsnChange(e) {
      ssn = e.target.value;
    }
    function handleEmailChange(e) {
      email = e.target.value;
    }
    function handlePhoneChange(e) {
      phone = e.target.value;
    }
    function handleNeptun_idChange(e) {
      neptun_id = e.target.value;
    }
    function handleAddress_idChange(e) {
      address_id = e.target.value;
    }
 

    function handleSubmit(e) {
        const url = `${config.API_URL}/student/${location.state ? id : ''}`;
        const method = location.state ? 'PUT' : 'POST';

        const student = {
            id: id,
            name: name,
            tin: tin,
            ssn: ssn,
            email: email,
            phone: phone,
            neptun_id: neptun_id,
            address_id: address_id
        };
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        }).then(res => {
            if (res.status === 200) {
                navigate('/students');
            } else if (res.message) {
                setErrors([...errors, 'Hiba!']);
            }
        }).catch(() => {
        });

        e.preventDefault();
    }

    return (
        <div>
            {errors}
            <h1>{location.state ? 'Szerkesztés' : 'Új Student'}</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="studentName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="studentName"
                           placeholder="Name" defaultValue={name} onChange={handleNameChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="studentTin" className="form-label">Tin</label>
                    <input type="text" className="form-control" id="studentTin"
                           placeholder="Tin" defaultValue={tin} onChange={handleTinChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="studentSsn" className="form-label">Ssn</label>
                    <input type="text" className="form-control" id="studentSsn"
                           placeholder="Ssn" defaultValue={ssn} onChange={handleSsnChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="studentEmail" className="form-label">Email</label>
                    <input type="text" className="form-control" id="studentEmail"
                           placeholder="Email" defaultValue={email} onChange={handleEmailChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="studentPhone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="studentPhone"
                           placeholder="Phone" defaultValue={phone} onChange={handlePhoneChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="studentNeptun_id" className="form-label">Neptun_id</label>
                    <input type="text" className="form-control" id="studentNeptun_Id"
                           placeholder="Neptun_id" defaultValue={neptun_id} onChange={handleNeptun_idChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="studentAddress" className="form-label">Address_id</label>
                    <input type="text" className="form-control" id="studentAddress_id"
                           placeholder="Address_id" defaultValue={address_id} onChange={handleAddress_idChange}/>
                </div>

                <div>
                    <button className='btn btn-primary' onClick={handleSubmit}>Mentés</button>
                </div>
            </form>
        </div>
    );
}

export default StudentForm;