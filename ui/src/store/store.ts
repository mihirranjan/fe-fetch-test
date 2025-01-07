import { configureStore } from '@reduxjs/toolkit';
import videoContributionsReducer from './features/videoContributionsSlice';

export const store = configureStore({
  reducer: {
    videoContributions: videoContributionsReducer,
  },
});

console.log(videoContributionsReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
