import React from 'react'
import {useGlobalContext} from './Context.js'
function Modal() {
    let {reset,winner,aiMode} = useGlobalContext();
    
    function getWinnerMessage() {
        if (aiMode) {
            if (winner === "GREEN") {
                return "🎉 Human Wins! 🎉";
            } else {
                return "🤖 AI Wins! 🤖";
            }
        } else {
            return `🎉 ${winner} Player Wins! 🎉`;
        }
    }

    function getWinnerColor() {
        return winner === "GREEN" ? "green" : "red";
    }

  return (
    <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "400px",
        height: "200px",
        border: "3px solid " + getWinnerColor(),
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        zIndex: 1000
    }}>
        <h2 style={{
            color: getWinnerColor(),
            textAlign: "center",
            margin: "10px 0",
            fontSize: "24px"
        }}>
            {getWinnerMessage()}
        </h2>
        
        {aiMode && (
            <p style={{
                textAlign: "center",
                margin: "10px 0",
                color: "#666",
                fontSize: "14px"
            }}>
                {winner === "GREEN" ? "You defeated the AI!" : "Better luck next time!"}
            </p>
        )}
        
        <button 
            onClick={() => reset()}
            style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: getWinnerColor(),
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px"
            }}
        >
            Play Again
        </button>
    </div>
  )
}

export default Modal