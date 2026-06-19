import { TOrder } from '@utils-types';
import feedReducer, { fetchFeed } from '../feed.slice';

describe('feed slice', () => {
  const mockOrder: TOrder = {
    _id: '1',
    status: 'done',
    name: 'Test Burger',
    createdAt: '2025-01-01T12:00:00.000Z',
    updatedAt: '2025-01-01T12:05:00.000Z',
    number: 12345,
    ingredients: ['bun1', 'main1']
  };

  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };

  it('should handle pending', () => {
    const state = feedReducer(initialState, fetchFeed.pending(''));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle fulfilled', () => {
    const payload = {
      orders: [mockOrder],
      total: 1000,
      totalToday: 50
    };
    const state = feedReducer(initialState, fetchFeed.fulfilled(payload, ''));
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual([mockOrder]);
    expect(state.total).toBe(1000);
    expect(state.totalToday).toBe(50);
  });

  it('should handle rejected', () => {
    const errorMessage = 'Network error';
    const error = new Error(errorMessage);
    const state = feedReducer(initialState, fetchFeed.rejected(error, ''));
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
