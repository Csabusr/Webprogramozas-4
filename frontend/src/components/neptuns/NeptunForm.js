import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import config from "../../config";

const NeptunForm = () => {
    const [errors, setErrors] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    let id = location.state ? location.state.neptun.id : '';
    let neptun_code = location.state ? location.state.neptun_Code : '';

    const handleSubmit = (e) => {
        const url = `${config.API_URL}/neptun/${location.state ? id : ''}`;
        const method = location.state ? 'PUT' : 'POST';

        const neptun = {
            id: id,
            neptun_Code: neptun_code
        };
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(neptun)
        }).then(res => {
            if (res.status === 200) {
                navigate('/neptuns');
            } else if (res.message) {
                setErrors([...errors, `Hiba!`]);
            }
        }).catch(() => {
        });

        e.preventDefault();
    }

    const handleNeptunCodeChange = (e) => {
        neptun_code = e.target.value;
    }

    return (
        <div>
            {errors}
            <h1>{location.state ? 'Szerkesztés' : 'Új neptun'}</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="readerNeptun_Code" className="form-label">Neptun Code</label>
                    <input type="text" className="form-control" id="readerNeptun_Code"
                           placeholder="Neptun_Code" defaultValue={neptun_code} onChange={handleNeptunCodeChange}/>
                </div>
                <div>
                    <button className='btn btn-primary' onClick={handleSubmit}>Mentés</button>
                </div>
            </form>
        </div>
    );
}

export default NeptunForm;