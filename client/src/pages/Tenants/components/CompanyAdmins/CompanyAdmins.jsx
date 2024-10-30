import './CompanyAdmins.css';
import { Empty } from 'antd';
import AdminsTable from '../AdminsTable/AdminsTable';

const CompanyAdmins = ({ admins, handleDelete }) => {
    return (
        <div className='company-admins'>
            <div className='main-content'>
                <div className='title'>Admins</div>
                {(admins && admins.length > 0) ?
                    <AdminsTable data={admins} handleDelete={handleDelete} />
                    :
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                }
            </div>
        </div>
    )
};

export default CompanyAdmins;