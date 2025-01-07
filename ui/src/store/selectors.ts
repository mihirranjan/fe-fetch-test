import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

const selectVideoState = (state: RootState) => state.videoContributions;

export const selectVideoItems = createSelector(
  [selectVideoState],
  (state) => state.items
);

export const selectVideoMetadata = createSelector(
  [selectVideoState],
  (state) => ({
    total: state.total,
    loading: state.loading,
    searchTerm: state.searchTerm
  })
);