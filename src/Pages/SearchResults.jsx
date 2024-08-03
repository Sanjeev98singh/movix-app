import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchApi } from "../utils/api";
import { setSearchInput } from "../Slice/MovieSlice";
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton'
import MovieCard from "../Components/MovieCard";

export const SearchResults = () => {


  const { id } = useParams();

  const { searchInput } = useSelector((state) => state.MovieSlice);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);

  const FetchSearchInput = async () => {

    setIsLoading(true);
    const response = await fetchApi(
      `https://api.themoviedb.org/3/search/multi?query=${id}&page=1`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
        },
      }
    );
    // console.log(response.data.results);
    dispatch(setSearchInput(response.data.results));
    setIsLoading(false);
  };


  async function fetchMoviePerPage() {
    const response = await fetchApi(`https://api.themoviedb.org/3/discover/movie?page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
        },
      }
    );

    const newMovie = [...searchInput, ...response.data.results];
    dispatch(setSearchInput(newMovie));
    setPage(prev => prev + 1);
    setTotalPage(response.data.total_pages);

  }

  useEffect(() => {
    FetchSearchInput();
    fetchMoviePerPage()

    return () => {
      dispatch(setSearchInput([]));
    };
  }, []);

  return (
    <div className="w-full flex flex-col justify-center py-4 px-6 mt-20">
      <div className="w-full flex justify-between items-center mt-4 mb-1 px-3">
        <h1 className="w-full text-2xl text-white">Search results of {id}</h1>
      </div>

      <div className="w-full min-h-screen flx flex-wrap justify-start items-center">
        {isLoading ? (
          <Skeleton count={5} height={200} width={150} />
        ) : (
          <InfiniteScroll
            dataLength={totalPage}
            next={fetchMoviePerPage}
            hasMore={true}
            loader={
              <h1 className="w-full text-white text-2xl text-center mt-16">
                Loading...
              </h1>
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div className="w-full flex flex-wrap justify-start items-center gap-11">
              {searchInput.length > 0 ? searchInput.map((item) => (
                <NavLink
                  key={item.id}
                  to={`/movie/${item.id}`}
                  className="w-1/6 flex"
                >
                  <MovieCard item={item} />
                </NavLink>
              )) : ''}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};
