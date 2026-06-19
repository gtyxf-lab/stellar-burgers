import { TConstructorIngredient, TIngredient } from '@utils-types';
import constructorReducer, {
  addIngredient,
  moveIngredient,
  removeIngredient
} from '../constructor.slice';

describe('burgerConstructor slice', () => {
  const initialState = { bun: null, ingredients: [] };

  it('should add bun', () => {
    const bun: TIngredient = {
      _id: '1',
      name: 'Bun',
      type: 'bun',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 100,
      image: '',
      image_large: '',
      image_mobile: ''
    };
    const state = constructorReducer(initialState, addIngredient(bun));
    expect(state.bun).toEqual(expect.objectContaining({ ...bun }));
  });

  it('should add ingredient', () => {
    const ingredient: TIngredient = {
      _id: '2',
      name: 'Main',
      type: 'main',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 200,
      image: '',
      image_large: '',
      image_mobile: ''
    };
    const state = constructorReducer(initialState, addIngredient(ingredient));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(
      expect.objectContaining({ ...ingredient })
    );
  });

  it('should remove ingredient', () => {
    const ingredient: TConstructorIngredient = {
      id: 'test-id',
      _id: '2',
      name: 'Main',
      type: 'main',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 200,
      image: '',
      image_large: '',
      image_mobile: ''
    };
    const stateWithItem = { ...initialState, ingredients: [ingredient] };
    const state = constructorReducer(
      stateWithItem,
      removeIngredient('test-id')
    );
    expect(state.ingredients).toHaveLength(0);
  });

  it('should move ingredient up', () => {
    const ingredients: TConstructorIngredient[] = [
      {
        id: '1',
        _id: 'a',
        name: 'A',
        type: 'main',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        id: '2',
        _id: 'b',
        name: 'B',
        type: 'main',
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
    const state = { ...initialState, ingredients };
    const newState = constructorReducer(
      state,
      moveIngredient({ index: 1, direction: 'up' })
    );
    expect(newState.ingredients[0].id).toBe('2');
    expect(newState.ingredients[1].id).toBe('1');
  });

  it('should move ingredient down', () => {
    const ingredients: TConstructorIngredient[] = [
      {
        id: '1',
        _id: 'a',
        name: 'A',
        type: 'main',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        id: '2',
        _id: 'b',
        name: 'B',
        type: 'main',
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
    const state = { ...initialState, ingredients };
    const newState = constructorReducer(
      state,
      moveIngredient({ index: 0, direction: 'down' })
    );
    expect(newState.ingredients[0].id).toBe('2');
    expect(newState.ingredients[1].id).toBe('1');
  });
});
