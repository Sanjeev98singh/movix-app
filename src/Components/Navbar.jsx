import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import movieLogo from "../assets/moviesImages/movix-logo.png"


const Navbar = () => {
    return (

        <div className='w-full fixed z-10 top-0 h-16  bg-navbar-color backdrop-blur-sm text-lg text-white flex justify-between items-center  px-20'>

            <NavLink to={"/"}>
                <img src={movieLogo} className='w-[150px] h-[50px] bg-cover' />
            </NavLink>

            <ul className='flex gap-6 justify-center items-center text-base'>

                <li><NavLink to={`/movies`} className='hover:text-pink-600'>Movies</NavLink></li>
                <li><NavLink to={`/tvShows`} className='hover:text-pink-600'>TV Shows</NavLink></li>
                <button><IoSearch /></button>

            </ul>

        </div>
    )
}

export default Navbar;
