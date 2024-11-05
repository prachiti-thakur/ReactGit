// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useCallback, useEffect, useState } from "react";

export default function App() {
    const [amount,setAmount]=useState(1)
    const [fromCur,setFromCur]=useState('EUR');
    const [toCur,setTocur]=useState('USD');

    const [converted,setConverted]=useState("")
    const [isLoading,setIsLoading]=useState(false)

    useEffect(function(){
        async function convert(){
//from currency and to currency not the same

             
            setIsLoading(true)
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`)
            const data=await res.json()
            console.log(data)
            setConverted(data.rates[toCur])
            setIsLoading(false)
        }

        if (fromCur === toCur) return setConverted(amount)
        convert()
    },[amount,fromCur,toCur])

    return (
      <div>
        <input type="text" value={amount}
        onChange={e=>setAmount(Number(e.target.value))}
        disabled={isLoading}
        />
        <select value = {fromCur} onChange={e=>setFromCur(e.target.value)} disabled={isLoading}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select value={toCur} onChange={e=>setTocur(e.target.value)} disabled={isLoading}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <p>{converted} {toCur}</p>
      </div>
    );
  }
  