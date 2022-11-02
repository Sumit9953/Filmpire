import { createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;
// /movie/popular?api_key=<<api_key>>&language=en-US&page=1

export const tmdbApi = createApi({
    reducerPath: '',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3'}),
    endpoints: (builder)=>({
        getGenres:builder.query({
            query:() => `genre/movie/list?api_key=${tmdbApiKey}`
        }),

        // GET MOVIES BY TYPE
         getMovies: builder.query({
            query: () => `movie/popular?page=${page}&api_key=${tmdbApiKey}`,
         })
    })
})

export const {
    useGetGenresQuery,
    useGetMoviesQuery,
} = tmdbApi;