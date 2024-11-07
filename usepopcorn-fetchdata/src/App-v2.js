

//  from section 13

import { useEffect, useState } from "react";
import StarRating from "./starRating.js"

const average = (arr) =>
 arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);


//////////////////////////////////////////////////////////////////////
const key='cee5b493'


export default function App() {
//lift up state
const [query, setQuery] = useState("");
const [movies, setMovies] = useState([]);

// for loading
const [isLoading, setIsLoading]=useState(false)
const tempquery="interstellar"

const [error,setError]=useState("")

const [selectedId,setSelectedId]=useState(null);

const [watched, setWatched] = useState(function (){
  const storeValue=localStorage.getItem('watched')
  return JSON.parse(storeValue);
});



// const [watched, setWatched] = useState([]);




// useEffect(function(){
//   console.log('Initial Render')
// },[])

// useEffect(function(){
//   console.log('after every render')
// })

// console.log('during render')



function handleSelectMovie(id){
 setSelectedId(selectedId => id === selectedId ? null:id)
}

function handleCloseMovie(){
 setSelectedId(null)
}

function handleAddWatch(movie){
 setWatched(watched =>  [...watched,movie])
 //local storage
//  localStorage.setItem('watched',JSON.stringify([...watched,movie]))
}

useEffect(function(){
  localStorage.setItem('watched',JSON.stringify(watched));
},[watched])

//take a data from the local storage at the inital render then stored it into the watched list


function handleDeleteWatched(id){
 setWatched((watched)=> watched.filter((movie)=>
 movie.imdbID !== id));
}
///////////////////////////////////


// 
useEffect(function(){
 //for abort controller

 const controller =new AbortController();

 async function fetchMovies (){
   
   try{
     setIsLoading(true);
     setError('')
    const res =await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`,{signal:controller.signal});


   if (!res.ok) throw new Error("Something went Wrong")



   const data =await res.json();
   // setMovies(data.Search); this is getting undefined so it giving error
   if(data.Response === 'False')throw new Error("Movie not found");
    setMovies(data.Search)
    console.log(data.Search)
    console.log(data)
   }
   catch(err){
     console.error(err);
     if(err.name !== "AbortError"){
       setError(err.message);
     }

   }
   finally{
     setIsLoading(false);
   }
 }

 if(query.length <3){
   setMovies([]);
   setError("");
   return;
 }


 handleCloseMovie();
 fetchMovies();
 //cleanup function

 return function(){
   controller.abort();
 }

},[query]);


/////////////////////////////////////////////

 return (
   <>

   <Navbar >
     <Logo/>
     <Search query={query} setQuery={setQuery}/>
 <NumResult movies={movies}/>
   </Navbar>


    <Main>
    
   <Box>
   {/* {isLoading?<Loader/>:  <MovieList movies={movies}/>} */}


   {isLoading && <Loader/>}

   {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}

   {error && <ErrorMessage message={error}/>}


   
   </Box>

   {/* <Box element={<MovieList movies={movies}/>}/> */}

   <Box>
     {
       selectedId ? <SelectedMovie selectedId={selectedId} 
                     oncloseMovie={handleCloseMovie}
                     onAddWatched={handleAddWatch}
                     watched={watched}/>:
       <>
       <WatchSummery watched={watched}/>
       <WatchedMovieList watched={watched}  onDeleteWatched={handleDeleteWatched}/>
       </>
       
     }
  
   </Box>

   {/* <Box element={<>
     <WatchSummery watched={watched}/>
      
      <WatchedMovieList watched={watched}/>
     </>}
   /> */}

   </Main>
     
   </>
 );
}

//////////////////////////////////////////////

function ErrorMessage({message}){
 return (
   <p className="error"><span>Error</span>
   {message}</p>
 )
}


//////////////////////////////////////////////////////////////


function Loader(){
 return (
   <p className="loader"> Loading...</p>
 )
}



//////////////////////////////////////////////////////////////////


function Navbar({children}){
 
 return (
   <nav className="nav-bar">
 {children}
 
 </nav>

 )
}

///////////////////////////////////////////

function Logo(){
 return (
   <div className="logo">
   <span role="img">🍿</span>
   <h1>usePopcorn</h1>
 </div>
 )
}

///////////////////////////////////////////////////

function Search ({query,setQuery}){
 
 return <input
 className="search"
 type="text"
 placeholder="Search movies..."
 value={query}
 onChange={(e) => setQuery(e.target.value)}
/>
}
////////////////////////////////////////

function NumResult({movies}){
 return(
   <p className="num-results">
   {/* Found <strong>{movies.length}</strong> results */}
   Found <strong> {movies?.length || 0}</strong> results
 </p>

 )
}

///////////////////////////////////////////////////////////

function Main({children}){


return (
 <main className="main">
 {children}
</main>
)
}

//////////////////////////////////////////////////////////////
//resusable component
function Box({children}){
 
 const [isOpen, setIsOpen] = useState(true);
 return (
   <div className="box">
   <button
     className="btn-toggle"
     onClick={() => setIsOpen((open) => !open)}
   >
     {isOpen? "–" : "+"}
   </button>
   {isOpen && (
//  {children} this is we are creating new object 
children
   )}
 </div>
 )
}
////////////////////////////////////////////////////////////
function MovieList({movies,onSelectMovie}){

 return (

   <ul className="list list-movies">
   {movies?.map((movie) => (
    <Movie movie={movie} onSelectMovie={onSelectMovie}/>
   ))}
 </ul>
 )
}

///////////////////////////////////////////////////////////


function Movie({movie,onSelectMovie}){
 return (
   <li key={movie.imdbID} onClick={()=> onSelectMovie(movie.imdbID)}>
   <img src={movie.Poster} alt={`${movie.Title} poster`} />
   <h3>{movie.Title}</h3>
   <div>
     <p>
       <span>🗓</span>
       <span>{movie.Year}</span>
     </p>
   </div>
 </li>
 )
}

//////////////////////////////////////////////////////////////////////////////

// function WatchBox(){

//   const [watched, setWatched] = useState(tempWatchedData);

//   const [isOpen1, setIsOpen1] = useState(true);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return(

//     <div className="box">
//     <button
//       className="btn-toggle"
//       onClick={() => setIsOpen2((open) => !open)}
//     >
//       {isOpen2 ? "–" : "+"}
//     </button>
//     {isOpen2 && (
//       <>

//       <WatchSummery watched={watched}/>
      
//       <WatchedMovieList watched={watched}/>
//       </>
//     )}
//   </div>

//   )
// }

/////////////////////////////////////////////////////////////////////////

function WatchSummery({watched}){
 
 
 const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
 const avgUserRating = average(watched.map((movie) => movie.userRating));
 const avgRuntime = average(watched.map((movie) => movie.runtime));


return (
 <div className="summary">
 <h2>Movies you watched</h2>
 <div>
   <p>
     <span>#️⃣</span>
     <span>{watched.length} movies</span>
   </p>
   <p>
     <span>⭐️</span>
     <span>{avgImdbRating.toFixed(2)}</span>
   </p>
   <p>
     <span>🌟</span>
     <span>{avgUserRating.toFixed(2)}</span>
   </p>
   <p>
     <span>⏳</span>
     <span>{avgRuntime} min</span>
   </p>
 </div>
</div>

)
}

//////////////////////////////////////////////////////

function WatchedMovieList({watched ,onDeleteWatched}){
 return (
   <ul className="list">
         {watched.map((movie) => (
           <WatchedMovie movie={movie} onDeleteWatched={onDeleteWatched}/>
         ))}
       </ul>
 )
}

///////////////////////////////////////////////////////////


function WatchedMovie({movie,onDeleteWatched}){
 return(
   <li key={movie.imdbID}>
             <img src={movie.poster} alt={`${movie.title} poster`} />
             <h3>{movie.title}</h3>
             <div>
               <p>
                 <span>⭐️</span>
                 <span>{movie.imdbRating}</span>
               </p>
               <p>
                 <span>🌟</span>
                 <span>{movie.userRating}</span>
               </p>
               <p>
                 <span>⏳</span>
                 <span>{movie.runtime} min</span>
               </p>
               <button className="btn-delete" onClick={()=>onDeleteWatched(movie.imdbID)}>
                 x
               </button>
             </div>
           </li>
 )
}

///////////////////////////////////////////////////////////////////

function SelectedMovie({selectedId,oncloseMovie,onAddWatched,watched}){
 ////

 const [movie,setMovie]=useState({});
 const [isLoading,setIsLoading]=useState(false)

 const [useRating,setUserRating]=useState('')
 const isWatched=watched.map(movie => movie.imdbID).includes(selectedId)

 const watchedUserrating=watched.find(movie => movie.imdbID === selectedId)?.userRating;
 
 //destructuring
 const {
   Title:title,
   Year:year,
   Poster:poster,
   Runtime:runtime,
   imdbRating,
   Plot:plot,
   Released:released,
   Actors:actors,
   Director:director,
  Genre:genre,
  userRating,}=movie;

//  const [isTop,setIsTop]=useState(imdbRating >8);
//  console.log(isTop);
//  useEffect(function(){
//     setIsTop(imdbRating>8)
//  },[imdbRating])

const isTop=imdbRating >8;
console.log(isTop);

const [avgRating ,setAvgRating]=useState(0)

 console.log(title,year,runtime)

 function handleAdd(){
   const newWatchMovie={
     imdbID:selectedId,
     title,
     year,
     poster,
     imdbRating:Number(imdbRating),
     runtime :runtime ? Number(runtime.split(" ")[0]):0,
     userRating:Number(useRating),

   };
   onAddWatched(newWatchMovie)
//    oncloseMovie()
setAvgRating(Number(imdbRating));
// alert(avgRating)
// alert((Number(avgRating)+ Number(userRating)))
// console.log(avgRating)
// console.log(useRating)
// console.log((avgRating+userRating)/2)
setAvgRating((avgRating)=>(avgRating+userRating)/2);

 }

 /////////////////////////////////////////////////////////////



   useEffect(function(){
       function callback(e){

           if(e.code === 'Escape'){
             oncloseMovie()
             console.log("close by Escape key")
               } 
           }
     

     document.addEventListener("keydown",callback);

     return function(){
       document.removeEventListener("keydown",callback);
     };

   },[oncloseMovie]);





 ////////////////////////////////////////////////////////////////

 useEffect(function(){
   async function getMovieDetails(){
     setIsLoading(true)
     const res=await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`);
     const data=await res.json();
     console.log(data)
//set the movie
     setMovie(data)
     setIsLoading(false)
   }
   getMovieDetails();//here we call that function
 },[selectedId])

useEffect(
 function(){
   if (!title) return; //to avoid the undefined as in the title
   document.title=`Movie | ${title}`;

   //cleanup function
   return function(){
     document.title ="UsePopCorn";
     console.log(` cleanUp the function of title ${title}`)
   }

 },[title]
)


 return <div className="details">
   {isLoading ? <Loader/>:
   <>
   <header>
   <button className="btn-back" onClick={oncloseMovie}> &larr;</button>
   <img src={poster} alt={`Poster of ${movie} movie`}/>
   <div className="details-overview">
     <h2>{title}</h2>
     <p>{released} &bull; {runtime}</p>
     <p>{genre}</p>
     <p>
       <span>
       ⭐
       </span>
       {imdbRating} IMdb rating 
      </p>
   </div>
   </header>

   <p>{avgRating}</p>

   {/* star rating component */}
<div className="rating">
 { !isWatched ? <>

   <StarRating maxRating={10} size={24} onSet={setUserRating}/>
     {useRating >0 &&  <button className="btn-add"
       onClick={handleAdd}>
 Add to List
</button>}
 </>

: (<p> you rate with movie {watchedUserrating}</p>)
}
</div>


   {/* star rating component */}
   <section>
 <p><em>{plot}</em></p>
 <p>Starring the {actors}</p>
 <p>Directed by {director}</p>
</section>
  {/* {selectedId} */}



</>}
   
  
 

 </div>
}

