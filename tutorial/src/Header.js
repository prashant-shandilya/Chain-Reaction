import React from 'react'
import {useGlobalContext} from './Context.js'
function Header() {
    
  return (
    <>
        <div style={{display:"inline-block",width:"400px",height:"300px",border:"2px solid black",marginLeft:"550px"}}>
            <h3>Rules of the game-CHAIN REACTION</h3>
            <ul type="circle">
                <li> Two players play the game i.e red and green.
                </li>
                <li>They place their pieces alternatively, if the board is green it's green's turn if it's red then it's red's turn</li>
                <li>Players can either choose an empty cell or a cell where there is already their piece</li>
                <li>if the number of pieces exceeds the max. no of pieces that can be placed on the cell then it explodes in other direction capturing other player pieces.</li>
                <li>The game ends when a player has no pieces left on the borad.</li>
                <li>AI is coming.</li>
            </ul>
            
        </div>
    </>
  )
}

export default Header