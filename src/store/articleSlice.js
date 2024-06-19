import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ page, category }) => {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        apiKey: '7e51fc7c91f948fe877ee818a0c9db9b',
        page: page,
        category: category,
        country: 'us' // Adding a default country parameter
      },
    });
    return response.data.articles;
  }
);

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    loading: false,
    error: null,
    page: 1,
    category: '',
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage, setCategory } = articleSlice.actions;

export default articleSlice.reducer;
