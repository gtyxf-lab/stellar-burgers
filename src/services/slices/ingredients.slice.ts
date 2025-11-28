import { getIngredientsApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TIngredient } from "@utils-types";

interface IngredientState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientState = {
  ingredients: [],
  isLoading: false,
  error: null
};

const fetchIngredients = createAsyncThunk('ingredients/fetch', async () => {
  const response = await getIngredientsApi();
  return response;
});

const ingredienSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        (state.isLoading = false),
          (state.error =
            action.error.message || 'Не удалось загрузить ингредиенты');
      });
  }
});

export default ingredienSlice.reducer;
