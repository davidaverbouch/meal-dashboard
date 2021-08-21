import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  rawData: [],
};

export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export const incrementAsync = createAsyncThunk(
  'mealsList/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const MealslistContainerSlice = createSlice({
  name: 'mealsList',
  initialState,
  reducers: {
    updateData: {
      reducer(state, action) {
        const objIndex = state.rawData.findIndex(obj => obj.idMeal === action.payload.idMeal);
        state.rawData[objIndex] = action.payload;
      },
    },
    addDatas: {
      reducer(state, action) {
        state.rawData = state.rawData.concat(action.payload)
      },
    },
  },
});

export const { updateData, addDatas } = MealslistContainerSlice.actions;

export const searchResult = (state) => state.mealsList.searchResult;
export const rawResult = (state) => state.mealsList.rawData;
export const getDetail = (state, id) => state.mealsList.rawData.find(card => card.idMeal === id)

export default MealslistContainerSlice.reducer;
