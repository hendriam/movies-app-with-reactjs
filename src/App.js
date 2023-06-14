import { useEffect, useState } from "react"

export default function App () {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Batman");

  const searchMovies = async (searchTerm) => {
    const result = await fetch(`http://www.omdbapi.com/?apikey=68d9702c&s=${searchTerm}`);
    const data= await result.json();
    setMovies(data)
  }

  function handleOnClick (term) {
    searchMovies(term)
  }

  useEffect( () => {
    searchMovies(searchTerm)
  }, [])

  return (
    <div className="p-10 flex flex-col">
      <div className="max-w-5xl mx-auto flex flex-col">
        <h1 className="font-bold text-4xl"><span className="text-teal-400">My</span>Movies</h1>
        <p className="text-lg font-normal text-slate-700 text-justify mt-2">MyMovies. You would rather just see horror movies on MyMovies or comedy movies on MyMovies? 
          Simply use our filters below to find the one that will match your preferences.</p>
          
        <form className="relative mt-6"
           onSubmit={(e) => {
            e.preventDefault();
            handleOnClick(searchTerm);
          }}
        >
          <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
          </svg>
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-1/2 focus:ring-2 focus:ring-teal-400 focus:outline-none appearance-none text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" typeof="text" aria-labelledby="Filter projects" placeholder="Filter movies..." />
        </form>
      </div>

      <div className="max-w-5xl mx-auto grid sm:grid-cols-3 md:grid-cols-4 grid-cols-2 gap-3 mt-5">
        <CardMovies movies={movies} />
      </div>
    </div>
  )
}

function CardMovies ({movies}) {
  console.log(movies);
  if (movies.Response === "True") {
      return movies.Search.map(movie =>
        <div key={movie.imdbID} className="rounded-lg p-2 bg-gray-50 shadow-xl">
          <img className="rounded-lg mb-1" src={movie.Poster} alt={movie.Poster} />
          <h3 className="font-semibold text-lg">{movie.Title}</h3>
          <p className="text-sm text-slate-500">{movie.Year}</p>
        </div>
      )    
  }

  return <div className="">
    <h1 className="text-2xl">Movie not found</h1>
  </div>
} 