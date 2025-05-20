import { ACTIONS } from "./App.jsx"

export default function OperationButton({dispatch,op}){
    return (
    <button
    data-action= "operator" 
    onClick={()=> dispatch({type: ACTIONS.CHOOSE_OP ,payload: { op } })}
    > 
    
    {op}
     </button>
     );
    }

