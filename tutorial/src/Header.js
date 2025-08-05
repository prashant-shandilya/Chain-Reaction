import React from 'react'
import {useGlobalContext} from './Context.js'
function Header() {
    const { player, aiMode, toggleAiMode, difficulty, changeDifficulty, aiThinking } = useGlobalContext();
    
    function getCurrentPlayerDisplay() {
        if (aiMode) {
            if (player === 0) {
                return "Human's Turn (Green)";
            } else {
                return aiThinking ? "AI is thinking..." : "AI's Turn (Red)";
            }
        } else {
            return player === 0 ? "Green Player's Turn" : "Red Player's Turn";
        }
    }

    function getPlayerColor() {
        if (aiMode && player === 1 && aiThinking) {
            return "#ff9800"; // Orange when AI is thinking
        }
        return player === 0 ? "green" : "red";
    }
    
  return (
    <>
        <div style={{display:"flex", gap:"20px", marginLeft:"200px", marginBottom:"20px"}}>
            {/* Game Rules */}
            <div style={{display:"inline-block",width:"400px",height:"300px",border:"2px solid black"}}>
                <h3>Rules of the game-CHAIN REACTION</h3>
                <ul type="circle">
                    <li> Two players play the game i.e red and green.
                    </li>
                    <li>They place their pieces alternatively, if the board is green it's green's turn if it's red then it's red's turn</li>
                    <li>Players can either choose an empty cell or a cell where there is already their piece</li>
                    <li>if the number of pieces exceeds the max. no of pieces that can be placed on the cell then it explodes in other direction capturing other player pieces.</li>
                    <li>The game ends when a player has no pieces left on the board.</li>
                    <li style={{color: "green", fontWeight: "bold"}}>✓ AI is now available!</li>
                </ul>
            </div>

            {/* AI Controls */}
            <div style={{display:"inline-block",width:"300px",height:"300px",border:"2px solid black", padding:"10px"}}>
                <h3>Game Controls</h3>
                
                {/* Current Player Status */}
                <div style={{
                    padding: "10px", 
                    border: "2px solid " + getPlayerColor(), 
                    backgroundColor: player === 0 ? "#e8f5e8" : "#ffe8e8",
                    borderRadius: "5px",
                    marginBottom: "15px",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: getPlayerColor()
                }}>
                    {getCurrentPlayerDisplay()}
                </div>

                {/* AI Mode Toggle */}
                <div style={{marginBottom: "15px"}}>
                    <label style={{fontWeight: "bold"}}>Game Mode:</label>
                    <div>
                        <button 
                            onClick={toggleAiMode}
                            style={{
                                padding: "8px 16px",
                                backgroundColor: aiMode ? "#4CAF50" : "#2196F3",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "14px"
                            }}
                        >
                            {aiMode ? "Human vs AI" : "Human vs Human"}
                        </button>
                    </div>
                </div>

                {/* Difficulty Selection */}
                {aiMode && (
                    <div style={{marginBottom: "15px"}}>
                        <label style={{fontWeight: "bold"}}>AI Difficulty:</label>
                        <div style={{display: "flex", gap: "5px", marginTop: "5px"}}>
                            {['easy', 'medium', 'hard'].map(level => (
                                <button
                                    key={level}
                                    onClick={() => changeDifficulty(level)}
                                    style={{
                                        padding: "5px 10px",
                                        backgroundColor: difficulty === level ? "#FF5722" : "#f0f0f0",
                                        color: difficulty === level ? "white" : "black",
                                        border: "1px solid #ccc",
                                        borderRadius: "3px",
                                        cursor: "pointer",
                                        fontSize: "12px",
                                        textTransform: "capitalize"
                                    }}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Game Info */}
                <div style={{fontSize: "12px", color: "#666"}}>
                    <p><strong>How AI works:</strong></p>
                    <ul style={{margin: "5px 0", paddingLeft: "15px"}}>
                        <li><strong>Easy:</strong> Random moves with basic strategy</li>
                        <li><strong>Medium:</strong> Good strategy with some randomness</li>
                        <li><strong>Hard:</strong> Advanced strategy, no mistakes</li>
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default Header