import React, {useEffect, useState} from "react";

import Loading from "../Loading";
import config from "../../config";
import {Link} from "react-router-dom";

const Neptuns = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [readers, setAddresses] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (!isLoaded) {
            const url = `${config.API_URL}/address`;
            fetch(url)
                .then(res => res.json())
                .then(data => setAddresses(data))
                .then(() => setIsLoaded(true));
        }
     });

    function deleteReader(id) {
        const url = `${config.API_URL}/address/${id}`;
        fetch(url, {
            method: 'DELETE'
        }).then(res => {
            if (res.status === 200) {
              setAddresses(readers.filter(reader => reader.id !== id));
            } else {
                setErrors([...errors, 'Hiba a törlés során!']);
            }
        }).catch(() => {
        });
    }

    return (
        <div>
            {errors}

            <div className='row align-items-bottom'>
                <div className='col-md-8'>
                    <h1>Addressek</h1>
                </div>
                <div className='col-md-4 text-right'>
                    {/* TODO: align bottom-right */}
                    <Link to='/addresses/new' className='btn btn-primary'>
                        <strong><i className="bi bi-plus-lg"/>&nbsp;Új hozzáadása</strong>
                    </Link>
                </div>
            </div>
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Addressek</th>
                    <th className='text-center'>Műveletek</th>
                </tr>
                </thead>
                <tbody>

                {readers.map((reader, index) =>
                    <tr key={reader.id}>
                        <td>{index + 1}</td>
                        <td>{reader.zip_code}</td>
                        <td>{reader.city}</td>
                        <td>{reader.street_name}</td>
                        <td>{reader.street_number}</td>
                        <td className='text-center'>
                            <Link to={`/addresses/${reader.id}`} state={{address: reader}}
                                  className='btn btn-outline-primary btn-sm'>
                                <i className="bi bi-pencil-fill"/>&thinsp;
                                Módosít
                            </Link>
                            &nbsp;

                            <button className='btn btn-outline-danger btn-sm'
                                    onClick={() => deleteReader(reader.id)}>
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

export default Neptuns;