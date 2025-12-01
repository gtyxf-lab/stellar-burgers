// src/utils/burger-api.ts
import { TIngredient, TOrder, TUser } from '@utils-types';
import { getCookie, setCookie } from './cookie';

export const BASE_URL = process.env.BURGER_API_URL!;

// Универсальные проверки
const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

const checkSuccess = <T>(res: T): T => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((res as any).success) return res;
  throw new Error(`Server error: ${(res as any).message || 'Unknown error'}`);
};

// Главная универсальная функция — без ошибок TS и ESLint
const request = <T>(endpoint: string, options?: RequestInit): Promise<T> =>
  fetch(`${BASE_URL}/${endpoint}`, options)
    .then(checkResponse<T>)
    .then(checkSuccess<T>);

// === Обновление токена ===
type TRefreshResponse = {
  success: boolean;
  refreshToken: string;
  accessToken: string;
};

export const refreshToken = (): Promise<TRefreshResponse> =>
  request<TRefreshResponse>('auth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
  }).then((data) => {
    localStorage.setItem('refreshToken', data.refreshToken);
    setCookie('accessToken', data.accessToken);
    return data;
  });

// === fetchWithRefresh ===
export const fetchWithRefresh = async <T>(
  endpoint: string,
  options: RequestInit
): Promise<T> => {
  try {
    return await request<T>(endpoint, options);
  } catch (err: any) {
    if (err.message?.includes('jwt expired') || err.message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (options.headers) {
        (options.headers as { [key: string]: string }).authorization =
          refreshData.accessToken;
      }
      return await request<T>(endpoint, options);
    }
    throw err;
  }
};

// === Все API-функции ===
export const getIngredientsApi = async (): Promise<TIngredient[]> =>
  request<{ data: TIngredient[] }>('ingredients').then((res) => res.data);

export const getFeedsApi = async () =>
  request<{ orders: TOrder[]; total: number; totalToday: number }>(
    'orders/all'
  );

export const getOrdersApi = async (): Promise<TOrder[]> =>
  fetchWithRefresh<{ orders: TOrder[] }>('orders', {
    headers: {
      authorization: getCookie('accessToken')!
    }
  }).then((res) => res.orders);

export const orderBurgerApi = async (ingredients: string[]) =>
  fetchWithRefresh<{ order: TOrder }>('orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')!
    },
    body: JSON.stringify({ ingredients })
  });

export const getOrderByNumberApi = async (number: number): Promise<TOrder> =>
  request<{ orders: TOrder[] }>(`orders/${number}`).then((res) => {
    if (!res.orders || res.orders.length === 0) {
      throw new Error('Заказ не найден');
    }
    return res.orders[0];
  });

// === Авторизация ===
export type TRegisterData = { email: string; name: string; password: string };
export type TLoginData = { email: string; password: string };
export type TAuthResponse = {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export const registerUserApi = async (data: TRegisterData) =>
  request<TAuthResponse>('auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });

export const loginUserApi = async (data: TLoginData) => {
  const res = await request<TAuthResponse>('auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });
  localStorage.setItem('refreshToken', res.refreshToken);
  setCookie('accessToken', res.accessToken);
  return res;
};

export const logoutApi = async () =>
  request<{ success: boolean; message: string }>('auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
  });

export const getUserApi = async () =>
  fetchWithRefresh<{ user: TUser }>('auth/user', {
    headers: { authorization: getCookie('accessToken')! }
  });

export const updateUserApi = async (data: Partial<TRegisterData>) =>
  fetchWithRefresh<{ user: TUser }>('auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')!
    },
    body: JSON.stringify(data)
  });

export const forgotPasswordApi = async (data: { email: string }) =>
  request<{ success: boolean; message: string }>('password-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });

export const resetPasswordApi = async (data: {
  password: string;
  token: string;
}) =>
  request<{ success: boolean; message: string }>('password-reset/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });
