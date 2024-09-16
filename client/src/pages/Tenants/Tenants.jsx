import { useState, useEffect } from 'react';
import './Tenants.css';
import { IoSearch } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { message, Empty } from 'antd';
import { ShowLoading, HideLoading } from '../../redux/loaderSlice';
import TenantsTable from './components/TenantsTable/TenantsTable';
import PaginationHandler from '../../components/PaginationHandler/PaginationHandler';
import CustomModal from '../../components/CustomModal/CustomModal';
import UserForm from '../../components/TenantForm/TenantForm';
import tenantService from '../../services/tenantService';

const Tenants = () => {
    // const newData = [
    //     {
    //         companyName: 'Martha Steward',
    //         tenantId: 'marthastew@mail.com',
    //         config: {
    //             host: "localhost1",
    //             dbURI: "mongodb+srv://shoaibfarooka:Welcome5home.@cluster0.hrpczac.mongodb.net/Pondus?retryWrites=true&w=majority",
    //             stripe: {
    //                 apiKey: "sk_test_51PhsS1L3hPHcFVDkxw05fkgpVxZjqKMPKxm3ZzfzJmKMWBibxuhaF7yrCT8SxljF7FcFbYOCXoVWOPYydlUMfXNw0011JFxYBU",
    //                 webhookKey: "whsec_sLPa1EhUAnSjBJfQMPBD9pZ9WaHAn8Mn"
    //             },
    //             nodemailer: {
    //                 service: "Gmail",
    //                 senderEmail: "test@gmail.com",
    //                 senderPassword: "geyeifgiiuhepabj"
    //             }
    //         }
    //         ,
    //         status: 'enabled',
    //         createdAt: "2024-08-15T12:22:28.109+00:00",
    //         updatedAt: "2024-09-15T09:16:32.109+00:00",
    //     },
    //     {
    //         companyName: 'Tony Stark',
    //         tenantId: 'tonystark@mail.com',
    //         config: {
    //             host: "localhost2",
    //             dbURI: "mongodb+srv://shoaibfarooka:Welcome5home.@cluster0.hrpczac.mongodb.net/Pondus?retryWrites=true&w=majority",
    //             stripe: {
    //                 apiKey: "sk_test_51PhsS1L3hPHcFVDkxw05fkgpVxZjqKMPKxm3ZzfzJmKMWBibxuhaF7yrCT8SxljF7FcFbYOCXoVWOPYydlUMfXNw0011JFxYBU",
    //                 webhookKey: "whsec_sLPa1EhUAnSjBJfQMPBD9pZ9WaHAn8Mn"
    //             },
    //             nodemailer: {
    //                 service: "Gmail",
    //                 senderEmail: "test@gmail.com",
    //                 senderPassword: "geyeifgiiuhepabj"
    //             }
    //         }
    //         ,
    //         status: 'enabled',
    //         createdAt: "2024-08-15T12:22:28.109+00:00",
    //         updatedAt: "2024-09-15T09:16:32.109+00:00",
    //     },
    //     {
    //         companyName: 'Steve Rogers',
    //         tenantId: 'steverogers@mail.com',
    //         config: {
    //             host: "localhost",
    //             dbURI: "mongodb+srv://shoaibfarooka:Welcome5home.@cluster0.hrpczac.mongodb.net/Pondus?retryWrites=true&w=majority",
    //             stripe: {
    //                 apiKey: "sk_test_51PhsS1L3hPHcFVDkxw05fkgpVxZjqKMPKxm3ZzfzJmKMWBibxuhaF7yrCT8SxljF7FcFbYOCXoVWOPYydlUMfXNw0011JFxYBU",
    //                 webhookKey: "whsec_sLPa1EhUAnSjBJfQMPBD9pZ9WaHAn8Mn"
    //             },
    //             nodemailer: {
    //                 service: "Gmail",
    //                 senderEmail: "test@gmail.com",
    //                 senderPassword: "geyeifgiiuhepabj"
    //             }
    //         }
    //         ,
    //         status: 'disabled',
    //         createdAt: "2024-08-15T12:22:28.109+00:00",
    //         updatedAt: "2024-09-15T09:16:32.109+00:00",
    //     },
    //     {
    //         companyName: 'Bruce Banner',
    //         tenantId: 'brucebanner@mail.com',
    //         config: {
    //             host: "localhost4",
    //             dbURI: "mongodb+srv://shoaibfarooka:Welcome5home.@cluster0.hrpczac.mongodb.net/Pondus?retryWrites=true&w=majority",
    //             stripe: {
    //                 apiKey: "sk_test_51PhsS1L3hPHcFVDkxw05fkgpVxZjqKMPKxm3ZzfzJmKMWBibxuhaF7yrCT8SxljF7FcFbYOCXoVWOPYydlUMfXNw0011JFxYBU",
    //                 webhookKey: "whsec_sLPa1EhUAnSjBJfQMPBD9pZ9WaHAn8Mn"
    //             },
    //             nodemailer: {
    //                 service: "Gmail",
    //                 senderEmail: "test@gmail.com",
    //                 senderPassword: "geyeifgiiuhepabj"
    //             }
    //         }
    //         ,
    //         status: '',
    //         createdAt: "2024-08-15T12:22:28.109+00:00",
    //         updatedAt: "2024-09-15T09:16:32.109+00:00",
    //     }
    // ];
    const [pageIndex, setPageIndex] = useState(1);
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [actionType, setActionType] = useState(null);
    const [editTenant, setEditTenant] = useState(null);
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
            const response = await userService.deleteUser(tenant._id);
            message.success(response.message);
            await fetchMembers();
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
                response = await userService.createUser(tenant);
            }
            else {
                if (!payload.password) {
                    delete payload.password;
                }
                response = await userService.updateUser(editTenant._id, tenant);
            }
            message.success(response.message);
            onRequestClose();
            await fetchMembers();
        } catch (error) {
            message.error(error.response.data.error);

        } finally {
            dispatch(HideLoading());
        }
    };

    const handlePageChange = (page) => {
        setPageIndex(page);
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
                    <TenantsTable data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
                    <PaginationHandler count={paginationConfig.count} totalCount={paginationConfig.totalCount} pageIndex={pageIndex} totalPages={paginationConfig.totalPages} handlePageChange={handlePageChange} />
                </div>
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
            <CustomModal isOpen={isOpen} onRequestClose={onRequestClose} width='70%' contentLabel={"Add/Edit Tenant Form"}>
                <UserForm tenant={editTenant} actionType={actionType} handleSave={handleSave} />
            </CustomModal>
        </div>
    )
};

export default Tenants;