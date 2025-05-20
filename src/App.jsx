import { useReducer } from 'react'
import './App.css'
import DigitButton from './DigitButton.jsx'
import OperationButton from './OperationButton.jsx'

export const ACTIONS = {
  ADD_DIGITS: 'add',
  CLEAR: 'clear',
  DELETE_DIGITS:'delete',
  EVALUATE: 'evaluate',
  CHOOSE_OP: 'choose-operation',
}


export function reducer(state,{type ,payload}){
  switch(type){
    case ACTIONS.ADD_DIGITS:
    if(state.overWrite){
  
      return {
      ...state,
      currOp: payload.digit,
      overWrite: false,
    }
  }

      if(payload.digit ==="0" && state.currOp==="0") {return state}
      if(payload.digit ==="." && state.currOp.includes(".")){
        return state
      }
      return {
        ...state,
        currOp:  `${state.currOp || ""}${payload.digit}`,
  }


  case ACTIONS.CHOOSE_OP:
    if(state.currOp==null && state.prevOp == null){
      return state
    }

    if(state.prevOp==null){
      return {
        ...state,
        op: payload.op,
        prevOp: state.currOp,
        currOp: null
      
      }
    }

    if(state.currOp== null){
      return{
        ...state,
        op: payload.op,
      }
    }

    return{
      ...state,
      prevOp: evaluate(state),
      op: payload.op,
      currOp: null
    }


  case ACTIONS.EVALUATE:
    if(state.currOp == null || state.prevOp==null || state.op==null)
      return {state}

    return{
      ...state,
      overWrite: true,
      prevOp: null,
      op: null,
      currOp: evaluate(state),
    }

  case ACTIONS.CLEAR:
    return {}

  case ACTIONS.DELETE_DIGITS:
    if(state.overWrite){
      return {
        ...state,
        overWrite: false,
        currOp:null
      }
    }

    if(state.currOp==null)
      return{state}
    
    if(state.currOp.length===1) 
      
      return {
      ...state, 
      currOp:null
      }

    return {
      ...state,
      currOp: state.currOp.slice(0,-1)
    }
  }
}


const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{maximumFractionDigits:0})

function formatOp(op){
  if(op==null)return 
  const[integer,decimal]=op.split('.')
  if(decimal==null)return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function evaluate({currOp,prevOp,op}){
  const prev= parseFloat(prevOp)
  const curr= parseFloat(currOp)
if(isNaN(prev) || isNaN(curr)) return ""

  let computation ="";

  switch(op){
    case "+":
      computation = prev+curr;
      break
    case "-":
      computation = prev - curr;
      break
    case "/":
      computation = prev/curr;
      break
    case "*":
      computation = prev*curr;
      break
  }

  return computation.toString()

}

function App() {
  const[{currOp,prevOp,op},dispatch] = useReducer(reducer,{})
  
  return (
  <div className= "calculator-grid">
    <div className="output">
      <div className="prev-op">{formatOp(prevOp)}{op}</div>
        <div className="curr-op">{formatOp(currOp)}</div>
        </div>
    <button data-action="clear" className='span-two' onClick={()=> dispatch({type: ACTIONS.CLEAR})}>AC</button>

    <button data-action= "delete"  onClick={()=> dispatch({type: ACTIONS.DELETE_DIGITS})}>DEL</button>
    <OperationButton op="/" dispatch={dispatch} />


    <DigitButton digit="1" dispatch={dispatch} />
    <DigitButton digit="2" dispatch={dispatch} />
    <DigitButton digit="3" dispatch={dispatch} />

    <OperationButton  op="*" dispatch={dispatch} />

    
    <DigitButton digit="4" dispatch={dispatch} />
    <DigitButton digit="5" dispatch={dispatch} />
    <DigitButton digit="6" dispatch={dispatch} />
   
    <OperationButton op="-" dispatch={dispatch} />

    <DigitButton digit="7" dispatch={dispatch} />
    <DigitButton digit="8" dispatch={dispatch} />
    <DigitButton digit="9" dispatch={dispatch} />
    
    <OperationButton op="+" dispatch={dispatch} />

    <DigitButton digit="." dispatch={dispatch} />
    <DigitButton digit="0" dispatch={dispatch} />

    <button data-action="evaluate" className='span-two' onClick={()=> dispatch({type: ACTIONS.EVALUATE})}>=</button>

  </div>
  )
}

export default App
