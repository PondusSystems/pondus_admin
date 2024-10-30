import { useState, useEffect } from 'react';
import './Tenants.css';
import { IoSearch } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { message, Empty } from 'antd';
import { ShowLoading, HideLoading } from '../../redux/loaderSlice';
import TenantsTable from './components/TenantsTable/TenantsTable';
import PaginationHandler from '../../components/PaginationHandler/PaginationHandler';
import CustomModal from '../../components/CustomModal/CustomModal';
import TenantForm from '../../components/TenantForm/TenantForm';
import CompanyInfoForm from './components/CompanyInfoForm/CompanyInfoForm';
import CompanyAdmins from './components/CompanyAdmins/CompanyAdmins';
import AdminForm from './components/AdminForm/AdminForm';
import tenantService from '../../services/tenantService';

const Tenants = () => {
    const [pageIndex, setPageIndex] = useState(1);
    const [data, setData] = useState([]);
    const [companyInfo, setCompanyInfo] = useState(null);
    const [companyAdmins, setCompanyAdmins] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [actionType, setActionType] = useState(null);
    const [editTenant, setEditTenant] = useState(null);
    const [manageTenant, setManageTenant] = useState(null);
    const [paginationConfig, setPaginationConfig] = useState({
        count: 0,
        totalCount: 0,
        totalPages: 0
    });
    const [searchQuery, setSearchQuery] = useState("");
    const limit = 10;
    const dispatch = useDispatch();

    const fetchTenants = async () => {
        dispatch(ShowLoading());
        try {
            const query = {
                pageIndex,
                limit,
                searchQuery,
            }
            const response = await tenantService.searchTenants(query);
            if (response.result) {
                setData(response.result.tenants);
                setPaginationConfig({
                    count: response.result.tenants.length,
                    totalCount: response.result.totalCount,
                    totalPages: response.result.totalPages
                });
            }
        } catch (error) {
            message.error(error.response.data.error);
            setData([]);
            setPaginationConfig({
                count: 0,
                totalCount: 0,
                totalPages: 0
            });
        } finally {
            dispatch(HideLoading());
        }
    };

    useEffect(() => {
        fetchTenants();
    }, [pageIndex]);

    const handleSearch = () => {
        if (pageIndex !== 1) {
            setPageIndex(1);
        }
        else {
            fetchTenants();
        }
    };

    const handleAdd = () => {
        setActionType("add");
        setEditTenant(null);
        setIsOpen(true);
    };

    const onRequestClose = () => {
        setIsOpen(false);
    };

    const onRequestClose2 = () => {
        setIsOpen2(false);
    };

    const handleEdit = (tenant) => {
        setActionType("edit");
        setEditTenant(tenant);
        setIsOpen(true);
    };

    const handleDelete = async (tenant) => {
        const isConfirm = window.confirm('Are you sure?');
        if (!isConfirm) {
            return;
        }
        console.log('Deleting');
        dispatch(ShowLoading());
        try {
            const response = await tenantService.deleteTenant(tenant.tenantId);
            message.success(response.message);
            await fetchTenants();
        } catch (error) {
            message.error(error.response.data.error);
        } finally {
            dispatch(HideLoading());
        }
    };

    const handleUpdateAccess = async (tenant) => {
        dispatch(ShowLoading());
        const status = tenant.status === 'enabled' ? 'disabled' : 'enabled';
        try {
            const response = await tenantService.updateTenantAccess(tenant.tenantId, { status });
            message.success(response.message);
            await fetchTenants();
        } catch (error) {
            message.error(error.response.data.error);
        } finally {
            dispatch(HideLoading());
        }
    };

    const handleSave = async (tenant) => {
        console.log('Save Tenant: ', tenant);
        dispatch(ShowLoading());
        try {
            let response;
            if (actionType === "add") {
                response = await tenantService.createTenant(tenant);
            }
            else {
                response = await tenantService.updateTenant(editTenant.tenantId, tenant);
            }
            message.success(response.message);
            onRequestClose();
            await fetchTenants();
        } catch (error) {
            message.error(error.response.data.error);
        } finally {
            dispatch(HideLoading());
        }
    };

    const handlePageChange = (page) => {
        setPageIndex(page);
    };

    const handleManage = async (tenant) => {
        setManageTenant(tenant);
        dispatch(ShowLoading());
        try {
            const [companyInfoResponse, companyAdminsResponse] = await Promise.all([
                tenantService.getCompanyInfo(tenant.tenantId),
                tenantService.getAllCompanyAdmins(tenant.tenantId)
            ]);
            setCompanyInfo(companyInfoResponse.companyInfo);
            setCompanyAdmins(companyAdminsResponse.admins || []);
            setIsOpen2(true);
        } catch (error) {
            console.log('Error: ', error);
            message.error(error.response.data.error);
        } finally {
            dispatch(HideLoading());
        }
    };

    const handleUpdateCompanyInfo = async (companyInfo) => {
        dispatch(ShowLoading());
        try {
            const response = await tenantService.updateCompanyInfo(manageTenant.tenantId, companyInfo);
            message.success(response.message);
            await handleManage(manageTenant);
        } catch (error) {
            message.error(error.response.data.error);
        } finally {
            dispatch(HideLoading());
        }
    };

    const handleAddCompanyAdmin = async (adminData) => {
        dispatch(ShowLoading());
        try {
            const response = await tenantService.addCompanyAdmin(manageTenant.tenantId, adminData);
            message.success(response.message);
            await handleManage(manageTenant);
        } catch (error) {
            message.error(error.response.data.error);
            throw error;
        } finally {
            dispatch(HideLoading());
        }
    };

    const handleDeleteCompanyAdmin = async (admin) => {
        const confirm = window.confirm('Are you sure?');
        if (!confirm) {
            return;
        }
        dispatch(ShowLoading());
        try {
            const response = await tenantService.deleteCompanyAdmin(manageTenant.tenantId, admin._id);
            message.success(response.message);
            await handleManage(manageTenant);
        } catch (error) {
            message.error(error.response.data.error);
        } finally {
            dispatch(HideLoading());
        }
    };

    return (
        <div className='tenants'>
            <div className='top-bar'>
                <div className='title'>Tenants</div>
                <div className='btn-container'>
                    <input type='text' className='search-btn' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <IoSearch size={30} className='search-icon' onClick={handleSearch} />
                    <button className='create-btn' onClick={handleAdd}>Create tenant</button>
                </div>
            </div>
            {(data && data.length > 0) ?
                <div>
                    <TenantsTable data={data} handleEdit={handleEdit} handleDelete={handleDelete} handleUpdateAccess={handleUpdateAccess} handleManage={handleManage} />
                    <PaginationHandler count={paginationConfig.count} totalCount={paginationConfig.totalCount} pageIndex={pageIndex} totalPages={paginationConfig.totalPages} handlePageChange={handlePageChange} />
                </div>
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
            <CustomModal isOpen={isOpen} onRequestClose={onRequestClose} width='70%' contentLabel={"Add/Edit Tenant Form"}>
                <TenantForm tenant={editTenant} actionType={actionType} handleSave={handleSave} />
            </CustomModal>
            <CustomModal isOpen={isOpen2} onRequestClose={onRequestClose2} width='70%' contentLabel={"Manage Tenant Form"}>
                <CompanyInfoForm companyInfo={companyInfo} handleSave={handleUpdateCompanyInfo} />
                <CompanyAdmins admins={companyAdmins} handleDelete={handleDeleteCompanyAdmin} />
                <AdminForm handleSave={handleAddCompanyAdmin} />
            </CustomModal>
        </div>
    )
};

export default Tenants;