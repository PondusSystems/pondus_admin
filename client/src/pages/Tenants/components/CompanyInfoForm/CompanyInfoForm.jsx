import { useState, useEffect } from 'react';
import './CompanyInfoForm.css';

const companyInfoForm = ({ companyInfo, handleSave }) => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        zip: "",
        type: "",
        logo: ""
    });
    const [error, setError] = useState({
        name: "",
        address: "",
        city: "",
        zip: "",
        type: "",
        logo: ""
    });

    useEffect(() => {
        if (companyInfo) {
            const updatedFormData = {
                name: companyInfo.name || "",
                address: companyInfo.address || "",
                city: companyInfo.city || "",
                zip: companyInfo.zip || "",
                type: companyInfo.type || "",
                logo: companyInfo.logo || "",
            };
            setFormData(updatedFormData);
        }
    }, [companyInfo]);

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setFormData({ ...formData, [name]: value });
    };

    const validateData = () => {
        let newError = { ...error };
        let errors = false;
        const { name, address, city, zip, type, logo } = formData;
        if (!name) {
            newError.name = 'Name is required!';
            errors = true;
        }
        else {
            newError.name = '';
        }
        if (!address) {
            newError.address = 'Address is required!';
            errors = true;
        }
        else {
            newError.address = '';
        }
        if (!city) {
            newError.city = 'City is required!';
            errors = true;
        }
        else {
            newError.city = '';
        }
        if (!zip) {
            newError.zip = 'Zip is required!';
            errors = true;
        }
        else {
            newError.zip = '';
        }
        if (!type) {
            newError.type = 'Type is required!';
            errors = true;
        }
        else {
            newError.type = '';
        }
        if (!logo) {
            newError.logo = 'Logo is required!';
            errors = true;
        }
        else {
            newError.logo = '';
        }

        setError(newError);
        if (errors) {
            return false;
        }
        return true;
    };

    const handleContinue = () => {
        if (!validateData()) {
            return;
        }
        handleSave(formData);
    };

    return (
        <div className='company-info-form'>
            <div className='main-content'>
                <div className='input-form'>
                    <div className='title'>Company Info</div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='name' className='label'>Name</label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                className={`input ${error.name ? 'input-error' : ''}`}
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        {error.name && <div className='error'>{error.name}</div>}
                    </div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='address' className='label'>Address</label>
                            <input
                                type='text'
                                name='address'
                                id='address'
                                className={`input ${error.address ? 'input-error' : ''}`}
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        {error.address && <div className='error'>{error.address}</div>}
                    </div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='city' className='label'>City</label>
                            <input
                                type='text'
                                name='city'
                                id='city'
                                className={`input ${error.city ? 'input-error' : ''}`}
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>
                        {error.city && <div className='error'>{error.city}</div>}
                    </div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='zip' className='label'>Zip</label>
                            <input
                                type='text'
                                name='zip'
                                id='zip'
                                className={`input ${error.zip ? 'input-error' : ''}`}
                                value={formData.zip}
                                onChange={handleChange}
                            />
                        </div>
                        {error.zip && <div className='error'>{error.zip}</div>}
                    </div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='type' className='label'>Type</label>
                            <select
                                name='type'
                                id='type'
                                className={`input ${error.type ? 'input-error' : ''}`}
                                value={formData.type}
                                onChange={handleChange}
                            >
                                <option value='' disabled>Select Type</option>
                                <option value='Studio' >Studio</option>
                                <option value='Traditional Gym' >Traditional Gym</option>
                                <option value='Health Club' >Health Club</option>
                                <option value='Non-profit' >Non-profit</option>
                                <option value='Other'>Other</option>
                            </select>
                        </div>
                        {error.type && <div className='error'>{error.type}</div>}
                    </div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='logo' className='label'>Logo</label>
                            <input
                                type='text'
                                name='logo'
                                id='logo'
                                className={`input ${error.logo ? 'input-error' : ''}`}
                                value={formData.logo}
                                onChange={handleChange}
                            />
                        </div>
                        {error.logo && <div className='error'>{error.logo}</div>}
                    </div>
                    <button className='save-btn' onClick={handleContinue}>Save</button>
                </div>
            </div>
        </div>
    )
};

export default companyInfoForm;