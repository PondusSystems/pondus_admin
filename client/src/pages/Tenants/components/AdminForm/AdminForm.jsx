import { useState } from 'react';
import './AdminForm.css';
import { TbEye } from "react-icons/tb";
import { TbEyeOff } from "react-icons/tb";
import { isValidEmail, isValidPassword } from '../../../../utils/validationUtils';

const AdminForm = ({ handleSave }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        dateOfBirth: "",
        address: "",
        city: "",
        zip: "",
        password: ""
    });
    const [error, setError] = useState({
        name: "",
        email: "",
        number: "",
        dateOfBirth: "",
        address: "",
        city: "",
        zip: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordView = () => {
        setShowPassword(!showPassword);
    };

    const validateData = () => {
        let newError = { ...error };
        let errors = false;
        const { name, email, number, dateOfBirth, address, city, zip, password } = formData;
        if (!name) {
            newError.name = 'Name is required!';
            errors = true;
        }
        else {
            newError.name = '';
        }
        if (!email) {
            newError.email = 'Email is required!';
            errors = true;
        }
        else if (!isValidEmail(email)) {
            newError.email = 'Please provide valid email!';
            errors = true;
        }
        else {
            newError.email = '';
        }
        if (!number) {
            newError.number = 'Phone Number is required!';
            errors = true;
        }
        else {
            newError.number = '';
        }
        if (!dateOfBirth) {
            newError.dateOfBirth = 'Date Of Birth is required!';
            errors = true;
        }
        else {
            newError.dateOfBirth = '';
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
        if (!password) {
            newError.password = 'Password is required!';
            errors = true;
        }
        else if (!isValidPassword(password)) {
            newError.password = 'Password must be at least 8 characters long!';
            errors = true;
        }
        else {
            newError.password = '';
        }
        setError(newError);
        if (errors) {
            console.log('Error: ', newError);
            return false;
        }
        return true;
    };

    const resetFormData = () => {
        setFormData({
            name: "",
            email: "",
            number: "",
            dateOfBirth: "",
            address: "",
            city: "",
            zip: "",
            password: ""
        });
    };

    const handleContinue = async () => {
        if (!validateData()) {
            return;
        }
        try {
            await handleSave(formData);
            resetFormData();
        } catch (error) {
            console.log('Error Found!');
        }
    };

    return (
        <div className='admin-form'>
            <div className='main-content'>
                <div className='input-form'>
                    <div className='title'>Create Admin</div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='name2' className='label'>Name</label>
                            <input
                                type='text'
                                name='name'
                                id='name2'
                                className={`input ${error.name ? 'input-error' : ''}`}
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        {error.name && <div className='error'>{error.name}</div>}
                    </div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='email2' className='label'>E-mail</label>
                            <input
                                type='text'
                                name='email'
                                id='email2'
                                className={`input ${error.email ? 'input-error' : ''}`}
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        {error.email && <div className='error'>{error.email}</div>}
                    </div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='number' className='label'>Phone Number</label>
                            <input
                                type='text'
                                name='number'
                                id='number'
                                className={`input ${error.number ? 'input-error' : ''}`}
                                value={formData.number}
                                onChange={handleChange}
                            />
                        </div>
                        {error.number && <div className='error'>{error.number}</div>}
                    </div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='dateOfBirth' className='label'>Date Of Birth</label>
                            <input
                                type='date'
                                name='dateOfBirth'
                                id='dateOfBirth'
                                className={`input ${error.dateOfBirth ? 'input-error' : ''}`}
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                            />
                        </div>
                        {error.dateOfBirth && <div className='error'>{error.dateOfBirth}</div>}
                    </div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='address2' className='label'>Address</label>
                            <input
                                type='text'
                                name='address'
                                id='address2'
                                className={`input ${error.address ? 'input-error' : ''}`}
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        {error.address && <div className='error'>{error.address}</div>}
                    </div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='city2' className='label'>City</label>
                            <input
                                type='text'
                                name='city'
                                id='city2'
                                className={`input ${error.city ? 'input-error' : ''}`}
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>
                        {error.city && <div className='error'>{error.city}</div>}
                    </div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='zip2' className='label'>ZIP</label>
                            <input
                                type='text'
                                name='zip'
                                id='zip2'
                                className={`input ${error.zip ? 'input-error' : ''}`}
                                value={formData.zip}
                                onChange={handleChange}
                            />
                        </div>
                        {error.zip && <div className='error'>{error.zip}</div>}
                    </div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='password' className='label'>Password</label>
                            <div className='pass-container'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    id='password'
                                    className={`input ${error.password ? 'input-error' : ''}`}
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {!showPassword ?
                                    <TbEye size={18} className='eye-icon' onClick={togglePasswordView} />
                                    :
                                    <TbEyeOff size={18} className='eye-icon' onClick={togglePasswordView} />
                                }
                            </div>
                        </div>
                        {error.password && <div className='error'>{error.password}</div>}
                    </div>
                    <button className='save-btn' onClick={handleContinue}>Save</button>
                </div>
            </div>
        </div>
    )
};

export default AdminForm;