import Cookies from 'js-cookie';

const isAuthenticated = () => {
    const token = Cookies.get('pondus-admin-jwt-token');
    return !!token;
};

export { isAuthenticated };