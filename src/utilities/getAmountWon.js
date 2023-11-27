
const getAmountWon = (arr) => {
    switch(arr.length){
        case 2: 
         return 1000;
        case 3:
            return 2000;
        case 4:
            return 3500;
        case 5:
            return 5000;
        default:
            return 0;            
    }
}

export default getAmountWon;