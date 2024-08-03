import React, { useEffect } from 'react'
import { Header } from '../Components/Header'
import { TrendingMovies } from '../Components/TrendingMovies'
import { PopularMovies } from '../Components/PopularMovies'
import { TopRatedMovies } from '../Components/TopRatedMovies'
import { setGenres } from '../Slice/MovieSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchApi } from '../utils/api'

export const Home = () => {


    const dispatch = useDispatch()
    const genresData = useSelector((state) => state.MovieSlice.genres)


    async function fetchGenres() {
        const data = await fetchApi(
            `https://api.themoviedb.org/3/genre/movie/list`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
                },
            }
        );

        const filteredData = data.data.genres.map((item) => {
            return {
                value: item.id,
                label: item.name,
            };
        });

        dispatch(setGenres(filteredData));
    }

    useEffect(() => {

        fetchGenres();
    }, []);

    // console.log(genresData);
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <Header />
            <TrendingMovies />
            <PopularMovies />
            <TopRatedMovies />
        </div>
    )
}
