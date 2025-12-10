import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { IngredientDetails } from '../../components';
import { Preloader } from '../../components/ui/preloader';
import { useSelector } from '../../services/store';
import styles from './ingredient-details-page.module.css';

export const IngredientDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { ingredients, isLoading } = useSelector((state) => state.ingredients);
  const ingredient = ingredients.find((ing) => ing._id === id);

  if (isLoading) return <Preloader />;
  if (!ingredient) {
    return <p className='text text_type_main-large'>Ингредиент не найден</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className='text text_type_main-large'>Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  );
};
