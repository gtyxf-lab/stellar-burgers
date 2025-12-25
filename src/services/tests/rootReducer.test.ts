import { rootReducer } from '../store';

describe('rootReducer', () => {
  it('should return initial state for unknown action', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      ingredients: { ingredients: [], isLoading: false, error: null },
      burgerConstructor: { bun: null, ingredients: [] },
      orderDetails: { order: null, orderRequest: false, orderError: null },
      userOrders: { orders: [], isLoading: false, error: null },
      user: { user: null, isAuthChecked: false, isLoading: false, error: null },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      }
    });
  });
});
