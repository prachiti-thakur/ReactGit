import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import App from './App-v2';


import StarRating from './starRating';



function Test(){
  const [movieRating,setMovieRating]=useState(0)
  return (
<div>
<StarRating color='blue' maxRating={10} onSet={setMovieRating} />
<p>This movie was rated {movieRating} star</p>
</div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />

    {/* to avoid to create the new project  */}
    {/* <StarRating maxRating={5}/>  
    <StarRating size={24} color="red" className="test"/>  
    <StarRating maxRating={5} messages={["Terrible","Bad","Okay","Good","Amazing"]}
    defaultRating={3}
    />  

    <Test/> */}

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

