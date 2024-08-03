import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ReactSimplyCarousel from 'react-simply-carousel';
import { FaLongArrowAltLeft } from "react-icons/fa"
import { FaLongArrowAltRight } from "react-icons/fa"
import Skeleton from 'react-loading-skeleton'
import { NavLink, useLocation } from 'react-router-dom';
import MovieCard from './MovieCard';

export const Recommendation = () => {

    const { recommendations } = useSelector((state) => state.MovieSlice)
    // console.log(recommendations);
    const [isLoading, setIsLoading] = useState(false)
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [switchMovie, setSwitchMovies] = useState(null)

    const { pathname } = useLocation()
    useEffect(() => {
        const location = pathname.split('/')
        setSwitchMovies(location[1])
    }, [pathname])

    return (
        <>
            {recommendations.length > 0 ? (
                <div className='w-full relative'>
                    <h1 className='px-10 text-3xl'>Recommendations</h1>

                    <ReactSimplyCarousel
                        activeSlideIndex={activeSlideIndex}
                        onRequestChange={setActiveSlideIndex}
                        itemsToShow={1}
                        itemsToScroll={5}
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
                                right: '40px',
                                top: '200px',
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
                                left: '40px',
                                zIndex: '1',
                                top: '200px'

                            },
                            children: <span>{<FaLongArrowAltLeft />}</span>,
                        }}
                        responsiveProps={[
                            {
                                itemsToShow: 5,
                                itemsToScroll: 5,
                                minWidth: 768,
                            },
                        ]}
                        speed={400}
                        easing="linear"
                    >
                        {isLoading ? (
                            <Skeleton count={5} height={200} width={150} />

                        ) : (
                            recommendations && recommendations.map((item) => (
                                <div key={item.id} className='w-full h-[500px] px-2'>
                                    {switchMovie &&
                                        <NavLink to={`/${switchMovie}/${item.id}`} className='w-1/4 h-40'>
                                            <MovieCard item={item} />
                                        </NavLink>
                                    }

                                </div>
                            ))

                        )}

                    </ReactSimplyCarousel>
                </div>
            ) : ''}
        </>

    )
}
