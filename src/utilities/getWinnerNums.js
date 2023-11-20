const getWinnerNums = (arr1,arr2) => {
    let frequency = {};
    let result = [];
  
    arr1.forEach(el => {
      if(frequency[el]){
        frequency[el]++
      } else{
        frequency[el] = 1;
      }
    })
  
    arr2.forEach(el => {
      if(frequency[el] > 0){
        result.push(el)
        frequency[el]--
      }
    })
    
    return result
  }

  export default getWinnerNums;