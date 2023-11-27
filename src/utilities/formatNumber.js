const formatNumber = (number) => {
  
    let formattedNumber = number.toString();
    formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedNumber;
  }

  export default formatNumber;