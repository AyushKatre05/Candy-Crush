import React, { useEffect, useState } from "react";
import red from './assets/red.webp'
import orange from './assets/orange.webp'
import yellow from './assets/yellow.webp'
import green from './assets/green.webp'
import purple from './assets/purple.webp'
import blue from './assets/blue.webp'
import logo from './assets/logo.png'
import blank from './assets/blank.jpg'
import Score from "./Score";

const width = 8;

const candyColors = [blue,yellow,orange,purple,red,green,blank];

const App = () => {
  const [curr, setCurr] = useState([]);
  const [drag, setDrag] = useState(null);
  const [replace, setReplace] = useState(null);
  const [score,setScore] = useState(0);

  const createBoard = () => {
    const randomArrangement = [];

    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomArrangement.push(randomColor);
    }
    setCurr(randomArrangement);
  };


  const onStart = (e)=>{
    setDrag(e.target)
  }
  
    const Drop = (e)=>{
      setReplace(e.target)
    }

  const onEnd = ()=>{
    const dragId = parseInt(drag.getAttribute('data-id'))
    const replaceId = parseInt(replace.getAttribute('data-id'))
    curr[replaceId] = drag.getAttribute('src')
    curr[dragId] = replace.getAttribute('src')
    
    const validMoves = [
      dragId-1,
      dragId-width,
      dragId+1,
      dragId+width
    ]

    const valid = validMoves.includes(replaceId)

     const isFourCol =  fourCheckCol()
     const isFourRow =  fourCheckRow()
     const isThreeCol =  threeCheckCol()
     const isThreeRow =  threeCheckRow()

     if(replaceId && valid && (isFourCol || isFourRow || isThreeCol || isThreeRow)){
      setDrag(null)
      setReplace(null)
     }else {
      curr[replaceId] = replace.getAttribute('src')
      curr[dragId] = drag.getAttribute('src')
      setCurr([...curr])
     }
  }


  useEffect(() => {
    createBoard();
  }, []);

  const moveDown = () => {
    for (let i = 0; i < 56; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && curr[i] === blank) {
        let randomNum = Math.floor(Math.random() * candyColors.length);
        curr[i] = candyColors[randomNum];
      }

      if (curr[i + width] === blank) {
        curr[i + width] = curr[i];
        curr[i] = blank;
      }
    }
  };

  const fourCheckCol = () => {
    for (let i = 0; i < 39; i++) {
      const colFour = [i, i + width, i + width * 2, i + width * 3];
      const decidecolor = curr[i];
      const isBlank = curr[i] === blank

      if (colFour.every((sq) => curr[sq] === decidecolor && !isBlank)) {
        setScore((score)=>score+40);
        colFour.forEach((sq) => (curr[sq] = blank));
        return true;
      }
    }
  };

  const fourCheckRow = () => {
    for (let i = 0; i < 64; i++) {
      const rowFour = [i, i + 1, i + 2, i + 3];
      const decidecolor = curr[i];
      const isBlank = curr[i] === blank
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      if (notValid.includes(i)) continue;

      if (rowFour.every((sq) => curr[sq] === decidecolor && !isBlank)) {
        setScore((score)=>score+40);
        rowFour.forEach((sq) => (curr[sq] = blank));
        return true;
      }
    }
  };

  const threeCheckCol = () => {
    for (let i = 0; i < 47; i++) {
      const colThree = [i, i + width, i + width * 2];
      const decidecolor = curr[i];
      const isBlank = curr[i] === blank

      if (colThree.every((sq) => curr[sq] === decidecolor && !isBlank)) {
        setScore((score)=>score+30);
        colThree.forEach((sq) => (curr[sq] = blank));
        return true;
      }
    }
  };

  const threeCheckRow = () => {
    for (let i = 0; i < 64; i++) {
      const rowThree = [i, i + 1, i + 2];
      const decidecolor = curr[i];
      const isBlank = curr[i] === blank
      const notValid = [6, 7, 14, 15, 22, 23, 38, 39, 46, 47, 54, 55, 63, 64];
      if (notValid.includes(i)) continue;

      if (rowThree.every((sq) => curr[sq] === decidecolor && !isBlank)) {
        setScore((score)=>score+30);
        rowThree.forEach((sq) => (curr[sq] = blank));
        return true;
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      fourCheckCol();
      fourCheckRow();
      threeCheckCol();
      threeCheckRow();
      moveDown();
      setCurr([...curr]);
    }, 50);

    return () => clearInterval(timer);
  }, [
    fourCheckCol,
    fourCheckRow,
    threeCheckCol,
    threeCheckRow,
    moveDown,
    curr,
  ]);


  return (
    <div className="flex flex-col justify-center items-center">
    <img src={logo} className="h-[180px] w-[180px]" alt="" srcset="" />
      <div className="h-[360px] mt-5 w-[360px] md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px] flex flex-wrap  bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100
">
        {curr.map((color, i) => (
          <img
          src={color}
          data-id = {i}
            key={i}
            className="h-[44px] w-[44px] md:w-[59px] md:h-[59px] lg:h-[69px] lg:w-[69px]"
            draggable={true}
            onDrop={Drop}
            onDragStart={onStart}
            onDragEnd={onEnd}
            onDragOver={(e)=>e.preventDefault()}
            onDragEnter={(e)=>e.preventDefault()}
            onDragLeave={(e)=>e.preventDefault()}
          />
        ))}
      </div>
      <Score score={score}/>
    </div>
  );
};

export default App;
