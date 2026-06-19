import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import constructorReducer from './slices/constructor.slice';
import feedReducer from './slices/feed.slice';
import ingredientsReducer from './slices/ingredients.slice';
import orderDetailsReducer from './slices/orderDetails.slice';
import userReducer from './slices/user.slice';
import userOrdersReducer from './slices/userOrders.slice';

// Экспортируем сам редьюсер (комбайн всех слайсов)
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  orderDetails: orderDetailsReducer,
  userOrders: userOrdersReducer,
  user: userReducer,
  feed: feedReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
