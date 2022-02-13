import React,{useRef,useEffect} from 'react';
<link rel="stylesheet" href="./index.css" />

function Blob({anim,index,status}) {
const myRef = useRef(null);
let tree;
function myColor(){
  if(status[0]===0)return 'green'
  else if (status[0]===1)return 'red';
  else return 'white';
}
  // if(anim){
  //   {console.log("inside anim")}
  //   return (
  //     <>
  //     <div className="right"></div>
  //     </>
  //   )
  // }
  // else{
  if(status[1]===0){
  return (
    <>
    <div></div>
    </>
  )
}
else if(status[1]===1){
  tree = myColor();
  return (
   <div style={{display:"inline-block",position:"absolute",top:"40px",left:"40px",height:"20px",width:"20px",backgroundColor:tree,borderRadius:"50%"}}/>
  )
}
else if(status[1]===2){
  tree = myColor();
  return (
    <>
    <div style={{display:"inline-block",width:"20px",position:"absolute",top:"40px",left:"15px",height:"20px",backgroundColor:tree,borderRadius:"50%"}}/>
   <div style={{display:"inline-block",width:"20px",position:"absolute",top:"40px",right:"15px",height:"20px",backgroundColor:tree,borderRadius:"50%"}}/>
    </>
  )
}
else if(status[1]===3){
  tree = myColor();
  return (
    <>
    <div style={{display:"inline-block",width:"20px",position:"absolute",top:"15px",left:"40px",height:"20px",backgroundColor:tree,borderRadius:"50%"}}/>
     <div style={{display:"inline-block",width:"20px",position:"absolute",bottom:"15px",left:"15px",height:"20px",backgroundColor:tree,borderRadius:"50%"}}/>
     <div style={{display:"inline-block",width:"20px",position:"absolute",bottom:"15px",right:"15px",height:"20px",backgroundColor:tree,borderRadius:"50%"}}/>
    </>
  )
}
else if(status[1]===4){
  return (
    <>
    <div></div>
    </>
  )
}
else {
  return (
    <div style={{display:"inline-block",position:"absolute",top:"40px",left:"40px",height:"20px",width:"20px",backgroundColor:tree,borderRadius:"50%"}}/>
   )
}}




export default Blob;
