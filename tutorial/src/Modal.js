import React from 'react'
import {useGlobalContext} from './Context.js'
function Modal() {
    let {reset,winner} = useGlobalContext();
  return (
    <div style={{display:"inline-block",width:"400px",height:"300px",border:"2px solid black",marginLeft:"550px"}}>
        <h4>The winner is {winner}</h4>
    <button onClick={()=>reset()}>Reset</button>
    </div>
  )
}

export default Modal