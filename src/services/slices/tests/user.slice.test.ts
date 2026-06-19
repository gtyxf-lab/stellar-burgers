import userReducer, {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
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

  // ===== getUser =====
  it('should handle getUser pending', () => {
    const state = userReducer(initialState, getUser.pending('', undefined));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle getUser fulfilled', () => {
    const payload = { success: true, user: mockUser };
    const action = getUser.fulfilled(payload, '', undefined);
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('should handle getUser rejected', () => {
    const action = getUser.rejected(new Error('Error'), '', undefined);
    const state = userReducer(initialState, action);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toBe(null);
    expect(state.isLoading).toBe(false);
  });

  // ===== registerUser =====
  it('should handle registerUser pending', () => {
    const state = userReducer(
      initialState,
      registerUser.pending('', {
        email: 'test@example.com',
        password: '123',
        name: 'Test User'
      })
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle registerUser fulfilled', () => {
    const action = registerUser.fulfilled(mockAuthResponse, '', {
      email: 'test@example.com',
      password: '123',
      name: 'Test User'
    });
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
  });

  it('should handle registerUser rejected', () => {
    const errorMessage = 'Registration failed';
    const action = registerUser.rejected(new Error(errorMessage), '', {
      email: 'test@example.com',
      password: '123',
      name: 'Test User'
    });
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  // ===== loginUser =====
  it('should handle loginUser pending', () => {
    const state = userReducer(
      initialState,
      loginUser.pending('', {
        email: 'test@example.com',
        password: '123'
      })
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle loginUser fulfilled', () => {
    const action = loginUser.fulfilled(mockAuthResponse, '', {
      email: 'test@example.com',
      password: '123'
    });
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
  });

  it('should handle loginUser rejected', () => {
    const errorMessage = 'Login failed';
    const action = loginUser.rejected(new Error(errorMessage), '', {
      email: 'test@example.com',
      password: 'wrong'
    });
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  // ===== logoutUser =====
  it('should handle logoutUser pending', () => {
    const state = userReducer(initialState, logoutUser.pending('', undefined));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle logoutUser fulfilled', () => {
    const filledState = { ...initialState, user: mockUser };
    const action = logoutUser.fulfilled(mockLogoutResponse, '', undefined);
    const state = userReducer(filledState, action);
    expect(state.user).toBe(null);
    expect(state.isLoading).toBe(false);
  });

  it('should handle logoutUser rejected', () => {
    const errorMessage = 'Logout failed';
    const action = logoutUser.rejected(new Error(errorMessage), '', undefined);
    const state = userReducer(initialState, action);
    expect(state.user).toBe(null);
    expect(state.isLoading).toBe(false);
  });

  // ===== updateUser =====
  it('should handle updateUser pending', () => {
    const state = userReducer(
      initialState,
      updateUser.pending('', { name: 'New Name' })
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle updateUser fulfilled', () => {
    const payload = { user: mockUser };
    const action = updateUser.fulfilled(payload, '', { name: 'New Name' });
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
  });

  it('should handle updateUser rejected', () => {
    const errorMessage = 'Update failed';
    const action = updateUser.rejected(new Error(errorMessage), '', {
      name: 'New Name'
    });
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
