import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie } from '../../utils/cookie';

interface UserState {
  user: {
    email: string;
    name: string;
  } | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => loginUserApi(data)
);

export const logoutUser = createAsyncThunk('user/logout', async () =>
  logoutApi()
);

export const getUser = createAsyncThunk('user/get', async () => getUserApi());

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка входа';
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthChecked = true;
        state.user = null;
        state.error = 'Не авторизован';
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  }
});

export const { authChecked } = userSlice.actions;
export default userSlice.reducer;
