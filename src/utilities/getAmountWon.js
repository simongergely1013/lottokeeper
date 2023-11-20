
const getAmountWon = (arr) => {
    switch(arr.length){
        case 2: 
         return 1000;
        case 3:
            return 1500;
        case 4:
            return 2000;
        case 5:
            return 2500;
        default:
            return 0;            
    }
}

export default getAmountWon;