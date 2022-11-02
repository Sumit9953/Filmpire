import { configureStore } from "@reduxjs/toolkit";

import { tmdbApi  } from "../services/TMBD";

import  genreOrCategoryReducer  from  "../features/currentGenreOrCategory";

export default configureStore({
    reducer:{
      [tmdbApi.reducerPath]: tmdbApi.reducer,
      currentGenreOrCategory: genreOrCategoryReducer
    },
})