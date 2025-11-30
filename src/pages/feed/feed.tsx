import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { RefreshButton } from '@zlden/react-developer-burger-ui-components';
import { FC, useEffect } from 'react';
import { fetchFeed } from '../../services/slices/feed.slice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className='text text_type_main-large mt-30'>
        Ошибка: {error}
        <RefreshButton
          text='Обновить'
          onClick={() => dispatch(fetchFeed())}
          extraClass={'ml-30'}
        />
      </div>
    );
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
  );
};
