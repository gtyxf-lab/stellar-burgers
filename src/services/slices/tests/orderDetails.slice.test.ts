import { TOrder } from '@utils-types';
import orderDetailsReducer, { createOrder } from '../orderDetails.slice';

describe('orderDetails slice', () => {
  const mockOrder: TOrder = {
    _id: 'order1',
    status: 'done',
    name: 'Test Order',
    createdAt: '2025-01-01T12:00:00.000Z',
    updatedAt: '2025-01-01T12:10:00.000Z',
    number: 12345,
    ingredients: ['bun1', 'main1']
  };

  const initialState = {
    order: null,
    orderRequest: false,
    orderError: null
  };

  it('should handle pending', () => {
    const action = createOrder.pending('', ['bun1', 'main1']);
    const state = orderDetailsReducer(initialState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.orderError).toBe(null);
  });

  it('should handle fulfilled', () => {
    const payload = { order: mockOrder };
    const action = createOrder.fulfilled(payload, '', ['bun1', 'main1']);
    const state = orderDetailsReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.order).toEqual(mockOrder);
  });

  it('should handle rejected', () => {
    const errorMessage = 'Failed';
    const action = createOrder.rejected(new Error(errorMessage), '', ['bun1']);
    const state = orderDetailsReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderError).toBe(errorMessage);
  });
});
