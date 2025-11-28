import { useDispatch, useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { FC, useEffect } from 'react';
import { BurgerConstructor, BurgerIngredients } from '../../components';
import { Preloader } from '../../components/ui';
import { fetchIngredients } from '../../services/slices/ingredients.slice';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();
  const { ingredients, isLoading, error } = useSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    if (ingredients.length === 0 && !isLoading && !error) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length, isLoading, error]);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : error ? (
        <p className='text text_type_main-large text_color_error mt-30'>
          Ошибка загрузки: {error}
        </p>
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
