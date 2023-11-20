import getWinnerNums from "./getWinnerNums";
import getAmountWon from "./getAmountWon";

const updateOwnerBalance = (ownerBalance, selectedNums, winnerNums) => {
    return ((ownerBalance + 500) - getAmountWon(getWinnerNums(selectedNums, winnerNums)))
}

export default updateOwnerBalance;