import { useEffect, useState } from 'react';
import './App.css';
import cloneDeep from 'lodash.clonedeep';
import { getColors, useEvent } from './util';

function App() {

  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const [gameOver,setGameOver] = useState(false);


  // Initialize
  const initialize = () =>{
    let newGrid = cloneDeep(data);
    console.log(newGrid);

    addNumber(newGrid);
    console.table(newGrid);
    addNumber(newGrid);
    console.table(newGrid);
    setData(newGrid)
    
  }

  // AddNumber - Add an item
  const addNumber = (newGrid) =>{
    let added = false;
    let gridFull = false;
    let attempts = 0;
    while(!added){
      if(gridFull){
        break;
      }
      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);
      attempts++;
      if(newGrid[rand1][rand2] === 0){
        newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
      if(attempts > 50){
        gridFull = true;
        let GameOver = checkIfGameOver();
        if(GameOver){
          alert("game over");
          
        }
       
      }
    }
  }

  // Swipe - Left
  const swipeLeft = (dummy)=>{
    let oldGrid = data;
    let newArray = cloneDeep(data);

    console.table(newArray);
    for(let i=0;i<4;i++){
      let b = newArray[i];
      let slow = 0;
      let fast = 1;
      while (slow<4){
        if(fast === 4){
          fast = slow + 1;
          slow++;
          continue;
        }
        if(b[slow] === 0 && b[fast] === 0){
          fast++;
        }
        else if (b[slow] === 0 && b[fast] !==0){
          b[slow] = b[fast];
          b[fast]=0;
          fast++;
        }else if (b[slow] !==0 && b[fast] === 0){
          fast++;
        }else if(b[slow] !== 0 && b[fast] !==0){
          if(b[slow] === b[fast]){
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow + 1;
            slow++;
          }else{
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if(JSON.stringify(oldGrid) !== JSON.stringify(newArray)){
      addNumber(newArray);
    }
     

   if(dummy){
    return newArray;
   }
   else{
    setData(newArray);
   }
  };
  

  // Swipe - Right
  const swipeRight = (dummy)=>{
    let oldGrid = data;
    let newArray = cloneDeep(data);

   
    for(let i=3;i>=0;i--){
      let b = newArray[i];
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow>0){
        if(fast === -1){
          fast = slow - 1;
          slow--;
          continue;
        }
        if(b[slow] === 0 && b[fast] === 0){
          fast--;
        }
        else if (b[slow] === 0 && b[fast] !==0){
          b[slow] = b[fast];
          b[fast]=0;
          fast--;
        }else if (b[slow] !==0 && b[fast] === 0){
          fast--;
        }else if(b[slow] !== 0 && b[fast] !==0){
          if(b[slow] === b[fast]){
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow - 1;
            slow--;
          }else{
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if(JSON.stringify(oldGrid) !== JSON.stringify(newArray)){
      addNumber(newArray);
    }
     

    if(dummy){
      return newArray;
     }
     else{
      setData(newArray);
     }
  }

  // Swipe - Down
  const swipeDown = (dummy)=>{
    console.log(data);
    
    let b = [...data];
    let oldData = JSON.parse(JSON.stringify(data))

    for(let i=3;i>=0;i--){
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow>0){
        if(fast === -1){
          fast = slow - 1;
          slow--;
          continue;
        }
        if(b[slow][i] === 0 && b[fast][i] === 0){
          fast--;
        }
        else if (b[slow][i] === 0 && b[fast][i] !==0){
          b[slow][i] = b[fast][i];
          b[fast][i]=0;
          fast--;
        }else if (b[slow][i] !==0 && b[fast][i] === 0){
          fast--;
        }else if(b[slow][i] !== 0 && b[fast][i] !==0){
          if(b[slow][i] === b[fast][i]){
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow - 1;
            slow--;
          }else{
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if(JSON.stringify(b) !== JSON.stringify(oldData)){
      addNumber(b);
    }
     

    if(dummy){
      return b;
     }
     else{
      setData(b);
     }
  }


  // Swipe - Up
  const swipeUp = (dummy)=>{
    let b = [...data];
    let oldData = JSON.parse(JSON.stringify(data))

    for(let i=0;i<4;i++){
      let slow = 0;
      let fast = 1;
      while (slow<4){
        if(fast === 4){
          fast = slow + 1;
          slow++;
          continue;
        }
        if(b[slow][i] === 0 && b[fast][i] === 0){
          fast++;
        }
        else if (b[slow][i] === 0 && b[fast][i] !==0){
          b[slow][i] = b[fast][i];
          b[fast][i]=0;
          fast++;
        }else if (b[slow][i] !==0 && b[fast][i] === 0){
          fast++;
        }else if(b[slow][i] !== 0 && b[fast] !==0){
          if(b[slow][i] === b[fast][i]){
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow + 1;
            slow++;
          }else{
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if(JSON.stringify(oldData) !== JSON.stringify(b)){
      addNumber(b);
    }

    if(dummy){
      return b;
     }
     else{
      setData(b);
     }
    
  };


  // Check Gameover
  const checkIfGameOver = () =>{
    console.log("checking game over");
    
    // let original = cloneDeep(data);
    let checker = swipeLeft(true);
    if(JSON.stringify(data) !== JSON.stringify(checker)){
      return false
    }
    
    let checker2 = swipeDown(true);
    if(JSON.stringify(data) !== JSON.stringify(checker2)){
      return false
    }

    let checker3 = swipeRight(true);
    if(JSON.stringify(data) !== JSON.stringify(checker3)){
      return false
    }

    let checker4 = swipeUp(true);
    if(JSON.stringify(data) !== JSON.stringify(checker4)){
      return false
    }
    return true;
  }


  // Reset
  const resetGame = () =>{
    const emptyGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    addNumber(emptyGrid);
    addNumber(emptyGrid);
    setData(emptyGrid);
  };

  // Handle Key Down
  const handleKeyDown = (event)=>{
    if(gameOver){
      return;
    }
    switch(event.keyCode){
      case UP_ARROW:
        swipeUp();
        break;
        case DOWN_ARROW:
        swipeDown();
        break;
        case LEFT_ARROW:
        swipeLeft();
        break;
        case RIGHT_ARROW:
        swipeRight();
        break;
        default:
          break;

    }

    let gameOverr = checkIfGameOver();
    if(gameOverr){
      alert("game over");
      setGameOver(true)
    }
  }

  useEffect(()=>{
    initialize();
  },[])

  useEvent('keydown',handleKeyDown);


  return (

    <div className="App">
      <h1 style={{fontSize:"50px",textAlign:"center",color:"#846F5B"}} >2048</h1>
     
      
      <div
      style={{
        background: "#AD9D8F",
        width: "max-content",
        margin: "auto",
        padding: 5,
        borderRadius: 5,
        marginTop: 10,
      }}
    >
      {data.map((row, oneIndex) => {
        return (
          <div style={{ display: "flex" }} key={oneIndex}>
            {row.map((digit, index) => (
              <Block num={digit} key={index} />
            ))}
          </div>
        );
      })}


    </div>

    {gameOver}
      <div 
      onClick={resetGame}
      style={{
        padding: 10,
        background: "#846F5B",
        color:"#F8F5F0",
        width:95,
        margin: "auto",
        marginTop:20,
        borderRadius: 7,
        fontWeight: "900"
      }}>
        NEW GAME
      </div>
    </div>


    
  );
}

const Block = ({ num }) => {
  const { blockStyle } = style;


  return (
    <div
      style={{
        ...blockStyle,
        background: getColors(num),
        color: num === 2 || num === 4 ? "#645B52" : "white",
      }}
    >
      {num !== 0 ? num : ""}


    </div>
  );
};

const style = {
  blockStyle: {
    height: 80,
    width: 80,
    background: "lightgray",
    margin: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 45,
    fontWeight: "800",
    color: "white",
  },
};

export default App;
