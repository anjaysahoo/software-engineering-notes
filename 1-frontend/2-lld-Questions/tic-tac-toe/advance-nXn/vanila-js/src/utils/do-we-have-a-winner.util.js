
const doWeHaveAWinnerUtil = (x, y, userInput, size, rowArray, colArray,
                                  leftDiagonalArray, rightDiagonalArray) => {
    console.log("x : " + x + " y : " + y + " user : " + userInput);
    if(rowArray[x][0] === ""){
        rowArray[x][0] = userInput;
        rowArray[x][1]++;
    }
    else{
        if(rowArray[x][0] !== userInput){
            rowArray[x][0] = "no-winner";
        }
        else{
            rowArray[x][1]++;

            if(rowArray[x][1] === size){
                // alert("Game is Over and player won is " + rowArray[x][0]);
                return true;
            }
        }
    }

    if(colArray[y][0] === ""){
        colArray[y][0] = userInput;
        colArray[y][1]++;
    }
    else{
        if(colArray[y][0] !== userInput){
            colArray[y][0] = "no-winner";
        }
        else{
            colArray[y][1]++;

            if(colArray[y][1] === size){
                // alert("Game is Over and player won is " + colArray[y][0]);
                return true;
            }
        }
    }

    if(x === y) {
        console.log("inside left diagonal");
        if (leftDiagonalArray[0] === "") {
            leftDiagonalArray[0] = userInput;
            leftDiagonalArray[1]++;
        } else {
            if(leftDiagonalArray[0] !== userInput){
                leftDiagonalArray[0] = "no-winner";
            }
            else {
                leftDiagonalArray[1]++;

                if(leftDiagonalArray[1] === size){
                    // alert("Game is Over and player won is " + leftDiagonalArray[0]);
                    return true;
                }
            }
        }
    }

    if(x === size - 1 - y) {
        console.log("inside right diagonal");
        if (rightDiagonalArray[0] === "") {
            rightDiagonalArray[0] = userInput;
            rightDiagonalArray[1]++;
        } else {
            if(rightDiagonalArray[0] !== userInput){
                rightDiagonalArray[0] = "no-winner";
            }
            else {
                rightDiagonalArray[1]++;

                console.log("rightDiagonalArray[1] : ", rightDiagonalArray[1]);

                if(rightDiagonalArray[1] === size){
                    // alert("Game is Over and player won is " + rightDiagonalArray[0]);
                    return true;
                }
            }
        }
    }
}

export default doWeHaveAWinnerUtil;
