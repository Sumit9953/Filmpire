import { configureStore } from "@reduxjs/toolkit";

import { tmdbApi  } from "../services/TMBD";

export default configureStore({
    reducer:{
      [tmdbApi.reducerPath]: tmdbApi.reducer,
    },
})