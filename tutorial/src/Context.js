import React,{useContext,useState} from 'react';
const Main = React.createContext(null);

const corner = [0,8,72,80];

const upsides = [1,2,3,4,5,6,7];
const lefSide = [9,18,27,36,45,54,63];
const riSide = [17,26,35,44,53,62,71];
const dowSide = [73,74,75,76,77,78,79];
let count = 0;
function AppProvider ({children})  {
     let [game,setGame] = useState([[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0]]) // An array of arrays representing the Board i.e the position of player Blobs.
     let [player,setPlayer] = useState(0); // 0 for red and 1 for green
     let [modal,setModal] = useState(false);
     let [winner,setWinner] = useState('');
     let [aiMode, setAiMode] = useState(false); // false = human vs human, true = human vs AI
     let [difficulty, setDifficulty] = useState('medium'); // easy, medium, hard
     let [aiThinking, setAiThinking] = useState(false);

     function toggleAiMode() {
         setAiMode(!aiMode);
         reset(); // Reset game when switching modes
     }

     function changeDifficulty(newDifficulty) {
         setDifficulty(newDifficulty);
     }

     function changePlayer(){
        if(player===0)setPlayer(1);
        else setPlayer(0);
       count++;
         }

         function reset(){
            
            document.location.reload();
         }

     function checkWin(){
         let num = [0,0];
         if(count>2){
        game.forEach(item=>{if(item[0]===0)num[0]++;else if (item[0]===1) num[1]++;});
            
        if(num[0]===0){console.log("Player 1 looses");setWinner("RED");setModal(true);}
        else if (num[1]===0){console.log("Player 2 looses");setWinner("GREEN");setModal(true);}
        
         }
    
     }

    // AI Move Evaluation Functions
    function getValidMoves() {
        const validMoves = [];
        for (let i = 0; i < 81; i++) {
            if (game[i][0] === -1 || game[i][0] === 1) { // Empty or AI's own pieces (AI is player 1)
                validMoves.push(i);
            }
        }
        return validMoves;
    }

    function evaluateMove(index) {
        // Create a copy of the current game state
        const testGame = game.map(cell => [...cell]);
        
        // Simulate the move
        if (testGame[index][0] === -1) {
            testGame[index][0] = 1; // AI is player 1 (red)
            testGame[index][1] = 1;
        } else {
            testGame[index][1]++;
        }

        let score = 0;
        
        // Check if this move would cause an explosion
        const [willExplode, affectedCells] = Check(index, testGame[index][1]);
        if (willExplode) {
            // Bonus for causing explosions
            score += affectedCells.length * 10;
            
            // Check how many opponent pieces this could capture
            affectedCells.forEach(cellIndex => {
                if (testGame[cellIndex] && testGame[cellIndex][0] === 0) {
                    score += 20; // High bonus for capturing opponent pieces
                }
            });
        }

        // Defensive bonus: prefer moves that don't create opportunities for opponent
        const adjacentCells = getAdjacentCells(index);
        adjacentCells.forEach(adjIndex => {
            if (testGame[adjIndex] && testGame[adjIndex][0] === 0) {
                const maxCapacity = getMaxCapacity(adjIndex);
                if (testGame[adjIndex][1] === maxCapacity - 1) {
                    score -= 15; // Penalty for giving opponent explosion opportunity
                }
            }
        });

        // Positional bonus: prefer central positions early in the game
        if (count < 10) {
            const row = Math.floor(index / 9);
            const col = index % 9;
            const centerDistance = Math.abs(row - 4) + Math.abs(col - 4);
            score += (8 - centerDistance) * 2;
        }

        return score;
    }

    function getAdjacentCells(index) {
        const adjacent = [];
        const row = Math.floor(index / 9);
        const col = index % 9;

        // Up, Down, Left, Right
        if (row > 0) adjacent.push(index - 9);
        if (row < 8) adjacent.push(index + 9);
        if (col > 0) adjacent.push(index - 1);
        if (col < 8) adjacent.push(index + 1);

        return adjacent;
    }

    function getMaxCapacity(index) {
        if (corner.includes(index)) return 2;
        if (upsides.includes(index) || dowSide.includes(index) || lefSide.includes(index) || riSide.includes(index)) return 3;
        return 4;
    }

    function makeAiMove() {
        if (!aiMode || player !== 1 || modal) return;

        setAiThinking(true);
        
        setTimeout(() => {
            const validMoves = getValidMoves();
            if (validMoves.length === 0) {
                setAiThinking(false);
                return;
            }

            let bestMove = validMoves[0];
            let bestScore = -Infinity;

            // Evaluate each valid move
            validMoves.forEach(move => {
                let score = evaluateMove(move);
                
                // Add randomness based on difficulty
                if (difficulty === 'easy') {
                    score += Math.random() * 50 - 25; // High randomness
                } else if (difficulty === 'medium') {
                    score += Math.random() * 20 - 10; // Medium randomness
                }
                // Hard mode has no randomness

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            });

            // Execute the move
            const currentStatus = game[bestMove];
            UpBoard(currentStatus, bestMove, true);
            changePlayer();
            setAiThinking(false);
        }, difficulty === 'easy' ? 500 : difficulty === 'medium' ? 1000 : 1500);
    }

    function UpBoard(status,index,flag){
        setGame(game.map((item,indu)=>{if(indu===index){if(flag)item[0]=player;else item[0]=status[0];item[1]++;return item;}else return item}));
        
        // console.log(game);
        // changePlayer();

        // console.log(game);
    }
    const Check = (index,number) => {
        // console.log(index);
        // console.log(number);
        if(corner.includes(index))
        {
            if(number>1) {
                if(index===0)return [true,[1,9]];
                if(index===8)return [true,[7,17]];
                if(index===72)return [true,[63,73]];
                if(index===80)return [true,[71,79]];
            }
            else return [false,[]]
        }
        else if(lefSide.includes(index)){
            if(number>2){return [true,[index-9,index+1,index+9]]}
            else return [false,[]]
        }
        else if(riSide.includes(index)){
            if(number>2){return [true,[index-9,index-1,index+9]]}
            else return [false,[]]
        }
        else if(dowSide.includes(index)){
            if(number>2){return [true,[index-1,index-9,index+1]]}
            else return [false,[]]
        }
        else if(upsides.includes(index)){
            if(number>2){return [true,[index-1,index+1,index+9]]}
            else return [false,[]]
        }
        else {
            if(number===4){
                return [true,[index-1,index+1,index-9,index+9]]
                
            }
            else if (number===5){
                return [true,[index-1,index+1,index-9,index+9,index]]
            }
            else return [false,[]]
        }
    }

    function zeroSquare(index){
        let temp = game;
        temp[index][0] = -1;
        temp[index][1] = 0;  // Check this logic sometimes after.
        setGame(temp);
    }


return (
        <>
<Main.Provider value = {{player,Check,UpBoard,game,zeroSquare,changePlayer,checkWin,reset,winner,modal,aiMode,toggleAiMode,difficulty,changeDifficulty,aiThinking,makeAiMove}}>
{children}
</Main.Provider>
        </>
    )


}

export const useGlobalContext = () => {
return useContext(Main);
}

export {AppProvider,Main};