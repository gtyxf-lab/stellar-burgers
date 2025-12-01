import { getOrderByNumberApi } from '@api';
import { TIngredient, TOrder } from '@utils-types';
import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderInfoUI } from '../../components/ui/order-info';
import { Preloader } from '../../components/ui/preloader';
import { useSelector } from '../../services/store';
import styles from './profile-order-details-page.module.css';

export const ProfileOrderDetailsPage: FC = () => {
  const { number } = useParams<{ number: string }>();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const [order, setOrder] = useState<TOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const orderNumber = parseInt(number || '0');
    if (orderNumber) {
      getOrderByNumberApi(orderNumber)
        .then((response) => {
          setOrder(response);
          setIsLoading(false);
        })
        .catch((err) => {
          setError('Ошибка загрузки заказа');
          setIsLoading(false);
        });
    } else {
      setError('Неверный номер заказа');
      setIsLoading(false);
    }
  }, [number]);

  const orderInfo = useMemo(() => {
    if (!order || !ingredients.length) return null;
    const date = new Date(order.createdAt);
    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };
    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredientsWithCount, item: string) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );
    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    return {
      ...order,
      ingredientsInfo,
      date,
      total
    };
  }, [order, ingredients]);

  if (isLoading) return <Preloader />;
  if (error || !orderInfo) {
    return (
      <p className='text text_type_main-large'>{error || 'Заказ не найден'}</p>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className='text text_type_digits-default mb-10'>
        #{orderInfo.number}
      </h1>
      <OrderInfoUI orderInfo={orderInfo} />
    </div>
  );
};
