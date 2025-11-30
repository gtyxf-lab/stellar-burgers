import { ProfileMenuUI } from '@ui';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteCookie } from '../../utils/cookie';
import { logoutUser } from '../../services/slices/user.slice';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Ошибка при выходе:', error);

      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      navigate('/login');
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
