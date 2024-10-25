import { getByText } from "@testing-library/react";
import { useState } from "react";

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
  return (<div className="accordion">
    {
      data.map((e1,i)=><AccordionItem num={i} title={e1.title} text={e1.text} key={i}/>)
    }
  </div>)
}

function AccordionItem({num,title,text}) {
  const [isOpen,setIsOpen]=useState(false)
  return (
    <div className={'item ${isOpen ? "open":""}'}  onClick={()=>setIsOpen(!isOpen)}>
      <p className="number">
         {num <9 ? `0${num+1}`:num+1}       
      </p>
      <p className="text">{title}</p>
      <p className="icon">
        {isOpen? '-' :'+'}
        </p>
        {/* using short circuiting */}
      {
        (isOpen && <div className="content-box" >{text}</div> )
      }
      
    </div>
  )
}