import { ACTIONS } from ".";
import {v4 as uuidv4} from 'uuid';
import getRandomIntInclusive from "../../utilities/getRandomIntInclusive";
import getWinnerNums from "../../utilities/getWinnerNums";
import getAmountWon from "../../utilities/getAmountWon";

//USER ACTIONS

export const createUserName = (userName) => async (dispatch) => {
    dispatch({type: ACTIONS.SET_USERNAME, payload: userName})
}

export const placeNumberUser = (num) => async (dispatch, getState) => {
    const state = getState();
    let {userCurrentSelectedNums} = state.data;
    if(userCurrentSelectedNums.length >= 5){
        return;
    } else{
        userCurrentSelectedNums.push(num)
        dispatch({type: ACTIONS.USER_PLACE_NUMBER, payload: userCurrentSelectedNums})
        if(userCurrentSelectedNums.length === 5){
            dispatch({type: ACTIONS.USER_UPDATE_TOTAL_PRICE, payload: 500})
        }
    }
}

export const addTicketUser = (dispatch, getState) => {
    const state = getState();
        const {userTicketHistory, userCurrentSelectedNums} = state.data;
        const date = new Date();
        const ticketHistoryUpdate = [...userTicketHistory,  {numsPlayed: userCurrentSelectedNums, id: uuidv4(), date: date.toString().slice(0,24), isGenerated: false}]

        dispatch({type: ACTIONS.USER_ADD_TICKET, payload: ticketHistoryUpdate})
        dispatch({type: ACTIONS.USER_CLEAR_CURRENT_SELECTED_NUMS})
        dispatch({type: ACTIONS.USER_UPDATE_TOTAL_PRICE, payload: 0})
}

export const playUser = (dispatch, getState) => {
    const state = getState();
    const {userTicketHistory} = state.data;
        let winnerNums = [];
        for(let i = 0; i < 5; i++){
            let num = getRandomIntInclusive(1,39)
        while(winnerNums.includes(num)){
                num = getRandomIntInclusive(1,39)
            }
            winnerNums.push(num)
        }

        const ticketHistoryUpdate = userTicketHistory.map(ticket => ({...ticket, ticketWinnerNums: getWinnerNums(ticket.numsPlayed, winnerNums),amountWon: getAmountWon(getWinnerNums(ticket.numsPlayed, winnerNums)) }))
        dispatch({type: ACTIONS.USER_SET_CURRENT_WINNERS, payload: winnerNums})
        dispatch({type: ACTIONS.USER_PLAY, payload: ticketHistoryUpdate})
}

export const newGameUser = (dispatch) => {
    dispatch({type: ACTIONS.USER_NEW_GAME})
}

export const sortTicketHistoryByHitsUser = (dispatch, getState) => {
    const state = getState(); 
    const {userTicketHistory} = state.data;
    const hitsDescending = !state.data.userHitsDescending;
    let ticketHistorySortedByHits = [];
    if(hitsDescending){
        ticketHistorySortedByHits = userTicketHistory.sort((a,b) => b.ticketWinnerNums.length - a.ticketWinnerNums.length);
    } else if(!hitsDescending) {
        ticketHistorySortedByHits = userTicketHistory.sort((a,b) => a.ticketWinnerNums.length - b.ticketWinnerNums.length);
    }
    dispatch({type: ACTIONS.USER_SORT_TICKET_HISTORY_BY_HITS, payload: ticketHistorySortedByHits})
}

export const sortTicketHistoryByPayoutUser = (dispatch, getState) => {
    const state = getState(); 
    const {userTicketHistory} = state.data;
    const payoutDescending = !state.data.userPayoutDescending;
    let ticketHistorySortedByPayout = [];
    if(payoutDescending){
        ticketHistorySortedByPayout = userTicketHistory.sort((a,b) => b.amountWon - a.amountWon);
    } else if([!payoutDescending]){
        ticketHistorySortedByPayout = userTicketHistory.sort((a,b) => a.amountWon - b.amountWon);
    }
    dispatch({type: ACTIONS.USER_SORT_TICKET_HISTORY_BY_PAYOUT, payload: ticketHistorySortedByPayout})
}

export const sortTicketHistoryByDateUser = (dispatch, getState) => {
    const state = getState(); 
    const {userTicketHistory} = state.data;
    const dateDescending = !state.data.userDateDescending;
    let ticketHistorySortedByDate = [];
    if(dateDescending){
        ticketHistorySortedByDate = userTicketHistory.sort((a,b) => new Date(b.date) - new Date(a.date));
    } else if([!dateDescending]){
        ticketHistorySortedByDate = userTicketHistory.sort((a,b) => new Date(a.date) - new Date(b.date));
    }
    dispatch({type: ACTIONS.USER_SORT_TICKET_HISTORY_BY_DATE, payload: ticketHistorySortedByDate})
}

//OWNER ACTIONS

export const placeNumberOwner = (num) => async (dispatch, getState) => {
    const state = getState();
    let {ownerCurrentSelectedNums, ownerTotalPrice} = state.data;
    ownerCurrentSelectedNums.push(num)
    if(ownerCurrentSelectedNums.length < 5){
        dispatch({type: ACTIONS.OWNER_PLACE_NUMBER, payload: ownerCurrentSelectedNums})
    } else{
        dispatch({type: ACTIONS.OWNER_UPDATE_TOTAL_PRICE, payload: ownerTotalPrice + 500})
        dispatch({type: ACTIONS.OWNER_PLACE_NUMBER, payload: ownerCurrentSelectedNums})
    }
}

export const addTicketOwner = (dispatch, getState) => {
    const state = getState();
        const {ownerCurrentSelectedNums, ownerTicketHistory} = state.data;
        const date = new Date();
        const ticketHistoryUpdate = [...ownerTicketHistory, {numsPlayed: ownerCurrentSelectedNums, id: uuidv4(), date: date.toString().slice(0,24), isGenerated: false}]
      
        dispatch({type: ACTIONS.OWNER_ADD_TICKET, payload: ticketHistoryUpdate})
        dispatch({type: ACTIONS.OWNER_CLEAR_CURRENT_SELECTED_NUMS})
        dispatch({type: ACTIONS.OWNER_UPDATE_TOTAL_PRICE, payload: 0})
}

export const generateTickets = (randomTickets) => async (dispatch, getState) => {
        for(let i = 0; i < randomTickets; i++){
            let numsGenerated = [];
            for(let j = 0; j < 5; j++){
                numsGenerated.push(getRandomIntInclusive(1,39));
            }
            const date = new Date();
            const state = getState();
            let {ownerTicketHistory} = state.data;
            let ticketHistoryUpdate = [...ownerTicketHistory, {numsPlayed: numsGenerated, id: uuidv4(), date: date.toString().slice(0,24), isGenerated: true}]
            dispatch({type: ACTIONS.OWNER_GENERATE_TICKET, payload: ticketHistoryUpdate})
        }
    }

export const playOwner = (dispatch, getState) => {
    const state = getState();
    const {ownerTicketHistory} = state.data;
        let winnerNums = [];
        for(let i = 0; i < 5; i++){
            let num = getRandomIntInclusive(1,39)
        while(winnerNums.includes(num)){
                num = getRandomIntInclusive(1,39)
            }
            winnerNums.push(num)
        }

        const ticketHistoryUpdate = ownerTicketHistory.map(ticket => ({...ticket, ticketWinnerNums: getWinnerNums(ticket.numsPlayed, winnerNums),amountWon: getAmountWon(getWinnerNums(ticket.numsPlayed, winnerNums)), revenueOnTicket: 500}))
        dispatch({type: ACTIONS.OWNER_SET_CURRENT_WINNERS, payload: winnerNums})
        dispatch({type: ACTIONS.OWNER_PLAY, payload: ticketHistoryUpdate})
}

export const newGameOwner = (dispatch) => {
        dispatch({type: ACTIONS.OWNER_NEW_GAME})
}

export const sortTicketHistoryByHitsOwner = (dispatch, getState) => {
    const state = getState(); 
    const {ownerTicketHistory} = state.data;
    const hitsDescending = !state.data.ownerHitsDescending;
    let ticketHistorySortedByHits = [];
    if(hitsDescending){
        ticketHistorySortedByHits = ownerTicketHistory.sort((a,b) => b.ticketWinnerNums.length - a.ticketWinnerNums.length);
    } else if(!hitsDescending) {
        ticketHistorySortedByHits = ownerTicketHistory.sort((a,b) => a.ticketWinnerNums.length - b.ticketWinnerNums.length);
    }
    dispatch({type: ACTIONS.OWNER_SORT_TICKET_HISTORY_BY_HITS, payload: ticketHistorySortedByHits})
}

export const sortTicketHistoryByPayoutOwner = (dispatch, getState) => {
    const state = getState(); 
    const {ownerTicketHistory} = state.data;
    const payoutDescending = !state.data.ownerPayoutDescending;
    let ticketHistorySortedByPayout = [];
    if(payoutDescending){
        ticketHistorySortedByPayout = ownerTicketHistory.sort((a,b) => b.amountWon - a.amountWon);
    } else if([!payoutDescending]){
        ticketHistorySortedByPayout = ownerTicketHistory.sort((a,b) => a.amountWon - b.amountWon);
    }
    dispatch({type: ACTIONS.OWNER_SORT_TICKET_HISTORY_BY_PAYOUT, payload: ticketHistorySortedByPayout})
}

export const sortTicketHistoryByDateOwner = (dispatch, getState) => {
    const state = getState(); 
    const {ownerTicketHistory} = state.data;
    const dateDescending = !state.data.ownerDateDescending;
    let ticketHistorySortedByDate = [];
    if(dateDescending){
        ticketHistorySortedByDate = ownerTicketHistory.sort((a,b) => new Date(b.date) - new Date(a.date));
    } else if([!dateDescending]){
        ticketHistorySortedByDate = ownerTicketHistory.sort((a,b) => new Date(a.date) - new Date(b.date));
    }
    dispatch({type: ACTIONS.OWNER_SORT_TICKET_HISTORY_BY_DATE, payload: ticketHistorySortedByDate})
}

//UNIVERSAL ACTIONS

export const resetAll = (dispatch) => {
    dispatch({type: ACTIONS.RESET_ALL})
}