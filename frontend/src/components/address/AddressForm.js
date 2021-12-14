import React, {useState} from "react";
import {useNavigate, useLocation, useParams} from "react-router-dom";
import config from "../../config";

const AddressForm = () => {
    const [errors, setErrors] = useState([]);
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    let zip_code = location.state ? location.state.address.zip_code : '';
    let city = location.state ? location.state.address.city : '';
    let street_name = location.state ? location.state.address.street_name : '';
    let street_number = location.state ? location.state.address.street_number : '';

    const handleSubmit = (e) => {
        const url =  `${config.API_URL}/address/${location.state ? id : ''}`;

        const method = location.state ? 'PUT' : 'POST';
        const address = {
            id: id,
             zip_code: zip_code,
              city: city,
               street_name: street_name,
                street_number: street_number
            };
        
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(address)
        }).then(res => {
            if (res.status === 200) {
                navigate('/addresses');
            } else if (res.message) {
                setErrors([...errors, `Hiba!`]);
            }
        }).catch(() => {
        });

        e.preventDefault();
    }

    const handleZipCodeChange = (e) => {
        zip_code = e.target.value;
    }
    const handleCityChange = (e) => {
      city = e.target.value;
    }
    const handleStreetNameChange = (e) => {
      street_name = e.target.value;
    }
    const handleStreetNumberChange = (e) => {
      street_number = e.target.value;
    }

    return (
        <div>
            {errors}
            <h1>{location.state ? 'Szerkesztés' : 'Új Address'}</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="addressZip_Code" className="form-label">ZipCode</label>
                    <input type="text" className="form-control" id="addressZip_Code"
                           placeholder="zip_code" defaultValue={zip_code} onChange={handleZipCodeChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="address_City" className="form-label">City</label>
                    <input type="text" className="form-control" id="address_city"
                           placeholder="city" defaultValue={city} onChange={handleCityChange}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="addressStreetName" className="form-label">StreetName</label>
                    <input type="text" className="form-control" id="addresStreet_name"
                           placeholder="street_name" defaultValue={street_name} onChange={handleStreetNameChange}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="addressStreetNumber" className="form-label">StreetNumber</label>
                    <input type="text" className="form-control" id="addressStreet_number"
                           placeholder="street_number" defaultValue={street_number} onChange={handleStreetNumberChange}/>
                </div>
                <div>
                    <button className='btn btn-primary' onClick={handleSubmit}>Mentés</button>
                </div>
            </form>
        </div>
    );
}

export default AddressForm;
