import { OrdersList } from '@components';
import { Preloader } from '@ui';
import { FC, useEffect } from 'react';
import { fetchOrders } from '../../services/slices/userOrders.slice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.userOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (isLoading) return <Preloader />;
  if (error) {
    return <p className='text text_type_main-large mt-30'>Ошибка: {error}</p>;
  }

  return <OrdersList orders={orders.reverse()} />;
};
