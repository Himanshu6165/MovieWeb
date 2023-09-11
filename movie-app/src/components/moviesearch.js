// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import Cards from './card/card'

// export default function Results() {
//     const [movieList, setMovieList] = useState([])
//     const {query} = useParams()
    
//     useEffect(() => {
//         getData()
//     }, [])

//     useEffect(() => {
//         getData()
//     }, [query])

//     const getData = () => {
//         fetch(`https://api.themoviedb.org/3/search/movie?query=${query? query : "Jack+Reacher"}&api_key=f2beb8396b5fc9d1cb2d0a19d3ed6aeb`)
//         .then(res => res.json())
//         .then(data => setMovieList(data.results))
//     }

//     return (
//         <div className="p-2 md:p-10">
//             <h2 className=" text-xl px-6 mb-5 md:text-3xl md:px-12 md:mb-10"> {(movieList.length>0 ? "search results for " + query : "No Results for " + query).toUpperCase()}</h2>
//             <div className="flex justify-center flex-wrap">
//                 {
//                     movieList.map(movie => (
//                         <Cards movie={movie} />
//                     ))
//                 }
//             </div>
//         </div>
//     )
// }
