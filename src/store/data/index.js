import {v4 as uuidv4} from 'uuid';
import updateUserBalance from '../../utilities/updateUserBalance';
import updateOwnerBalance from '../../utilities/updateOwnerBalance';
import getWinnerNums from '../../utilities/getWinnerNums';
import getAmountWon from '../../utilities/getAmountWon';

export const ACTIONS = {
    USER:{
        PLACE_NUMBER:'PLACE_NUMBER',
        COMPLETE_TICKET: 'COMPLETE_TICKET',
        START_LOTTO: 'START_LOTTO',
        PLAY_NEW: 'PLAY_NEW',
        CLEAR_TICKET_HISTORY: 'CLEAR_TICKET_HISTORY',
    },
    OWNER:{

    },
        RESET_ALL: 'RESET_ALL',
}


const initialState = {
    user:{
        name: "USER",
        userBalance: 10000,
        ticketHistory: [],
        currentSelectedNums: [],
        currentWinners: [],
        numsWon: [],
        completedTickets: 0,
        totalPrice: 0,
    }, 
    owner:{
        name: "OWNER",
        ownerBalance: 0,
        ticketHistory: [],
        currentSelectedNums: [],
        currentWinners: [],
        numsWon: [],
        completedTickets: 0,
        totalPrice: 0,
    }
    
}

const dataReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.USER.PLACE_NUMBER:
            return{
                ...state,
                user:{
                    ...state.user,
                    currentSelectedNums: [...action.payload]
                }
            }
        case ACTIONS.USER.COMPLETE_TICKET:
            return{
                ...state,
                user:{
                    ...state.user,
                    currentSelectedNums: [...action.payload],
                    completedTickets: state.user.completedTickets + 1,
                    totalPrice: state.user.totalPrice + 500
                }
    
            }    
        case ACTIONS.USER.START_LOTTO:
            const date = new Date;
            return{
                ...state,
                user:{
                    ...state.user,
                    userBalance: updateUserBalance(state.user.userBalance, state.user.currentSelectedNums, action.payload), 
                    ticketHistory: [...state.user.ticketHistory,{numsPlayed: state.user.currentSelectedNums, id: uuidv4(), date: date.toString().slice(0,24), winnerNums: getWinnerNums(state.user.currentSelectedNums, action.payload), amountWon: getAmountWon(getWinnerNums(state.user.currentSelectedNums, action.payload))}],
                    currentWinners: action.payload,
                    numsWon: getWinnerNums(state.user.currentSelectedNums, action.payload)
                },
                owner:{
                    ...state.owner,
                    ownerBalance: updateOwnerBalance(state.owner.ownerBalance, state.user.currentSelectedNums, action.payload),
                }
            } 
        case ACTIONS.USER.PLAY_NEW:
            return{
                ...state,
                user:{
                    ...state.user,
                    currentSelectedNums: [],
                    currentWinners: [],
                    numsWon: []
                }
            }
        case ACTIONS.USER.CLEAR_TICKET_HISTORY:
                return{
                    ...state,
                    user:{
                        ...state.user,
                        ticketHistory: []
                    }
                }  
        case ACTIONS.RESET_ALL:
            return{
                ...state,
                user:{
                    name: "USER",
                    userBalance: 10000,
                    ticketHistory: [],
                    currentSelectedNums: [],
                    currentWinners: [],
                    numsWon: [],
                    completedTickets: 0,
                    totalPrice: 0,
                },
                owner:{
                    name: "OWNER",
                    ownerBalance: 0,
                    ticketHistory: [],
                    currentSelectedNums: [],
                    currentWinners: [],
                    numsWon: [],
                    completedTickets: 0,
                    totalPrice: 0,
               }
            }      
            default:
                return state;    
    }
}

export default dataReducer;