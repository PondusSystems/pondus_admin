import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import Cookies from 'js-cookie';
import { setLoggedOut } from '../../redux/logoutSlice';
import { clearUser } from '../../redux/userSlice';
import userService from '../../services/userService';

const Home = () => {
    const dispatch = useDispatch();
    const handleLogout = async () => {
        dispatch(ShowLoading());
        try {
            await userService.logoutUser({});
            Cookies.remove('pondus-admin-jwt-token');
            dispatch(setLoggedOut());
            dispatch(clearUser());
        } catch (error) {
            message.error(error.response.data);
        }
        dispatch(HideLoading());
    };

    return (
        <div className="home">
            <div>
                Home Page
            </div>
            <button onClick={handleLogout} className='inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'>Logout</button>
        </div>
    )
};

export default Home;