import React, { useEffect, useState } from 'react'
import MovieCard from '../Components/MovieCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchApi } from '../utils/api'
import { setMovie } from '../Slice/MovieSlice'
import Skeleton from 'react-loading-skeleton'
import { NavLink } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import Select from 'react-select';



export const Movies = () => {

    const { movie, genres } = useSelector((state) => state.MovieSlice)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedBySortOption, SetSelectedBySortOption] = useState(null);


    const sortBy = [
        { defaultValue: null, label: "Select" },
        { value: 'popularity.desc', label: 'Popularity Decending' },
        { value: 'popularity.asc', label: 'Popularity Ascending' },
        { value: 'vote_average.desc', label: 'Rating Decending' },
        { value: 'vote_average.asc', label: 'Rating Ascending' },
        { value: 'primary_release_date.desc', label: 'Release Date Decending' },
        { value: 'primary_release_date.asc', label: 'Release Date Ascending' },
        { value: 'original_title.asc', label: 'Title A-Z' },
    ]


    const FetchData = async () => {
        setIsLoading(true)
        const response = await fetchApi(`https://api.themoviedb.org/3/discover/movie`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
                },
            })
        dispatch(setMovie(response.data.results))
        setIsLoading(false)
    }


    async function fetchMoviePerPage() {
        const response = await fetchApi(`https://api.themoviedb.org/3/discover/movie?page=${page}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
                },
            }
        );
        const newMovie = [...movie, ...response.data.results];
        dispatch(setMovie(newMovie));
        setPage(prev => prev + 1);
        setTotalPage(response.data.total_pages);
    }

    useEffect(() => {
        FetchData();
        fetchMoviePerPage();

        return () => {
            dispatch(setMovie([]))
        }
    }, []);


    async function fetchFilteredMovie() {

        let params = "";
        if (selectedOption.length > 0) {
            selectedOption.forEach((item) => {
                params += item.value + ",";
            });
        }

        const data = await fetchApi(
            `https://api.themoviedb.org/3/discover/movie?with_genres=${params}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
                },
            }
        );
        dispatch(setMovie(data.data.results));
        setTotalPage(data.data.total_pages);
    }



    async function sortByFilter() {


        const data = await fetchApi(`https://api.themoviedb.org/3/discover/movie?sort_by=${selectedBySortOption.value}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
                },
            }
        );
        dispatch(setMovie(data.data.results));
        setTotalPage(data.data.total_pages);
    }


    useEffect(() => {
        if (selectedOption) {
            fetchFilteredMovie();
        }
        if (selectedBySortOption) {
            sortByFilter()
        }

    }, [selectedOption, selectedBySortOption]);

    // console.log(genres);
    return (
        <div className='w-full flex flex-col justify-center py-4 px-6 mt-20'>

            <div className='w-full flex justify-between items-center mt-4 mb-1 px-3'>
                <h1 className='w-2/12 text-2xl text-white'>Explore Movies</h1>

                <div className='w-2/3 flex justify-end items-center gap-4'>

                    <Select
                        className='bg-search-bar h-10 w-2/6 rounded-full outline-none'
                        type='text' value={selectedOption}
                        onChange={(e) => { setSelectedOption(e) }}
                        isMulti
                        options={genres}>
                    </Select>

                    <Select
                        className='bg-search-bar h-10 w-2/6 rounded-full outline-none'
                        type='text' value={selectedBySortOption}
                        onChange={(e) => { SetSelectedBySortOption(e) }}
                        options={sortBy}
                    >
                    </Select>

                </div>
            </div>

            <div className='w-full min-h-screen flx flex-wrap justify-start items-center'>
                {isLoading ? (
                    <Skeleton count={5} height={200} width={150} />
                ) : (

                    <InfiniteScroll
                        dataLength={totalPage}
                        next={fetchMoviePerPage}
                        hasMore={true}
                        loader={<h1 className='w-full text-white text-2xl text-center mt-16'>Loading...</h1>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        <div className='w-full flex flex-wrap justify-start items-center gap-11'>
                            {movie.map((item) => (
                                <NavLink key={item.id} to={`/movie/${item.id}`} className='w-1/6 flex'>
                                    <MovieCard item={item} />
                                </NavLink>
                            ))}
                        </div>
                    </InfiniteScroll>

                )}
            </div>
        </div>
    )
}