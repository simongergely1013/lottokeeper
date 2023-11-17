import { ACTIONS } from ".";

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

export const placeNumber = (num) => async (dispatch, getState) => {
    const state = getState();
    const {currentSelectedNums} = state.userGame;
    currentSelectedNums.push(num)
    if(currentSelectedNums.length === 5){
        dispatch({type: ACTIONS.COMPLETE_TICKET, payload: currentSelectedNums})
    } else{
        dispatch({type: ACTIONS.PLACE_NUMBER, payload: currentSelectedNums})
    }
}

export const startLotto = (dispatch) => {
    let winnerNums = [];
    for(let i = 0; i < 5; i++){
        let num = getRandomIntInclusive(1,39)
    while(winnerNums.includes(num)){
            num = getRandomIntInclusive(1,39)
        }
        winnerNums.push(num)
    }
    dispatch({type: ACTIONS.START_LOTTO, payload: winnerNums})
}

export const playNew = (dispatch) => {
    dispatch({type: ACTIONS.PLAY_NEW})
}

export const reset = (dispatch) => {
    dispatch({type: ACTIONS.RESET, payload: []})
}

export const clearTicketHistory = (dispatch) => {
    dispatch({type: ACTIONS.CLEAR_TICKET_HISTORY})
}

export const completeTicket = (dispatch) => {
    dispatch({type: ACTIONS.COMPLETE_TICKET})
}