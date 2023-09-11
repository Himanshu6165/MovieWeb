import React, {useEffect, useState} from "react"
import "./movie.css"
import { useParams } from "react-router-dom"
import { auth,provider,db} from '../../FirebaseConfig'
import { collection, addDoc } from "firebase/firestore";
import { useToast } from '@chakra-ui/react'

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState();
    const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);
    const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
    const { id } = useParams();
    const toast  = useToast();

    useEffect(() => {
        getData()
        window.scrollTo(0,0)
    }, [])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then(res => res.json())
        .then(data => setMovie(data))
    }
    const addToFavorites = async () => {
        setIsAddedToFavorites(true);
        const userId = auth.currentUser.uid;
        console.log("User ID:", userId);
        await addDoc(collection(db, "favourites"), {
            movieDetail: currentMovieDetail,
            userId: userId,
        });
        toast({
            title: 'Movie added to favourites',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
    }

    const addToWatchlist = async () => {
        setIsAddedToWatchlist(true);
        const userId = auth.currentUser.uid;
        console.log("User ID:", userId);
        await addDoc(collection(db, "watchlist"), {
            movieDetail: currentMovieDetail,
            userId: userId,
        });
        toast({
            title: 'Movie added to watchlist',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
    }
    const Playfunction = async () => {
        toast({
            title: 'Movie is playing',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
    }


    return (
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i class="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.map(genre => (
                                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    
                </div>
            </div>
            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {
                    currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {/* Add to Favorites Button */}
                {(
                    <button className="movie__Button" onClick={addToFavorites}>Add to Favorites</button>
                )}
                {/* Add to Watchlist Button */}
                {(
                    <button className="movie__Button" onClick={addToWatchlist}>Add to Watchlist</button>
                )}
                {(
                    <button className="movie__Button" onClick={Playfunction}>Play Movie</button>
                )}
            </div>
            <div className="movie__heading">Production companies</div>
            <div className="movie__production">
                {
                    currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                        <>
                            {
                                company.logo_path 
                                && 
                                <span className="productionCompanyImage">
                                    <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default Movie
