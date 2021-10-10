import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  data: [],
  query: "web developer",
  page: 1,
  totalPages: 0,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setStories: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload.data;
      state.totalPages = payload.totalPages;
    },
    removeStory: (state, { payload: id }) => {
      state.data = state.data.filter((story) => story.objectId !== id);
    },
    handleSearch: (state, { payload: searchQuery }) => {
      state.query = searchQuery;
      state.page = 1;
    },
    handlePage: (state, { payload }) => {
      if (payload === "inc") {
        let nextPage = state.page + 1;
        if (nextPage > state.totalPages) {
          nextPage = 1;
        }
        state.page = nextPage;
      } else if (payload === "dec") {
        let prevPage = state.page - 1;
        if (prevPage < 1) {
          prevPage = state.totalPages;
        }
        state.page = prevPage;
      }
    },
  },
});

export const { setLoading, setStories, removeStory, handleSearch, handlePage } =
  searchSlice.actions;
export const selectSearch = (state) => state.search;

export default searchSlice.reducer;

export const fetchStories = (query, page) => {
  return async (dispatch) => {
    dispatch(setLoading);
    try {
      const res = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${query}&page=${page - 1}`
      );
      dispatch(
        setStories({ data: res.data.hits, totalPages: res.data.nbPages })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
