import { TOrder } from '@utils-types';
import userOrdersReducer, { fetchOrders } from '../userOrders.slice';

describe('userOrders slice', () => {
  const mockOrder: TOrder = {
    _id: '1',
    status: 'done',
    name: 'Personal Order',
    createdAt: '2025-01-01T12:00:00.000Z',
    updatedAt: '2025-01-01T12:05:00.000Z',
    number: 999,
    ingredients: ['bun1', 'sauce1']
  };

  const initialState = {
    orders: [],
    isLoading: false,
    error: null
  };

  it('should handle pending', () => {
    const state = userOrdersReducer(initialState, fetchOrders.pending(''));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle fulfilled', () => {
    const payload = [mockOrder];
    const state = userOrdersReducer(
      initialState,
      fetchOrders.fulfilled(payload, '')
    );
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual([mockOrder]);
  });

  it('should handle rejected', () => {
    const error = new Error('Auth error');
    const state = userOrdersReducer(
      initialState,
      fetchOrders.rejected(error, '')
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки истории заказов');
  });
});
