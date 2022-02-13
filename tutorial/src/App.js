import React,{useState} from 'react';
import Board from './Board.js'
import Header from './Header.js'
import {useGlobalContext} from './Context.js'
import Modal from './Modal.js'
function App() {
    let {modal} = useGlobalContext();
    return(
    <>
    {modal?<Modal/>:<Header/>}
    
   <Board/>
    </>
    )
}

export default App;
