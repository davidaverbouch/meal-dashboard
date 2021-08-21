import { configureStore } from '@reduxjs/toolkit';
import mealsListReducer from '../MealslistContainerSlice';

export const store = configureStore({
  reducer: {
    mealsList: mealsListReducer,
  },
});
