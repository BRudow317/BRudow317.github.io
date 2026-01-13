import { useLocation } from 'react-router-dom';
import { NAV_NAMES } from '../constants/ROUTES.js';

export const useNavigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const getCurrentPageName = () => {
    return NAV_NAMES.find((item) => item.path === location.pathname)?.name || 'Miller Land Management';
  };

  return {
    currentPath: location.pathname,
    isActive,
    getCurrentPageName,
    navItems: NAV_NAMES,
  };
};