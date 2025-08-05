import React,{useEffect,useState} from 'react';
import {useGlobalContext} from './Context.js';
import Blob from './Blob.js'
<link rel="stylesheet" href="./index.css" />
function Square({index,game}) {
    let {player,Check,UpBoard,zeroSquare,changePlayer,aiMode,aiThinking} = useGlobalContext();
    let bkgrnd,color;

    function colors (){
      if(player===1)return ['red','pink'];
      else return ['green','lightgreen'];
   }
    let [status,setStatus] = useState(game[index]);
    // let [flag,setFlag] = useState(false);

    // function animation(val){
    //   if(val){
    //     setFlag(true);
    //   }
    //   else{
    //     setFlag(false);
    //   }
    // }

    useEffect(()=>{
      // myFun(false);
      // console.log(status) 
      setInterval(()=>{if(Check(index,status[1])[0])
      {
        // console.log("error at " + status[0]);
        //  setTimeout(()=>{Check(index,(status[1]))[1].forEach((item)=>{UpBoard(status,item,false)});animation(false)},3000);
        Check(index,(status[1]))[1].forEach((item)=>{UpBoard(status,item,false)});
        zeroSquare(index);
        // animation(true);
      }},500);

    },[]);
    
    
    function myFun(){
      // Prevent human moves during AI's turn
      if (aiMode && player === 1) return;
      
      if(player===status[0]||status[0]===-1)
      {// console.log("normal increment");
        UpBoard(status,index,true)
        changePlayer();
      }

    }

    function isClickable() {
        // In AI mode, only allow clicks when it's human's turn (player 0)
        if (aiMode && (player === 1 || aiThinking)) return false;
        // In human vs human mode, always allow clicks
        if (!aiMode) return true;
        // Allow click if it's empty or belongs to current player
        return (player === status[0] || status[0] === -1);
    }

    function getSquareStyle() {
        const baseStyle = {
            display:"inline-block",
            width:"100px",
            height:"100px",
            position:"relative",
            borderColor:color,
            borderStyle:"solid",
            backgroundColor:bkgrnd
        };

        // Add visual feedback for AI mode
        if (aiMode && player === 1) {
            baseStyle.opacity = "0.7";
            baseStyle.cursor = "not-allowed";
        } else if (isClickable()) {
            baseStyle.cursor = "pointer";
        } else {
            baseStyle.cursor = "default";
        }

        return baseStyle;
    }

    bkgrnd = colors()[1];
    color = colors()[0];
  return(
  <>
    <div style={getSquareStyle()} onClick={()=>{if(isClickable()) myFun()}}>

      <Blob  index={index} status={game[index]}/>
    </div>
  </>
  )

}

export default Square;
