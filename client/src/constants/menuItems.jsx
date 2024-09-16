import DashboardIcon from '../assets/icons/dashboard_icon.svg?react';
import UsersIcon from '../assets/icons/users_icon.svg?react';

export const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <DashboardIcon />, disabled: true },
    { path: '/tenants', label: 'Tenants', icon: <UsersIcon />, disabled: false },
];
