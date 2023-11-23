import { ACTIONS } from ".";
import getRandomIntInclusive from "../../utilities/getRandomIntInclusive";

export const createUserName = (userName) => async (dispatch) => {
    dispatch({type: ACTIONS.USER.SET_USERNAME, payload: userName})
}

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
export const startLotto = (dispatch, getState) => {
    const state = getState();
    const {userBalance} = state.data.user;
    if(userBalance >= 500){
        let winnerNums = [];
        for(let i = 0; i < 5; i++){
            let num = getRandomIntInclusive(1,39)
        while(winnerNums.includes(num)){
                num = getRandomIntInclusive(1,39)
            }
            winnerNums.push(num)
        }
        dispatch({type: ACTIONS.USER.START_LOTTO, payload: winnerNums})
        setTimeout(() => {
            dispatch({type: ACTIONS.USER.CLEAR_CURRENT_SELECTED_NUMS})
        }, 3000)
    } else {
        return;
    }
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

export const sortTicketHistoryByHitsUser = (dispatch, getState) => {
    const state = getState(); 
    const {ticketHistory} = state.data.user;
    const hitsDescending = !state.data.user.hitsDescending;
    let ticketHistorySortedByHits = [];
    if(hitsDescending){
        ticketHistorySortedByHits = ticketHistory.sort((a,b) => b.userWinnerNums.length - a.userWinnerNums.length);
    } else if(!hitsDescending) {
        ticketHistorySortedByHits = ticketHistory.sort((a,b) => a.userWinnerNums.length - b.userWinnerNums.length);
    }
    dispatch({type: ACTIONS.USER.SORT_TICKET_HISTORY_BY_HITS, payload: ticketHistorySortedByHits})
}

export const sortTicketHistoryByPayoutUser = (dispatch, getState) => {
    const state = getState(); 
    const {ticketHistory} = state.data.user;
    const payoutDescending = !state.data.user.payoutDescending;
    let ticketHistorySortedByPayout = [];
    if(payoutDescending){
        ticketHistorySortedByPayout = ticketHistory.sort((a,b) => b.amountWon - a.amountWon);
    } else if([!payoutDescending]){
        ticketHistorySortedByPayout = ticketHistory.sort((a,b) => a.amountWon - b.amountWon);
    }
    dispatch({type: ACTIONS.USER.SORT_TICKET_HISTORY_BY_PAYOUT, payload: ticketHistorySortedByPayout})
}

export const sortTicketHistoryByDateUser = (dispatch, getState) => {
    const state = getState(); 
    const {ticketHistory} = state.data.user;
    const dateDescending = !state.data.user.dateDescending;
    let ticketHistorySortedByDate = [];
    if(dateDescending){
        ticketHistorySortedByDate = ticketHistory.sort((a,b) => new Date(b.date) - new Date(a.date));
    } else if([!dateDescending]){
        ticketHistorySortedByDate = ticketHistory.sort((a,b) => new Date(a.date) - new Date(b.date));
    }
    dispatch({type: ACTIONS.USER.SORT_TICKET_HISTORY_BY_DATE, payload: ticketHistorySortedByDate})
}