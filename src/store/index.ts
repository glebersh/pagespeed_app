import { configureStore } from "@reduxjs/toolkit";
import resultReducer from './slices/resultSlice';

const store = configureStore({
  reducer: {
    resultReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;