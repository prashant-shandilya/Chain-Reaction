import React,{useEffect,useState} from 'react';
import {useGlobalContext} from './Context.js';
import Blob from './Blob.js'
<link rel="stylesheet" href="./index.css" />
function Square({index,game}) {
    let {player,Check,UpBoard,zeroSquare,changePlayer} = useGlobalContext();
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
      
      if(player===status[0]||status[0]===-1)
      {// console.log("normal increment");
        UpBoard(status,index,true)
        changePlayer();
      }

    }
    bkgrnd = colors()[1];
    color = colors()[0];
  return(
  <>
    <div style={{display:"inline-block",width:"100px",height:"100px",position:"relative",borderColor:color,borderStyle:"solid",backgroundColor:bkgrnd}} onClick={()=>{myFun()}}>

      <Blob  index={index} status={game[index]}/>
    </div>
  </>
  )

}

export default Square;
