

import { children, useState } from 'react';

function App() {
  const [bill,setBill]=useState("")
  const[rate1,setRate1]=useState(0)
  const[rate2,setRate2]=useState(0)

  function handleReset(){
    setBill(0)
    setRate1(0)
    setRate2(0)
  }
  return (
    <div>
      <Bill bill={bill} setBill={setBill}/>
      <Rate rate={rate1} setRate={setRate1}><p>How did you like the service</p></Rate>
      <Rate rate={rate2} setRate={setRate2}><p>How did your friend like the service</p></Rate>
      {
        bill > 0 && <>
         <Output rate1={rate1} rate2={rate2} bill={bill}/>
         <button onClick={handleReset}>Reset</button>
        </> 
      }
    </div>
  )
}

function Bill({bill,setBill}){
  console.log(bill)
  return(
    <div>
      <p>How much was the Bill?</p>
      <input type='text' value={bill}  placeholder='bill amount'
      onChange={(e) => setBill(e.target.value ? Number(e.target.value) : 0)}
      />
    </div>
  )
}

function Rate({rate,setRate,children}){
  return (
    <div>
      {children}
      <select value={rate} onChange={(e)=>setRate(Number(e.target.value))}>
        <option value={0}> no rate 0 %</option>
        <option value={50}>good 50%</option>
        <option value={70}>good 70%</option>
        <option value={100}>good 100%</option>
      </select>
    </div>
  )
}

function Output({bill,rate1,rate2}){

  const avg= (rate1+rate2)/2

  const total=(avg*bill )/100
  Number(bill)
  return(
    <div>
      <h1>You Pay {total}

        total ={bill} + {avg}
      </h1>
    </div>
  )
}

export default App;
