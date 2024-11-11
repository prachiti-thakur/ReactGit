
import { useEffect, useReducer } from "react"
import Header from "./Header"
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen"
import Question  from "./Question"
import NextButton from "./NextButton"
import Progress from "./Progress"
import FinishedScreen from "./FinishedScreen"
import Timer from "./Timer"
import Footer from "./Footer"

const SECS_PER_QUESTION=30

const initialState={
  questions: [],
  //loadig ,error ,ready,active ,finished 
  status:'loading',
  index:0,//to keep track of the question
  answer:null,//no ans initaily
  points:0,
  highscore:0,
  secondsRemaining:null,//total second and minus second from it
}


//state updation logic we put here in the reducer function
function reducer(state,action){
  switch(action.type){
    case "dataReceived":
      return {...state,questions:action.payload,status :'ready'};
    case "dataFailed":
      return {...state,
        status:"error",
      }
    case "start":
      return{
        ...state,status:"active",index:0,
        secondsRemaining:state.questions.length* SECS_PER_QUESTION,
      }
    case "newAnswer":
      const question= state.questions.at(state.index);

      return{
        ...state,answer:action.payload, //click index number
        points: action.payload=== question.correctOption? state.points + question.points:state.points
      }
    
      case "nextQuestion":
        const isLastQuestion = state.index === state.questions.length - 1;
      return isLastQuestion
        ? { ...state, status: "finished", highscore: state.points > state.highscore ? state.points : state.highscore }
        : { ...state, index: state.index + 1, answer: null };
      case "finished":
        return{
          ...state,status:"finished",highscore:state.points >state.highscore?state.poits :state.highscore
        }
      case 'restart':
        return {
          ...initialState,questions:state.questions,
          status:"ready"};
          // return {
          //   ... state,points:0,
          //   highscore:0,
          //   index:0,
          //   answer:null,
          //   status:"ready".
          // };
        
      case "tick":
        return{
          ...state,secondsRemaining:state.secondsRemaining-1,
          status:state.secondsRemaining===0 ? 'finished':state.status,
        }
    default:
      throw new Error("Action unknown"); 
  }
}

export default function App(){

  const [{questions,status,index,answer,points,highscore,secondsRemaining},dispatch]=useReducer(reducer,initialState)


  console.log(questions)
  const numQuestions = questions && questions.length > 0 ? questions.length : 0;
  const maxPossiblePoints = questions.length > 0 
  ? questions.reduce((prev, cur) => prev + cur.points, 0) 
  : 0;

useEffect(function(){

  fetch("http://localhost:8000/questions")
  .then((res)=>res.json())
  .then((data)=>dispatch({type:'dataReceived',payload:data}))
  .catch((err)=>dispatch({type:'dataFailed'}));

},[])


  return <div className="app">


    <Header/>


    <Main>{status ==='loading' && <Loader/> }

    {status=== "error" && <Error/>}

    {status === "ready" && <StartScreen numQuestions={numQuestions}
     dispatch={dispatch}/> }
    
    {status === "active" && 
    <>
    <Progress
    index={index} numQuestions={numQuestions}
    points={points}
    maxPossiblePoints={maxPossiblePoints}
    answer={answer}/>
    <Question question={questions[index]}
     dispatch={dispatch}
     answer={answer}/>
     <Footer>
      <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
     <NextButton dispatch={dispatch}
     answer={answer}
     index={index}
     numQuestion={numQuestions}/>
    

     </Footer>
    
     </>
     }

     {status ==='finished' && <FinishedScreen points={points}
      maxPossiblePoints={maxPossiblePoints}
        highscore={highscore}
     dispatch={dispatch}
      />}
    </Main>

  </div>
}
