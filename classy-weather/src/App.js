import React  from "react";

class Counter extends React.Component{

  constructor(props){
    super(props)

    this.state = {count :6};
    this.handleDecrement=this.handleDecrement.bind(this)
    this.handleIncrement=this.handleIncrement.bind(this)
  }

 handleDecrement(){
  console.log(this)
  this.setState(curState =>{
    return {count :curState.count -1};
  });  
 }

  handleIncrement(){
    this.setState(curState =>{
        return {count :curState.count+1};
    });
  }
 render(){
  const date=new Date('june 21 2027')
  date.setDate(date.getDate()+this.state.count)
  return (
    
    <div>
    <button onClick={this.handleDecrement}>-</button>
    <span>
      {date.toDateString()} <br></br>
      {this.state.count}</span>
    <button onClick={this.handleIncrement}>+</button>
  </div>
  )
 }
}

export default Counter;