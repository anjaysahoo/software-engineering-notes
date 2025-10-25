import './App.css';
import {useState} from 'react';

const n = 5;

export default function App() {
    const [board, setBoard] = useState(Array(n).fill(Array(n).fill(null)));
    const [isXPlaying, setIsXPlaying] = useState(true);

    const calculateWinner = () => {
        for(let r = 0; r < n; r++){
            const player = board[r][0];

            if(player === null)
                continue;

            let winnerFound = true;
            for(let c = 0; c < n; c++){
                if(board[r][c] !== player){
                    winnerFound = false;
                    break;
                }
            }

            if(winnerFound)
                return player;
        }

        for(let c = 0; c < n; c++){
            const player = board[0][c];

            if(player === null)
                continue;

            let winnerFound = true;
            for(let r = 0; r < n; r++){
                if(board[r][c] !== player){
                    winnerFound = false;
                    break;
                }
            }

            if(winnerFound)
                return player;
        }

        // Left Diagonal
        let player = board[0][0];
        if(player !== null){
            let winnerFound = true;

            for(let i = 0; i < n; i++){
                if(board[i][i] !== player){
                    winnerFound = false;
                    break;
                }
            }

            if(winnerFound)
                return player;
        }


        // Right Diagonal
        player = board[0][n - 1];
        if(player !== null){
            let winnerFound = true;

            for(let i = 0; i < n; i++){
                if(board[i][n - i - 1] !== player){
                    winnerFound = false;
                    break;
                }
            }

            if(winnerFound)
                return player;
        }

        return null;
    }

    let winner = calculateWinner();

    function Cell({rowIndex,colIndex,turn,onClick}){
        return (
            <button
                // The aria-label attribute is set on each cell button.
                // It describes the action that will be performed when the
                // cell is clicked, indicating which cell will be marked as 'X' or 'O'.
                aria-label={
                    board[rowIndex][colIndex] == null
                        ? `Mark cell ${rowIndex+colIndex} as ${turn}`
                        : undefined
                }
                onClick={onClick}
                disabled={board[rowIndex][colIndex] !== null || winner !== null}
                className="cell"
            >
                {/*The <span> element inside each cell button has the aria-hidden attribute set to true.
                This hides the cell mark (X or O) from screen readers, as the mark is already announced
                using the aria-label attribute on the button itself. This avoids redundant or confusing
                information for users of assistive technologies.*/}
                <span aria-hidden={true}>
                    {board[rowIndex][colIndex]}
                </span>
            </button>
        )
    }

    const getMessageForHeading = () => {
        if(winner !== null)
            return `Player ${winner} wins!`;

        let isAllFilled = true;
        board.map((InnerArray) => !InnerArray.includes(null)).map((result) => {
            isAllFilled = isAllFilled & result;
        })

        if(isAllFilled)
            return `Match is a draw`;

        return `Player ${isXPlaying ? 'X' : "O"} turn`
    }


    return (
        <>
            {/*The aria-live attribute is set to "polite" on the <div> element containing
            the status message. It indicates that the content of the element may be updated
            dynamically and should be announced by screen readers.*/}
            <header aria-live="polite">{getMessageForHeading()}</header>
            <main style={{gridTemplateColumns: `repeat(${n},1fr)`}}>{
                Array(n).fill(null).map((_, index) => index).
                map((rowIndex) => {
                    console.log("rowIndex : ", rowIndex)

                    return Array(n).fill(null).map((_, index) => index).
                    map((colIndex) => {
                        const turn = isXPlaying ? 'X' : 'O';
                        console.log("colIndex : ", colIndex)

                        return <Cell
                            key={rowIndex+colIndex}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            turn={turn}
                            onClick={() => {
                                const newBoard = [...board.map(InnerArray => [...InnerArray])];
                                newBoard[rowIndex][colIndex]=turn;
                                setBoard(newBoard);
                                setIsXPlaying(!isXPlaying);
                            }}
                        />
                    })

                })
            }
            </main>
            <footer>
                <button
                    onClick={() => {
                        setBoard(Array(n).fill(Array(n).fill(null)));
                        setIsXPlaying(true);
                        winner = null;
                    }}
                >Reset</button>
            </footer>
        </>
    );
}
