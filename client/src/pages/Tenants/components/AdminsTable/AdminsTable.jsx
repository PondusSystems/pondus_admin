import { useState, useEffect } from 'react';
import './AdminsTable.css';
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { sortArray } from '../../../../utils/sortUtils';

const AdminsTable = ({ data, handleDelete }) => {
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

    return (
        <table className='admins-table'>
            <thead>
                <tr>
                    <th onClick={() => handleSort('name')}>
                        <div className='head-container'>
                            <div className='text'>Name</div>
                            {sortConfig.key === 'name' &&
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
                    <th onClick={() => handleSort('email')}>
                        <div className='head-container'>
                            <div className='text'>Email</div>
                            {sortConfig.key === 'email' &&
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
                    <th onClick={() => handleSort('number')}>
                        <div className='head-container'>
                            <div className='text'>Number</div>
                            {sortConfig.key === 'number' &&
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
                {sortedData.map((admin, index) => (
                    <tr key={index}>
                        <td>
                            <div className='text'>{admin.name}</div>
                        </td>
                        <td>
                            <div className='text'>{admin.email}</div>
                        </td>
                        <td>
                            <div className='text'>{admin.number}</div>
                        </td>
                        <td>
                            <div className='btn-container'>
                                <button className='btn delete-btn' onClick={() => handleDelete(admin)}>Delete</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table >
    )
};

export default AdminsTable;