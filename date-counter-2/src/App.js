import { useState } from "react"

export default function App(){
  return (<Counter/>)
}

function Counter(){

  const [step,setStep]=useState(1);
  const [count,setCount]=useState(0);

  function handleReset(){
      setCount(0)
      setStep(1)
  }
  // date
const date=new Date("June 21 2027");
date.setDate(date.getDate()+count)

  return (
    <div> 
      {/* step */}
    <div>
       <input type="range" min='1' max="10" onChange={(e)=>(
        setStep(Number(e.target.value))
       )}/>
       <span>{step}</span>
       {
        console.log({step

        })
       }
    {/* <button onClick={()=>
        { if (step >1)setStep((step)=>step-1)}
        }>-</button>
        
      <button onClick={()=>
        {setStep((step)=>step+1)}
        }>+</button> */}
    </div>
{/* count */}
    <div>
    <button onClick={()=>
        { setCount((count)=>count-step)}
        }>-</button>
        {/* <span>count :{count}</span> */}
        <input type="text" value={count} onChange={(e)=>setCount(Number(e.target.value))}/>
      <button onClick={()=>
        {setCount((count)=>count+step)}
        }>+</button>
    </div>

   {/* message */}
   <p>
    {count === 0 ? "Today is ":
    count >0 ? count+' day from today is ':
  ` ${Math.abs(count)} days ago was `

    }
    <span>
    {date.toDateString()}
    </span>
    </p>
    <div>
    <button onClick={handleReset}>Reset</button>
    </div>

   

  </div>
  )
}


