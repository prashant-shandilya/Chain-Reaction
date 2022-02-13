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
<Main.Provider value = {{player,Check,UpBoard,game,zeroSquare,changePlayer,checkWin,reset,winner,modal}}>
{children}
</Main.Provider>
        </>
    )


}

export const useGlobalContext = () => {
return useContext(Main);
}

export {AppProvider,Main};