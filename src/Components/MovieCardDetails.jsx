import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import noPosterImg from "../assets/moviesImages/no-poster.png";
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { CiPlay1 } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { VideoModal } from "./VideoModel";

export const MovieCardDetails = () => {
    const { movieDetail, credits, videos } = useSelector((state) => state.MovieSlice);

    const {
        backdrop_path,
        genres,
        overview,
        poster_path,
        release_date,
        runtime,
        status,
        tagline,
        title,
        vote_average,
        first_air_date,
        original_name,
    } = movieDetail;

    const filteredDirector = credits.crew && credits.crew.filter((e) => (e.department === 'Directing'))

    const filteredWriter = credits.crew && credits.crew.filter((e) => (e.department === 'Writing'))

    const formattedVoteAverage = typeof vote_average === 'number' ? vote_average.toFixed(1) : 'N/A';


    const [selectedVideoKey, setSelectedVideoKey] = useState(null);
    const sliced = videos && videos.length > 1 ? videos.slice(0, 1) : videos;

    const openVideoModal = (videoKey) => {
        setSelectedVideoKey(videoKey);
    };

    const closeVideoModal = () => {
        setSelectedVideoKey(null);
    };


    return (
        <>
            <div className={`w-full min-h-screen`} style={{
                backgroundImage: backdrop_path ? `linear-gradient(rgba(0,0,0,0.6), rgb(4, 21, 45),rgb(4, 21, 45)), url(https://image.tmdb.org/t/p/original${backdrop_path})` : '',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}>
                {movieDetail ? (
                    <div className="w-full h-full flex px-0 mt-32">

                        <div className="w-2/5 h-[550px] px-12">
                            <img
                                src={poster_path ? `https://image.tmdb.org/t/p/original/${poster_path}` : noPosterImg}
                                className="w-96 h-full gg-center rounded-xl mb-1"
                                alt={title || original_name || "No poster available"}
                            />
                        </div>

                        <div className="w-1/2">

                            <h1>
                                <span className='text-4xl'>{title || original_name}</span>{" "}

                                <span className="text-4xl">
                                    {(release_date || first_air_date) && (release_date || first_air_date).length >= 4 ? `(${(release_date || first_air_date).slice(0, 4)})` : ""}
                                </span>
                            </h1>

                            <p className="text-xl italic mt-1 opacity-40">{tagline ? tagline : "N/A"}</p>

                            <div className="flex justify-start items-center gap-4">

                                {genres && genres.map((e, i) => (
                                    <p key={i} className="bg-pink-700 px-4 rounded-sm mt-2">{e ? e.name : "N/A"}</p>
                                ))}

                            </div>


                            <div className="w-full flex justify-start items-center gap-10 mt-4">

                                <div style={{ background: 'white', borderRadius: '50%', width: '70px', height: '70px' }}>
                                    <CircularProgressbar
                                        className='h-full w-full'
                                        value={Math.trunc(Number(vote_average) * 10)}
                                        text={`${formattedVoteAverage}%`}
                                        styles={buildStyles({
                                            rotation: 0.25,
                                            strokeLinecap: 'butt',
                                            textSize: '24px',
                                            pathTransitionDuration: 0.5,
                                            textColor: '#f88',
                                            trailColor: '#d6d6d6',
                                            backgroundColor: 'transparent',
                                        })}
                                    />
                                </div>

                                <div className="flex justify-start items-center gap-4">

                                    {sliced && sliced.map((video) => (
                                        <NavLink onClick={() => openVideoModal(video.key)}>
                                            <span className="h-[70px] w-[70px] text-4xl rounded-full relative flex justify-center items-center border-2 hover:border-pink-700 hover:text-pink-700 cursor-pointer">
                                                <CiPlay1 className="absolute z-2 " />
                                            </span>
                                        </NavLink>
                                    ))}

                                    <span className="text-xl text-white hover:text-pink-700"> Watch trailer</span>

                                </div>
                            </div>


                            <div className="w-full justify-start items-center mt-4">

                                <span className="text-2xl">Overview</span><br />
                                <span>{overview ? overview : "N/A"}</span>

                            </div>

                            <div className="w-full flex justify-start items-center gap-10 mt-6">

                                <div className="flex justify-center items-center gap-2">
                                    <span className="text-lg">Status:</span>
                                    <span className="opacity-50">{status ? status : 'N/A'}</span>
                                </div>

                                <div className="flex justify-center items-center gap-2">
                                    <span className="text-lg"></span>Release Date:
                                    <span className="opacity-50">{release_date ? release_date : ' N/A'}</span>
                                </div>

                                <div className="flex justify-center items-center gap-2">
                                    <span className="text-lg">Runtime:</span>
                                    <span className="opacity-50">{runtime ? `${runtime}m` : 'N/A'}</span>
                                </div>

                            </div>
                            <hr className="opacity-20 mt-2" />

                            {credits.crew && credits.crew.length !== 0 ? (
                                <div className="w-full flex flex-col">

                                    {filteredDirector.length > 0 ?
                                        <>
                                            <p className="flex justify-start items-center gap-4 mt-4">

                                                <span className="text-lg">Director:</span>
                                                <span className="opacity-50">{filteredDirector ? filteredDirector[0]?.name : 'N/A'}</span>
                                                <span className="opacity-50">{filteredDirector ? filteredDirector[1]?.name : 'N/A'}</span>

                                            </p>
                                            < hr className="opacity-20 mt-2" />
                                        </>
                                        : ''
                                    }

                                    {filteredWriter.length > 0 ?
                                        <>
                                            <div className="w-full flex mt-4 gap-3">
                                                <span>Writer:</span>

                                                <p className="opacity-50"> {filteredWriter ? filteredWriter[0]?.name : "N/A"}</p>
                                                <p className="opacity-50"> {filteredWriter ? filteredWriter[1]?.name : "N/A"}</p>

                                            </div>
                                            <hr className="opacity-20 mt-2" />
                                        </> : ''}


                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-start items-center gap-3 mt-4">
                                        Creator:
                                        {credits.cast && credits.cast.map((elem, index) => (<span key={index} className="opacity-50">{elem.name ? elem.name : "N/A"}</span>))}

                                    </div>
                                    <hr className="opacity-20 mt-2" />

                                </>
                            )
                            }
                        </div>

                    </div>
                ) : (
                    ""
                )}
            </div>
            {selectedVideoKey && (
                <VideoModal videoKey={selectedVideoKey} onClose={closeVideoModal} />
            )}
        </>
    );
};
