import { act, useReducer, useState } from "react";

const initialState={count:0,step:1}



function reducer (state,action){
  console.log(state,action)
  //return the next state
  // if (action.type === 'inc') return state + action.playload;
  // if(action.type === "dec") return state - action.playload;
  // if(action.type === "setCount") return action.playload;

  // return {count :0,step :1}

  switch(action.type){

  case "desc":
      return {...state ,count:state.count+1};

  case "inc":
    return {...state,count: state.count -1};

  case "setCount":
    return {...state,count:action.playload};

  case "setStep":
    return {...state,count:action.playload};
  case "reset":
    return initialState;
  
  default:
    throw new Error("Unknown action")
}

}//close the reducer function



function DateCounter() {


  // const [count, setCount] = useState(0);
   
  const [state ,dispatch]=useReducer(reducer,initialState);

  //destruture the  State object here

  const {count,step}=state;


  // const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);

    //action 
    dispatch({type :'dec',playload :-1})
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);

    dispatch({type:'inc' ,playload : 1});
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch( {type : 'setCount' ,playload :Number(e.target.value)})
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
