import { useState, useEffect } from 'react';
import './TenantsTable.css';
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { sortArray } from '../../../../utils/sortUtils';

const TenantsTable = ({ data, handleEdit, handleDelete }) => {
    const [sortedData, setSortedData] = useState([]);
    const [sortConfig, setSortConfig] = useState({
        key: '',
        direction: ''
    });

    useEffect(() => {
        setSortedData(data);
    }, [data]);

    const handleSort = (key) => {
        const newArr = [...sortedData];
        let direction;
        if (sortConfig.key != key) {
            direction = 'desc';
        }
        else if (sortConfig.direction === 'desc') {
            direction = 'asc'
        }
        else {
            setSortConfig({
                key: '',
                direction: ''
            });
            setSortedData(data);
            return;
        }
        sortArray(newArr, key, direction);
        setSortedData(newArr);
        setSortConfig({
            key,
            direction
        });
    };

    const getLabelClassName = (status) => {
        if (status === 'enabled') {
            return 'green-label'
        }
        else if (status === 'disabled') {
            return 'red-label'
        }
        else {
            return '';
        }
    };

    return (
        <table className='tenants-table'>
            <thead>
                <tr>
                    <th onClick={() => handleSort('companyName')}>
                        <div className='head-container'>
                            <div className='text'>Company Name</div>
                            {sortConfig.key === 'companyName' &&
                                <>
                                    {sortConfig.direction === 'desc' ?
                                        < FaCaretDown className='icon' />
                                        :
                                        <FaCaretUp className='icon' />
                                    }
                                </>
                            }
                        </div>
                    </th>
                    <th onClick={() => handleSort('config.host')}>
                        <div className='head-container'>
                            <div className='text'>Host</div>
                            {sortConfig.key === 'config.host' &&
                                <>
                                    {sortConfig.direction === 'desc' ?
                                        < FaCaretDown className='icon' />
                                        :
                                        <FaCaretUp className='icon' />
                                    }
                                </>
                            }
                        </div>
                    </th>
                    <th onClick={() => handleSort('status')}>
                        <div className='head-container'>
                            <div className='text'>Status</div>
                            {sortConfig.key === 'status' &&
                                <>
                                    {sortConfig.direction === 'desc' ?
                                        < FaCaretDown className='icon' />
                                        :
                                        <FaCaretUp className='icon' />
                                    }
                                </>
                            }
                        </div>
                    </th>
                    <th>
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedData.map((tenant, index) => (
                    <tr key={index}>
                        <td>
                            <div className='text'>{tenant.companyName}</div>
                        </td>
                        <td>
                            <div className='text'>{tenant.config.host}</div>
                        </td>
                        <td>
                            <div className='label-container'>
                                <div className={`text label ${getLabelClassName(tenant.status)}`}>{tenant.status}</div>
                            </div>
                        </td>
                        <td>
                            <div className='btn-container'>
                                <button className='btn edit-btn' onClick={() => handleEdit(tenant)}>Edit</button>
                                <button className='btn delete-btn' onClick={() => handleDelete(tenant)}>Delete</button>
                                <button className={`btn ${tenant.status !== 'enabled' ? 'green-access-btn' : 'red-access-btn' }`} onClick={() => handleDelete(tenant)}>{tenant.status === 'enabled' ? 'Revoke Access' : 'Grant Access'}</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table >
    )
};

export default TenantsTable;