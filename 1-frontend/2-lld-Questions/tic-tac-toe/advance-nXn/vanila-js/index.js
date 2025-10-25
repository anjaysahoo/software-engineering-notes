import doWeHaveAWinnerUtil from "./src/utils/do-we-have-a-winner.util.js";

const boardRef = document.getElementById("boardRef");

const size = 3;
let userInput = "X";
let countFilledCells = 0;

let rowArray = []
for(let r = 0; r < size; r++){
    let temp = ["", 0];
    rowArray.push(temp);
}

let colArray = []
for(let c = 0; c < size; c++){
    let temp = ["", 0];
    colArray.push(temp);
}

let leftDiagonalArray = ["", 0];
let rightDiagonalArray = ["", 0];

// let array = [];
//
// for(let i = 0; i < size; i++){
//     let temp = [];
//     for(let j = 0; j < size; j++){
//         temp.push("");
//     }
//     array.push(temp);
// }
//
// const calculateWhoIsWinner = () => {
//     for(let r = 0; r < size; r++){
//         if(array[r][0] === "X" || array[r][0] === "O"){
//             const val = array[r][0];
//             let playerWon = true;
//             for(let c = 0; c < size; c++){
//                 if(array[r][c] !== val){
//                     playerWon = false;
//                     break;
//                 }
//             }
//             if(playerWon){
//                 alert("Game is Over and player won is" + val);
//                 return;
//             }
//         }
//     }
//
//     for(let c = 0; c < size; c++){
//         if(array[0][c] === "X" || array[0][c] === "O"){
//             const val = array[0][c];
//             let playerWon = true;
//             for(let r = 0; r < size; r++){
//                 if(array[r][c] !== val){
//                     playerWon = false;
//                     break;
//                 }
//             }
//             if(playerWon){
//                 alert("Game is Over and player won is" + val);
//                 return;
//             }
//         }
//     }
//
//     if(array[0][0] === "X" || array[0][0] === "O"){
//         const val = array[0][0];
//         let playerWon = true;
//         for(let j = 0; j < size; j++){
//             if(array[j][j] !== val){
//                 playerWon = false;
//                 break;
//             }
//         }
//         if(playerWon){
//             alert("Game is Over and player won is" + val);
//             return;
//         }
//     }
//
//     if(array[0][size - 1] === "X" || array[0][size - 1] === "O"){
//         const val = array[0][size - 1];
//         let playerWon = true;
//         for(let j = 0; j < size; j++){
//             if(array[size - 1 - j][size - 1 - j] !== val){
//                 playerWon = false;
//                 break;
//             }
//         }
//         if(playerWon){
//             alert("Game is Over and player won is " + val);
//             return;
//         }
//     }
// }

const changePlayer = (event) => {
    console.log("change player called");
    const selectedElement = event.target;
    console.log("selectedElement", selectedElement.nodeName);

    if(selectedElement.nodeName === "DIV" &&
    selectedElement.classList.contains("tic-tac-toe__row__cell")){

        if(selectedElement.innerText !== ""){
            alert("Please select an empty cell");
            return;
        }

        countFilledCells++;

        const x = selectedElement.dataset.x;
        const y = selectedElement.dataset.y;
        selectedElement.innerText = userInput;

        const result = doWeHaveAWinnerUtil(Number(x), Number(y),
            userInput, size, rowArray, colArray,
            leftDiagonalArray, rightDiagonalArray);

        if(result){
            alert("Game is Over and player won is " + userInput);
            return;
        }

        if(!result &&countFilledCells === size * size){
            alert("Game is tie");
        }

        userInput === "X" ? userInput = "O" : userInput = "X";


    }
}

/**
 * Here we are using "Event Bubbling": Event Bubbling is a concept in the DOM (Document Object Model).
 * It happens when an element receives an event, and that event bubbles up (or you can say is transmitted
 * or propagated) to its parent and ancestor elements in the DOM tree until it gets to the root element.
 */
boardRef.addEventListener("click", (event) => {
    changePlayer(event);
});

for(let i = 0; i < size; i++){
    const row = document.createElement("div");
    row.classList.add("tic-tac-toe__row");
    for(let j = 0; j < size; j++){
        const cell = document.createElement("div");
        cell.dataset.x = i;
        cell.dataset.y = j;
        cell.classList.add("tic-tac-toe__row__cell");
        row.append(cell);
    }
    boardRef.append(row)
}

