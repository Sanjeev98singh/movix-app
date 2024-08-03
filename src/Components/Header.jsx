import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const { trending } = useSelector((state) => state.MovieSlice)
    const randomImg = trending && trending.length > 0 ? trending[Math.floor(Math.random() * trending.length)].backdrop_path : '';
    // console.log(randomImg);

    const inputRef = useRef();

    const navigator = useNavigate()
    const handleSearch = () => {
        let inputVal = inputRef.current.value.toLowerCase();
        if (inputVal !== null) {
            navigator(`/search/${inputVal}`)
        }
    }



    return (
        <div className='w-full h-[700px] text-white' style={{
            backgroundImage: randomImg ? `linear-gradient(rgba(0,0,0,0.5), rgb(4, 21, 45)), url(https://image.tmdb.org/t/p/original${randomImg})` : '',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
        }}>
            <div className={`w-full min-h-screen flex flex-col justify-center items-center gap-3`}>

                <h1 className='text-7xl font-semibold'>Welcome.</h1>
                <p className='text-2xl'>Millions of movies, TV shows and people to discover. Explore now.</p>

                <div className='w-full flex justify-center items-center mt-4'>
                    <input type='text' ref={inputRef} placeholder='Search for a movie and tv shoes....' className='w-2/4 h-14 rounded-l-full focus:outline-none outline-none px-10 text-xl text-slate-600' />
                    <button onClick={handleSearch} className='w-[120px] bg-button-gradient h-14 rounded-md text-xl rounded-r-full'>search</button>
                </div>

            </div>
        </div>
    )
}
