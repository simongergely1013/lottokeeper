import getWinnerNums from "./getWinnerNums";
import getAmountWon from "./getAmountWon";

const updateUserBalance = (userBalance, selectedNums, winnerNums) => {
    return ((userBalance - 500) + getAmountWon(getWinnerNums(selectedNums, winnerNums)))
}

export default updateUserBalance;