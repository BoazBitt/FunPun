const placeWordsInMatrix = (matrixSize, wordsArray) => {
    const maxLength = matrixSize - 1;
    const lowercaseData = wordsArray.map(obj => ({
        ...obj,
        content: obj.content.toLowerCase()
        // content: obj.content.toUpperCase()
    }));
    const matrix = Array.from({ length: matrixSize }, () =>
        Array.from({ length: matrixSize }, () => false)
    );

    const getRandomDirection = ()=> {
        const directions = ['leftToRight', 'topToBottom', 'diagonal'];
        return directions[Math.floor(Math.random() * directions.length)];
    }
    const getRandomPosition =(direction, wordLength) => {
        let row, col;
        if (direction === 'leftToRight') {
            row = Math.floor(Math.random() * matrixSize);
            col = Math.floor(Math.random() * (matrixSize - wordLength + 1));
        } else if (direction === 'topToBottom') {
            row = Math.floor(Math.random() * (matrixSize - wordLength + 1));
            col = Math.floor(Math.random() * matrixSize);
        } else if (direction === 'diagonal') {
            row = Math.floor(Math.random() * (matrixSize - wordLength + 1));
            col = Math.floor(Math.random() * (matrixSize - wordLength + 1));
        }
        return { row, col };
    }


    const canPlaceWord = (direction, word, row, col)=> {
        for (let i = 0; i < word.length; i++) {
            if (
                direction === 'leftToRight' &&
                matrix[row][col + i] !== false &&
                matrix[row][col + i] !== word[i]
            ) {
                return false;
            } else if (
                direction === 'topToBottom' &&
                matrix[row + i][col] !== false &&
                matrix[row + i][col] !== word[i]
            ) {
                return false;
            } else if (
                direction === 'diagonal' &&
                matrix[row + i][col + i] !== false &&
                matrix[row + i][col + i] !== word[i]
            ) {
                return false;
            }
        }
        return true;
    }

    const placeWord = (direction, word, row, col) =>{
        for (let i = 0; i < word.length; i++) {
            if (direction === 'leftToRight') {
                matrix[row][col + i] = word[i];
            } else if (direction === 'topToBottom') {
                matrix[row + i][col] = word[i];
            } else if (direction === 'diagonal') {
                matrix[row + i][col + i] = word[i];
            }
        }
    }

    const  getRandomLetter = () =>{
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        const randomLetter = alphabet[randomIndex];
        return randomLetter;
    }

    for (const word of lowercaseData) {
        let direction, wordLength, row, col, placed = false;
        wordLength = Math.min(maxLength, word.content.length);
        while (!placed) {
            direction = getRandomDirection();
            ({ row, col } = getRandomPosition(direction, wordLength));
            if (canPlaceWord(direction, word.content, row, col)) {
                placeWord(direction, word.content, row, col);
                placed = true;
            }
        }
    }
    
    for (let i = 0; i < matrixSize; i++) {
        for (let j = 0; j < matrixSize; j++) {
            if (matrix[i][j] === false) {
                matrix[i][j] = getRandomLetter();
            }
        }
    }   
    return matrix;

 

}

export default placeWordsInMatrix;