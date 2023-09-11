import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import Watchlist from './components/watchlist/watchlist';
import Favourites from './components/favourites/favourites';

function App() {
  return (
    <div className="App">
        <Router>
          <Header />
            <Routes>
                <Route index element={<Home />}></Route>
                <Route path="movie/:id" element={<Movie />}></Route>
                <Route path="movies/:type" element={<MovieList />}></Route>
                <Route path="/*" element={<h1>Error Page</h1>}></Route>
                <Route path="/favourites" element={<Favourites />}></Route>
                <Route path="/watchlist" element={<Watchlist />}></Route>
                
            </Routes>
            
        </Router>
    </div>
  );
}

export default App;