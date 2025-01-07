import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ContributionsState }  from '../../interfaces/Contribution'

const initialState: ContributionsState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  searchTerm: '',
};

export const fetchVideoContributions = createAsyncThunk(
  'videoContributions/fetchVideoContributions',
  async ({
    skip,
    limit,
    searchTerm,
    key,
  }: {
    skip: number;
    limit: number;
    searchTerm: string;
    key: string;
  }) => {
    const url = new URL('http://127.0.0.1:8000/contributions/');

    interface Params {
      skip: string;
      limit: string;
      [key: string]: string;
    }
    const params: Params = {
      skip: skip.toString(),
      limit: limit.toString(),
    };

    if (searchTerm) {
      params[key] = searchTerm;
    }

    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    return response.json();
  }
);


const videoContributionsSlice = createSlice({
  name: 'videoContributions',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoContributions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideoContributions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.contributions;
        state.total = action.payload.total;
      })
      .addCase(fetchVideoContributions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch contributions';
      });
  },
});

export const { setSearchTerm } = videoContributionsSlice.actions;

export default videoContributionsSlice.reducer;
