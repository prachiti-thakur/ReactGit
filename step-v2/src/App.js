import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App(){
  return(
    <div>
      <Step/>
      
    </div>
  )
}


function Step(){
// root component


const [step,setStep]=useState(1)
// for close btn
const [isOpen,setIsOpen]=useState(true) //initailly aour state is open
// const arr=useState(1)
// console.log(arr)

// // find the current step
//const step=2

function handlePrevious(){
  // alert("previous") 
  // if (step >1)setStep(step-1)
  if (step >1){
    setStep((s)=>s-1)
  }
 
}
function handleNext(){
  // alert("Next")
  if(step < 3)
    {setStep((s)=>s+1)

    }
}

console.log(isOpen)

return <div>
{/* closing btn  we if isOpen is true change to false and wise versa*/}
<button className="close" onClick={()=>setIsOpen(!isOpen)}>
  &times;
</button>

  {
    isOpen && (
            <div className="steps">
            <div className="numbers">
              <div className={`${step >= 1 ?"active":""}`}>1</div>
              <div className={`${step >= 2 ? "active":""}`}>2</div>
              <div className={`${step >=3 ? "active":""}`}>3</div>
            </div>

            <StepMessage step={step}>  {messages[step-1]}</StepMessage>

            <div className="buttons">
            <Button bgclr='#7950f2'  textclr='#fff' handlePrevious={handlePrevious} emoji='◀️ '>
              <span>◀️ </span>
              <span>Previous</span>
              </Button>
            <Button bgclr='#7950f2'  textclr='#fff' handlePrevious={handleNext}>
            <span>▶️ </span>
            <span>Next</span>
            </Button>
          
            
            </div>

          </div>
    )
  }
</div>
}

function StepMessage({step,children}){
  return (
  <p className="message">
    <h3>step {step}</h3>{children}
    </p>

  )
}


function Button({bgclr,textclr,handlePrevious,children}){
  return (
    <button style={{backgroundColor:bgclr,color:textclr}} onClick={handlePrevious}
     >{children}
     </button>
    
  )
}

export default App;
