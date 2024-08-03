import React, { useEffect, useState } from 'react'
import { fetchApi } from '../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { SetTrending } from '../Slice/MovieSlice'
import { NavLink } from 'react-router-dom'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton'
import ReactSimplyCarousel from 'react-simply-carousel';
import MovieCard from './MovieCard'


export const TrendingMovies = () => {

    const trendingMovie = useSelector((state) => state.MovieSlice.trending)
    const dispatch = useDispatch()
    const [switchMovie, setSwitchMovies] = useState('day')
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false)

    const FetchData = async () => {
        setIsLoading(true)
        const response = await fetchApi(`https://api.themoviedb.org/3/trending/movie/${switchMovie}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
                },
            })
        dispatch(SetTrending(response.data.results))
        setIsLoading(false)
    }

    useEffect(() => {
        FetchData()
    }, [switchMovie])


    // console.log(trendingMovie);
    return (
        <div className='w-full flex flex-col justify-center items-center py-2 px-6'>

            <div className='w-full text-white flex justify-between px-4'>
                <h1 className='text-xl font-semibold'>Trending</h1>

                <div className='w-1/5 flex gap-3 bg-white text-slate-800 justify-between px-2 py-1 rounded-full'>
                    <button onClick={() => setSwitchMovies('day')} className={switchMovie === 'day' ? 'bg-button-gradient px-8 py-[4px] rounded-full text-white' : 'ml-2'}>day</button>
                    <button onClick={() => setSwitchMovies('week')} className={switchMovie === 'week' ? 'bg-button-gradient px-8 py-[4px] rounded-full text-white' : 'mr-4'}>week</button>
                </div>

            </div>
            <div className="w-full ">

                <div className='w-full relative'>
                    <ReactSimplyCarousel
                        activeSlideIndex={activeSlideIndex}
                        onRequestChange={setActiveSlideIndex}
                        itemsToShow={1}
                        itemsToScroll={1}
                        forwardBtnProps={{

                            style: {
                                position: 'absolute',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'start',
                                background: 'black',
                                border: 'none',
                                borderRadius: '50%',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '20px',
                                height: 30,
                                lineHeight: 1,
                                textAlign: 'center',
                                width: 30,
                                right: '20px',
                                top: '147px',
                                zIndex: '1'

                            },
                            children: <span>{<FaLongArrowAltRight />}</span>,
                        }}
                        backwardBtnProps={{

                            style: {
                                position: 'absolute',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                background: 'black',
                                border: 'none',
                                borderRadius: '50%',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '20px',
                                height: 30,
                                lineHeight: 1,
                                textAlign: 'center',
                                width: 30,
                                left: '20px',
                                zIndex: '1',
                                top: '147px'

                            },
                            children: <span>{<FaLongArrowAltLeft />}</span>,
                        }}
                        responsiveProps={[
                            {
                                itemsToShow: 5,
                                itemsToScroll: 2,
                                minWidth: 768,
                            },
                        ]}
                        speed={400}
                        easing="linear"
                    >
                        {isLoading ? (
                            <Skeleton count={5} height={200} width={150} />
                        ) : (
                            trendingMovie.map((item) => (
                                <div key={item.id} className='w-full h-[500px] px-2'>
                                    <NavLink to={`/movie/${item.id}`} className='w-1/4 h-40'>
                                        <MovieCard item={item} />
                                    </NavLink>
                                </div>
                            )))}

                    </ReactSimplyCarousel>
                </div>

            </div>
        </div>
    )
}
