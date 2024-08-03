import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movie: [],
    tvShows: [],
    searchInput: [],
    trending: [],
    popular: [],
    topRated: [],
    genres: [],
    movieDetail: {},
    credits: [],
    videos: [],
    similarMovies: [],
    recommendations: []
};

const MovieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setMovie: (state, action) => {
            state.movie = action.payload;
        },
        setTvShows: (state, action) => {
            state.tvShows = action.payload;
        },
        setSearchInput: (state, action) => {
            state.searchInput = action.payload
        },
        SetTrending: (state, action) => {
            state.trending = action.payload;
        },
        setPopular: (state, action) => {
            state.popular = action.payload;
        },
        setTopRated: (state, action) => {
            state.topRated = action.payload
        },
        setGenres: (state, action) => {
            state.genres = action.payload
        },
        setMovieDetails: (state, action) => {
            state.movieDetail = action.payload;
        },
        setCredits: (state, action) => {
            state.credits = action.payload
        },
        setVideos: (state, action) => {
            state.videos = action.payload;
        },
        setSimilarMovies: (state, action) => {
            state.similarMovies = action.payload;
        },
        setRecommendations: (state, action) => {
            state.recommendations = action.payload;
        }
    },
});

export const {
    setMovie,
    setTvShows,
    setSearchInput,
    SetTrending,
    setPopular,
    setTopRated,
    setGenres,
    setMovieDetails,
    setCredits,
    setVideos,
    setSimilarMovies,
    setRecommendations
} = MovieSlice.actions;
export default MovieSlice.reducer;
