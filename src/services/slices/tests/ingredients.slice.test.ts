import { TIngredient } from '@utils-types';
import ingredientsReducer, { fetchIngredients } from '../ingredients.slice';

describe('ingredients slice', () => {
  const initialState = { ingredients: [], isLoading: false, error: null };

  it('should handle pending', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.pending('')
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle fulfilled', () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Test',
        type: 'bun',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ];
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled(mockIngredients, '')
    );
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('should handle rejected', () => {
    const error = new Error('Test error');
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(error, '')
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Не удалось загрузить ингредиенты');
  });
});
