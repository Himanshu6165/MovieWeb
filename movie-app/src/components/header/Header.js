import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"
import {auth, provider} from '../../FirebaseConfig';
import  {useState,useEffect} from "react"
import { signInWithPopup } from 'firebase/auth';

const Header = () => {
  const [user, setUser] = useState(null);
  // const [search, setSearch] = useState('');
  // const [movies, setmovies] = useState([]);
  const[movies,setmovies]=useState([]);
  const [ searchMovies, setsearchedMovies ] = useState(movies);
  const [search, setSearch] = useState('');

  const handleGoogleSignIn=()=>{
    signInWithPopup(auth, provider).then((result)=>{
      const user = result.user;
      console.log(user);
      setUser(user);
    }).catch((err)=>{
      console.log(err);
    })
  }

  // useEffect(() => {
    
  //   fetch(`https://api.themoviedb.org/3/movie/${title}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCountries(data); // Assuming the API response contains an array of country names.
  //     })
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
    .then(res => res.json())
    .then(data => setmovies(data))
}, [])

const handleInputChange = (event) => {
  const inputValue = event.target.value.toLowerCase();
  setSearch(inputValue);

  // Filter the countries based on the search input
  const filteredMovies = searchMovies.filter((movie) =>
    movie.title.toLowerCase().includes(inputValue)
  );

  // Update the display style of each country element
  const updatedMovies = searchMovies.map((movie) => ({
    ...movie,
    display: filteredMovies.includes(movie),
  }));

  setsearchedMovies(updatedMovies);
};
  const handleLogout=()=>{
    setUser(null);
  }
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" /></Link>
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
                <Link to="/favourites" style={{textDecoration: "none"}}><span>Favorites</span></Link>
                <Link to="/watchlist" style={{textDecoration: "none"}}><span>Watchlist</span></Link>
                {/* <div className="search">
                <input
                  type="text"
                  value={search}
                  onChange={handleInputChange}
                  placeholder="Search for a country"
                />
                </div> */}
            </div>
            <div className="headerRight">
                {/* <Link to="/login" style={{textDecoration: "none"}}><span>Sign In</span></Link> */}
                {user?(
            <>
              <button className='btn btn-secondary btn-md'
                onClick={handleLogout}>
                LOGOUT
              </button>
              <h3>Welcome {user.displayName}</h3>
              {/* <p>{user.email}</p>
              <div className='photo'>
                <img src={user.photoURL} alt="dp" referrerPolicy='no-referrer'/>
              </div> */}
            </>
          ):(
            <button className='btn btn-danger btn-md'
              onClick={handleGoogleSignIn}>
              Sign In With Google
            </button>  
          )} 

            </div>
        </div>
    )
}

export default Header