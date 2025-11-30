import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { fetchOrders } from '../../services/slices/userOrders.slice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const orders = useSelector((state) => state.userOrders.orders);
  const isLoading = useSelector((state) => state.userOrders.isLoading);
  const error = useSelector((state) => state.userOrders.error);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (isLoading) return <Preloader />;
  if (error)
    return (
      <div className='text text_type_main-large mt-30'>Ошибка: {error}</div>
    );

  return <ProfileOrdersUI orders={orders} />;
};
