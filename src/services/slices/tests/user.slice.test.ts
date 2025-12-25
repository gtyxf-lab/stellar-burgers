import userReducer, {
  getUser,
  loginUser,
  logoutUser,
  registerUser
} from '../user.slice';

describe('user slice', () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
    isLoading: false,
    error: null
  };

  const mockUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  const mockAuthResponse = {
    success: true,
    user: mockUser,
    accessToken: 'fakeAccessToken',
    refreshToken: 'fakeRefreshToken'
  };

  const mockLogoutResponse = {
    success: true,
    message: 'Successful logout'
  };

  it('should handle getUser fulfilled', () => {
    const payload = { success: true, user: mockUser };
    const action = getUser.fulfilled(payload, '');
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('should handle getUser rejected', () => {
    const action = getUser.rejected(null, '');
    const state = userReducer(initialState, action);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toBe(null);
  });

  it('should handle login fulfilled', () => {
    const action = loginUser.fulfilled(mockAuthResponse, '', {
      email: 'test@example.com',
      password: '123'
    });
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
  });

  it('should handle register fulfilled', () => {
    const action = registerUser.fulfilled(mockAuthResponse, '', {
      email: 'test@example.com',
      password: '123',
      name: 'Test User'
    });
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
  });

  it('should handle logout fulfilled', () => {
    const filledState = { ...initialState, user: mockUser };
    const action = logoutUser.fulfilled(mockLogoutResponse, '');
    const state = userReducer(filledState, action);
    expect(state.user).toBe(null);
    expect(state.isLoading).toBe(false);
  });
});
