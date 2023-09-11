// import React, { useState, useEffect } from 'react';
// import { db, auth } from '../../FirebaseConfig'; 
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import Cards from "../card/card"

// import "./watchlist.css";

// const Favourites = () => {
//   const [watchlistMovies, setwatchlistMovies] = useState([]);

//   useEffect(() => {
//     const fetchFavoriteMovies = async () => {
//       const userId = auth.currentUser.uid;
//       const favoritesRef = collection(db, 'watchlist');
//       const q = query(favoritesRef, where('userId', '==',userId));
  
//       const querySnapshot = await getDocs(q);
  
//       const favoriteMoviesData = [];
//       querySnapshot.forEach((doc) => {
//         favoriteMoviesData.push({ id: doc.id, movieDetail: doc.data() });
//       });
  
//       setwatchlistMovies(favoriteMoviesData);
//       console.log(watchlistMovies);
//     };
  
//     fetchFavoriteMovies();
//   }, []);
  
//   return (
//     <div className="favorites">
//       <h2>Your WatchList</h2>
//       <div className="favorite-movies-list">
//         {watchlistMovies.map(movie => (
//           <Cards movie={movie.movieDetail.movieDetail} />
//           // <div className="favorite-movie" key={movie.id}>
//           //   <h3>{movie.movieDetail.movieDetail.original_title}</h3>
//           //   <p>{movie.movieDetail.overview}</p>
//           //   <img src={movie.movieDetail.poster_path} alt={movie.movieDetail.original_title} />
//           //   {/* Add more movie details as needed */}
//           // </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Favourites;
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../FirebaseConfig'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import Cards from "../card/card"

import "./watchlist.css";

const Watchlist = () => {
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [userId, setUserId] = useState(auth.currentUser ? auth.currentUser.uid : null);

  useEffect(() => {
    const fetchWatchlistMovies = async () => {
      if (!userId) return; // If user is not logged in, do nothing

      const watchlistRef = collection(db, 'watchlist');
      const q = query(watchlistRef, where('userId', '==', userId));
  
      const querySnapshot = await getDocs(q);
  
      const watchlistMoviesData = [];
      querySnapshot.forEach((doc) => {
        watchlistMoviesData.push({ id: doc.id, movieDetail: doc.data() });
      });
  
      setWatchlistMovies(watchlistMoviesData);
    };
  
    fetchWatchlistMovies();
  }, [userId]);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (userId === null) {
    return (
      <div className="watchlist">
        <h2>Please login to see your watchlist</h2>
      </div>
    );
  }

  return (
    <div className="watchlist">
      <h2>Your Watchlist</h2>
      <div className="watchlist-movies-list">
        {watchlistMovies.map(movie => (
          <Cards key={movie.id} movie={movie.movieDetail.movieDetail} />
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
