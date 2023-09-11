// import React, { useEffect, useState } from "react"
// import "./home.css"
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';
// import { Link } from "react-router-dom";
// import MovieList from "../../components/movieList/movieList";

// const Home = () => {

//     const [ popularMovies, setPopularMovies ] = useState([])
//     const[movies,setmovies]=useState([]);
//     const [ searchMovies, setsearchedMovies ] = useState(movies);
//     const [search, setSearch] = useState('');

//     useEffect(() => {
//         fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
//         .then(res => res.json())
//         .then(data => setPopularMovies(data.results))
//     }, [])

//     useEffect(() => {
//         fetch("https://api.themoviedb.org/3/discover/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
//         .then(res => res.json())
//         .then(data => setmovies(data))
//     }, [])
    
//     const handleInputChange = (event) => {
//       const inputValue = event.target.value.toLowerCase();
//       setSearch(inputValue);
    
//       // Filter the countries based on the search input
//       const filteredMovies = searchMovies.filter((movie) =>
//         movie.title.toLowerCase().includes(inputValue)
//       );
    
//       // Update the display style of each country element
//       const updatedMovies = searchMovies.map((movie) => ({
//         ...movie,
//         display: filteredMovies.includes(movie),
//       }));
    
//       setsearchedMovies(updatedMovies);
//     };

//     return (
//         <>
//             <div className="poster">
//                 <Carousel
//                     showThumbs={false}
//                     autoPlay={true}
//                     transitionTime={3}
//                     infiniteLoop={true}
//                     showStatus={false}
//                 >
//                     {
//                         popularMovies.map(movie => (
//                             <Link key={movie.id} 
//                             style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`} >
//                                 <div className="posterImage">
//                                     <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
//                                 </div>
//                                 <div className="posterImage__overlay">
//                                     <div className="posterImage__title">{movie ? movie.original_title: ""}</div>
//                                     <div className="posterImage__runtime">
//                                         {movie ? movie.release_date : ""}
//                                         <span className="posterImage__rating">
//                                             {movie ? movie.vote_average :""}
//                                             <i className="fas fa-star" />{" "}
//                                         </span>
//                                     </div>
//                                     <div className="posterImage__description">{movie ? movie.overview : ""}</div>
//                                 </div>
//                             </Link>
//                         ))
//                     }
//                 </Carousel>
//                 <div className="movieSearch" >
//                 <input
//                   type="text"
//                   value={search}
//                   onChange={handleInputChange}
//                   placeholder="Search for a country"
//                 />
//                 </div>
//                 <MovieList />
//             </div>
//         </>
//     )
// }

// export default Home

import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";
import Cards from "../../components/card/card";

const Home = () => {

    const [ popularMovies, setPopularMovies ] = useState([]);
    const [ movies, setMovies ] = useState([]);
    const [ search, setSearch ] = useState('');

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
        .then(res => res.json())
        .then(data => setPopularMovies(data.results))
    }, [])

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
        .then(res => res.json())
        .then(data => setMovies(data.results))
    }, [])
    
    const handleInputChange = (event) => {
      const inputValue = event.target.value.toLowerCase();
      setSearch(inputValue);
    };

    const searchedMovies = movies.filter(movie => movie.title.toLowerCase().includes(search));

    return (
        <>
            <div className="poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        popularMovies.map(movie => (
                            <Link key={movie.id} 
                            style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`} >
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.original_title: ""}</div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            {movie ? movie.vote_average :""}
                                            <i className="fas fa-star" />{" "}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
                <div className="movieSearch" >
                <input
                    className="searchInput"
                    type="text"
                    value={search}
                    onChange={handleInputChange}
                    placeholder="Search for a movie"
                />
                </div>
                {search ? (
                    <div className="searchedMovies">
                        {searchedMovies.map(movie => (
                            // <div key={movie.id}>{movie.title}</div>
                            <Cards movie={movie} />
                        ))}
                       
                    </div>
                ) : (
                    <MovieList />
                )}
            </div>
        </>
    )
}

export default Home;
