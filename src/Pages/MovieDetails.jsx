import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchApi } from '../utils/api'
import { MovieCardDetails } from '../Components/MovieCardDetails'
import { useLocation } from 'react-router-dom'
import Profile from '../Components/Profile'
import { OfficialVideos } from '../Components/OfficialVideos'
import { SimilarMoviesData } from '../Components/SimilarVideosData'

import {
    setMovieDetails,
    setCredits,
    setVideos,
    setSimilarMovies,
    setRecommendations
} from '../Slice/MovieSlice'
import { Recommendation } from '../Components/Recommendation'


export const MovieDetails = () => {

    const { id } = useParams()
    const { pathname } = useLocation()
    const location = pathname.split('/')
    // console.log("location", location[1]);

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)


    const fetchMovieData = async () => {

        setIsLoading(true)
        const response = await fetchApi(`https://api.themoviedb.org/3/${location[1]}/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
                },
            })
        dispatch(setMovieDetails(response.data))
        setIsLoading(false)
    }


    const fetchCreditData = async () => {

        setIsLoading(true)
        const response = await fetchApi(`https://api.themoviedb.org/3/${location[1]}/${id}/credits`,

            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
                },
            })
        dispatch(setCredits(response.data));
        setIsLoading(false)
    }

    const FetchVideosData = async () => {
        setIsLoading(true)

        const response = await fetchApi(`https://api.themoviedb.org/3/${location[1]}/${id}/videos`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
                },
            }
        );
        dispatch(setVideos(response.data.results))
        // console.log(response.data.results);
    }

    const FetchSimilarMovies = async () => {

        const response = await fetchApi(`https://api.themoviedb.org/3/${location[1]}/${id}/similar`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
            },
        })
        // console.log(response.data.results);
        dispatch(setSimilarMovies(response.data.results))
    }


    const FetchRecommendation = async () => {

        const response = await fetchApi(`
        https://api.themoviedb.org/3/${location[1]}/${id}/recommendations`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
            },
        })
        console.log(response.data.results);
        dispatch(setRecommendations(response.data.results))
    }



    useEffect(() => {
        console.log('newMovies', location[1]);
        fetchMovieData()
        fetchCreditData()
        FetchVideosData()
        FetchSimilarMovies()
        FetchRecommendation()

        return () => {
            dispatch(setMovieDetails({}))
            dispatch(setCredits([]))
            dispatch(setVideos([]))
            dispatch(setSimilarMovies([]))
            dispatch(setRecommendations([]))

        }
    }, [id])

    return (
        <div className='text-white w-full flex flex-col'>
            <MovieCardDetails />
            <Profile />
            <OfficialVideos />
            <SimilarMoviesData />
            <Recommendation />
        </div>
    )
}
