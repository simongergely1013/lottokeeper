import { ACTIONS } from ".";
import getRandomIntInclusive from "../../utilities/getRandomIntInclusive";

export const placeNumberUser = (num) => async (dispatch, getState) => {
    const state = getState();
    const {currentSelectedNums} = state.data.user;
    currentSelectedNums.push(num)
    if(currentSelectedNums.length === 5){
        dispatch({type: ACTIONS.USER.COMPLETE_TICKET, payload: currentSelectedNums})
    } else{
        dispatch({type: ACTIONS.USER.PLACE_NUMBER, payload: currentSelectedNums})
    }
}

// export const completeTicketUser = (dispatch) => {
//     dispatch({type: ACTIONS.USER.COMPLETE_TICKET})
// }

export const startLotto = (dispatch) => {
    let winnerNums = [];
    for(let i = 0; i < 5; i++){
        let num = getRandomIntInclusive(1,39)
    while(winnerNums.includes(num)){
            num = getRandomIntInclusive(1,39)
        }
        winnerNums.push(num)
    }
    dispatch({type: ACTIONS.USER.START_LOTTO, payload: winnerNums})
}

export const playNewUser = (dispatch) => {
    dispatch({type: ACTIONS.USER.PLAY_NEW})
}


export const clearTicketHistoryUser = (dispatch) => {
    dispatch({type: ACTIONS.USER.CLEAR_TICKET_HISTORY})
}


export const resetAll = (dispatch) => {
    dispatch({type: ACTIONS.RESET_ALL})
}