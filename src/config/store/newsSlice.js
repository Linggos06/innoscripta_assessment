import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import fetchData from "../fetchData";
import { prepareData, convertData, mergeData } from "../processData";
import { BBC_NEWS, NYTIMES_NEWS, GUARDIAN_NEWS } from "../constants";

const initialState = {
  news: [],
  sources: {
    [BBC_NEWS]: false,
    [GUARDIAN_NEWS]: false,
    [NYTIMES_NEWS]: false,
  },
  query: "",
  loading: "idle",
  error: null,
};

export const fetchNews = createAsyncThunk(
  "/news",
  async (url, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchData(url);
      dispatch(setNews(response));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err?.response?.data || "error";
        return rejectWithValue(error);
      } else {
        return rejectWithValue("error");
      }
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews: (state, action) => {
      const preparedData = prepareData(action.payload);
      const convertedData = convertData(preparedData);
      const mergedData = mergeData(convertedData);
      state.news = mergedData;
    },
    setSources: (state, action) => {
      state.sources = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchNews.fulfilled, (state) => {
        state.loading = "succeeded";
        state.error = null;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});

export const selectNews = (state) => state.news;
export const { setNews, setSources, setQuery } = newsSlice.actions;

export default newsSlice.reducer;
