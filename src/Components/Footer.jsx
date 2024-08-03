import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

const Social = ({ link, icon }) => {
    return (
        <a href={link} target='_blank' className='social-shadow w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#04152D] hover:text-pink-600 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer text-xl'>{icon}</a>
    )
}

const Footer = () => {


    return (
        <div className='w-full first-line:text-white bg-[#020C1B] flex flex-col justify-center items-center text-white py-16 gap-10'>
            <ul className='w-full flex justify-center items-center gap-4 text-lg'>
                <li><a className='hover:text-pink-700' href='#' target='_blank'>Terms Of Use</a></li>
                <li><a className='hover:text-pink-700' href='#' target='_blank'>Privacy-Policy</a></li>
                <li><a className='hover:text-pink-700' href='#' target='_blank'>About</a></li>
                <li><a className='hover:text-pink-700' href='#' target='_blank'>Blog</a></li>
                <li><a className='hover:text-pink-700' href='#' target='_blank'>FAQ</a></li>
            </ul>

            <h1 className='w-[60%] flex justify-center items-center text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</h1>

            <div className='flex justify-center items-center gap-6'>

                <Social link={'https://www.facebook.com/md.ismaeelkhan.10/'} icon={<FaFacebookF />} />
                <Social link={'https://www.instagram.com/ismail_15_/'} icon={<FaInstagram />} />
                <Social link={'https://twitter.com/home?lang=en-in'} icon={<FaTwitter />} />
                <Social link={'https://www.linkedin.com/in/md-ismaeel-73b636224/'} icon={<CiLinkedin />} />

            </div>
        </div>
    )
}

export default Footer;
