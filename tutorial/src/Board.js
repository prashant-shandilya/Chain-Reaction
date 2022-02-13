import React,{useEffect} from 'react';
import {useGlobalContext} from './Context.js'
import Square from './Square.js'
<link rel="stylesheet" href="./index.css" />
function Board() {

   let {game,checkWin,player} = useGlobalContext();
   
   useEffect(()=>{
      setInterval(()=>checkWin(),1000);
   },[])

    return(
    <>
     <div className="Board" style={{width:"940px",marginLeft:"250px",border:"1px solid grey",display:"grid",gridTemplateColumns:"repeat(9,1fr)"}}>
        {game.map((item,index)=>
           <Square key={index}  index={index} game={game}/>
        )}
     </div>
    </>
    )
}

export default Board;
