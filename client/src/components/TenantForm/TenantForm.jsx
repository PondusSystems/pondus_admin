import { useState, useEffect } from 'react';
import './TenantForm.css';
import { isValidEmail } from '../../utils/validationUtils';

const TenantForm = ({ tenant, actionType, handleSave }) => {
    const [formData, setFormData] = useState({
        companyName: "",
        tenantId: "",
        dbURI: "",
        host: "",
        stripeApiKey: "",
        stripeWebhookKey: "",
        nodemailerService: "",
        nodemailerSenderEmail: "",
        nodemailerSenderPassword: ""
    });
    const [error, setError] = useState({
        companyName: "",
        tenantId: "",
        dbURI: "",
        host: "",
        stripeApiKey: "",
        stripeWebhookKey: "",
        nodemailerService: "",
        nodemailerSenderEmail: "",
        nodemailerSenderPassword: ""
    });

    useEffect(() => {
        if (tenant && actionType === "edit") {
            const updatedFormData = {
                companyName: tenant.companyName || "",
                tenantId: tenant.tenantId || "",
                dbURI: tenant.config.dbURI || "",
                host: tenant.config.host || "",
                stripeApiKey: tenant.config.stripe.apiKey || "",
                stripeWebhookKey: tenant.config.stripe.webhookKey || "",
                nodemailerService: tenant.config.nodemailer.service || "",
                nodemailerSenderEmail: tenant.config.nodemailer.senderEmail || "",
                nodemailerSenderPassword: tenant.config.nodemailer.senderPassword || ""
            };
            setFormData(updatedFormData);
        }
    }, [tenant]);

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setFormData({ ...formData, [name]: value });
    };

    const validateData = () => {
        let newError = { ...error };
        let errors = false;
        const { companyName, tenantId, dbURI, host, stripeApiKey, stripeWebhookKey, nodemailerService, nodemailerSenderEmail, nodemailerSenderPassword } = formData;
        if (!companyName) {
            newError.companyName = 'Company name is required!';
            errors = true;
        }
        else {
            newError.companyName = '';
        }
        if (!tenantId) {
            newError.tenantId = 'Tenant Id is required!';
            errors = true;
        }
        else {
            newError.tenantId = '';
        }
        if (!dbURI) {
            newError.dbURI = 'DB URI is required!';
            errors = true;
        }
        else {
            newError.dbURI = '';
        }
        if (!host) {
            newError.host = 'Domain host is required!';
            errors = true;
        }
        else {
            newError.host = '';
        }
        if (!stripeApiKey) {
            newError.stripeApiKey = 'Stripe API key is required!';
            errors = true;
        }
        else {
            newError.stripeApiKey = '';
        }
        if (!stripeWebhookKey) {
            newError.stripeWebhookKey = 'Stripe Webhook key is required!';
            errors = true;
        }
        else {
            newError.stripeWebhookKey = '';
        }
        if (!nodemailerService) {
            newError.nodemailerService = 'Email Service is required!';
            errors = true;
        }
        else {
            newError.nodemailerService = '';
        }
        if (!nodemailerSenderEmail) {
            newError.nodemailerSenderEmail = 'Sender Email is required!';
            errors = true;
        }
        else if (!isValidEmail(nodemailerSenderEmail)) {
            newError.nodemailerSenderEmail = 'Sender Email is not valid!';
            errors = true;
        }
        else {
            newError.nodemailerSenderEmail = '';
        }
        if (!nodemailerSenderPassword) {
            newError.nodemailerSenderPassword = 'Sender Password is required!';
            errors = true;
        }
        else {
            newError.nodemailerSenderPassword = '';
        }
        setError(newError);
        if (errors) {
            console.log('Error: ', newError);
            return false;
        }
        return true;
    };

    const handleContinue = () => {
        if (!validateData()) {
            return;
        }
        const data = {
            companyName: formData.companyName,
            tenantId: formData.tenantId,
            config: {
                dbURI: formData.dbURI,
                host: formData.host,
                stripe: {
                    apiKey: formData.stripeApiKey,
                    webhookKey: formData.stripeWebhookKey
                },
                nodemailer: {
                    service: formData.nodemailerService,
                    senderEmail: formData.nodemailerSenderEmail,
                    senderPassword: formData.nodemailerSenderPassword
                }
            }
        };
        handleSave(data);
    };

    return (
        <div className='tenant-form'>
            {actionType === "edit" &&
                <div className='top-bar'>
                    <div className='flex-row'>
                        <div className='name'>{tenant.companyName}</div>
                        <div className='register-time'>Registered Since: {new Date(tenant.createdAt).toLocaleDateString()}</div>
                    </div>
                </div>
            }
            <div className='main-content'>
                <div className='input-form'>
                    <div className='title'>Details</div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='companyName' className='label'>Company Name</label>
                            <input
                                type='text'
                                name='companyName'
                                id='companyName'
                                className={`input ${error.companyName ? 'input-error' : ''}`}
                                value={formData.companyName}
                                onChange={handleChange}
                            />
                        </div>
                        {error.companyName && <div className='error'>{error.companyName}</div>}
                    </div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='tenantId' className='label'>Tenant ID</label>
                            <input
                                type='text'
                                name='tenantId'
                                id='tenantId'
                                className={`input ${error.tenantId ? 'input-error' : ''}`}
                                value={formData.tenantId}
                                onChange={handleChange}
                            />
                        </div>
                        {error.tenantId && <div className='error'>{error.tenantId}</div>}
                    </div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='dbURI' className='label'>Database URI</label>
                            <input
                                type='text'
                                name='dbURI'
                                id='dbURI'
                                className={`input ${error.dbURI ? 'input-error' : ''}`}
                                value={formData.dbURI}
                                onChange={handleChange}
                            />
                        </div>
                        {error.dbURI && <div className='error'>{error.dbURI}</div>}
                    </div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='host' className='label'>Domain Host</label>
                            <input
                                type='text'
                                name='host'
                                id='host'
                                className={`input ${error.host ? 'input-error' : ''}`}
                                value={formData.host}
                                onChange={handleChange}
                            />
                        </div>
                        {error.host && <div className='error'>{error.host}</div>}
                    </div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='stripeApiKey' className='label'>Stripe API Key</label>
                            <input
                                type='text'
                                name='stripeApiKey'
                                id='stripeApiKey'
                                className={`input ${error.stripeApiKey ? 'input-error' : ''}`}
                                value={formData.stripeApiKey}
                                onChange={handleChange}
                            />
                        </div>
                        {error.stripeApiKey && <div className='error'>{error.stripeApiKey}</div>}
                    </div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='stripeWebhookKey' className='label'>Stripe Webhook Key</label>
                            <input
                                type='text'
                                name='stripeWebhookKey'
                                id='stripeWebhookKey'
                                className={`input ${error.stripeWebhookKey ? 'input-error' : ''}`}
                                value={formData.stripeWebhookKey}
                                onChange={handleChange}
                            />
                        </div>
                        {error.stripeWebhookKey && <div className='error'>{error.stripeWebhookKey}</div>}
                    </div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='nodemailerService' className='label'>Email Service</label>
                            <input
                                type='text'
                                name='nodemailerService'
                                id='nodemailerService'
                                className={`input ${error.nodemailerService ? 'input-error' : ''}`}
                                value={formData.nodemailerService}
                                onChange={handleChange}
                            />
                        </div>
                        {error.nodemailerService && <div className='error'>{error.nodemailerService}</div>}
                    </div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='nodemailerSenderEmail' className='label'>Sender Email</label>
                            <input
                                type='text'
                                name='nodemailerSenderEmail'
                                id='nodemailerSenderEmail'
                                className={`input ${error.nodemailerSenderEmail ? 'input-error' : ''}`}
                                value={formData.nodemailerSenderEmail}
                                onChange={handleChange}
                            />
                        </div>
                        {error.nodemailerSenderEmail && <div className='error'>{error.nodemailerSenderEmail}</div>}
                    </div>
                    <div className='input-container'>
                        <div className='input-wrapper'>
                            <label htmlFor='nodemailerSenderPassword' className='label'>Sender Password</label>
                            <input
                                type='text'
                                name='nodemailerSenderPassword'
                                id='nodemailerSenderPassword'
                                className={`input ${error.nodemailerSenderPassword ? 'input-error' : ''}`}
                                value={formData.nodemailerSenderPassword}
                                onChange={handleChange}
                            />
                        </div>
                        {error.nodemailerSenderPassword && <div className='error'>{error.nodemailerSenderPassword}</div>}
                    </div>

                    <button className='save-btn' onClick={handleContinue}>Save</button>
                </div>
            </div>
        </div>
    )
};

export default TenantForm;