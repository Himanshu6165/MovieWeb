// import React, { useState, useEffect } from 'react';
// import { db, auth } from '../../FirebaseConfig'; 
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import Cards from "../card/card"

// import "./favourites.css";

// const Favourites = () => {
//   const [favoriteMovies, setFavoriteMovies] = useState([]);

//   useEffect(() => {
//     const fetchFavoriteMovies = async () => {
//       const userId = auth.currentUser.uid;
//       const favoritesRef = collection(db, 'favourites');
//       const q = query(favoritesRef, where('userId', '==',userId));
  
//       const querySnapshot = await getDocs(q);
  
//       const favoriteMoviesData = [];
//       querySnapshot.forEach((doc) => {
//         favoriteMoviesData.push({ id: doc.id, movieDetail: doc.data() });
//       });
  
//       setFavoriteMovies(favoriteMoviesData);
//       console.log(favoriteMoviesData);
//     };
  
//     fetchFavoriteMovies();
//   }, []);
  
//   return (
//     <div className="favorites">
//       <h2>Your Favorite Movies</h2>
//       <div className="favorite-movies-list">
//         {favoriteMovies.map(movie => (
//           <Cards movie={movie.movieDetail.movieDetail} />
          
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

import "./favourites.css";

const Favourites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      if (!userId) return; // If user is not logged in, do nothing

      const favoritesRef = collection(db, 'favourites');
      const q = query(favoritesRef, where('userId', '==', userId));
  
      const querySnapshot = await getDocs(q);
  
      const favoriteMoviesData = [];
      querySnapshot.forEach((doc) => {
        favoriteMoviesData.push({ id: doc.id, movieDetail: doc.data() });
      });
  
      setFavoriteMovies(favoriteMoviesData);
    };
  
    fetchFavoriteMovies();
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
      <div className="favorites">
        <h2>Please login to see favorites</h2>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h2>Your Favorite Movies</h2>
      <div className="favorite-movies-list">
        {favoriteMovies.map(movie => (
          <Cards key={movie.id} movie={movie.movieDetail.movieDetail} />
        ))}
      </div>
    </div>
  );
}

export default Favourites;

