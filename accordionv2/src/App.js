import { getByText } from "@testing-library/react";
import { Children, useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

export default function App() {
  return (
    <div>
      <Accordion  data={faqs}/>
    </div>
  );
}

function Accordion({data}){
const [curOpen,setCurOpen]=useState(1)

  return (<div className="accordion">
    {
      data.map((e1,i)=>(<AccordionItem 
      curOpen={curOpen} 
      onOpen={setCurOpen}
      num={i} 
      title={e1.title} 
      key={i}> {e1.text} </AccordionItem>)
    )
    }
  </div>)
}

function AccordionItem({num,title,text,curOpen,onOpen,Children}) {
  // const [isOpen,setIsOpen]=useState(false)
  const isOpen= num === curOpen
  function handleToggle(){
    onOpen(isOpen ? null : num)
    console.log(num)
    console.log(curOpen)
  }
  return (
    // <div className={'item ${isOpen ? "open":""}'}  onClick={()=>setIsOpen(!isOpen)}>
    <div className={'item ${isOpen ? "open":""}'} onClick={handleToggle}>
      <p className="number">
         {num <9 ? `0${num+1}`:num+1}       
      </p>
      <p className="text">{title}</p>
      <p className="icon">
        {isOpen? '-' :'+'}
        </p>
        {/* using short circuiting */}
      
        {isOpen && <div className="content-box" >{Children}</div> }
      
      
    </div>
  )
}