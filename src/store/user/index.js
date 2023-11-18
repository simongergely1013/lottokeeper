import {v4 as uuidv4} from 'uuid';
import { getWinnerNums } from '../../utilities/getWinnerNums';

export const ACTIONS = {
    PLACE_NUMBER:'PLACE_NUMBER',
    COMPLETE_TICKET: 'COMPLETE_TICKET',
    START_LOTTO: 'PLAY_NUMS',
    PLAY_NEW: 'PLAY_NEW',
    RESET: 'RESET',
    CLEAR_TICKET_HISTORY: 'CLEAR_TICKET_HISTORY'
}


const initialState = {
    user:{
        name: "USER",
        totalBalance: 10000,
        ticketHistory: []
    },
    currentSelectedNums: [],
    currentWinners: [],
    numsWon: [],
    completedTickets: 0,
    totalPrice: 0,
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.PLACE_NUMBER:
            return{
                ...state,
                currentSelectedNums: action.payload
            }
        case ACTIONS.COMPLETE_TICKET:
            return{
                ...state,
                currentSelectedNums: action.payload,
                completedTickets: state.completedTickets + 1,
                totalPrice: state.totalPrice + 500
            }    
        case ACTIONS.START_LOTTO:
            const date = new Date;
            return{
                ...state,
                user: {...state.user, ticketHistory: [...state.user.ticketHistory,{numsPlayed: state.currentSelectedNums, id: uuidv4(), date: date.toString().slice(0,24), winnerNums: getWinnerNums(state.currentSelectedNums, action.payload), amountWon: 0}]
                },
                currentWinners: action.payload,
                numsWon: getWinnerNums(state.currentSelectedNums, action.payload)
            } 
        case ACTIONS.PLAY_NEW:
            return{
                ...state,
                currentSelectedNums: [],
                currentWinners: [],
                numsWon: []
            }
            
        case ACTIONS.RESET:
            return{
                ...state,
                user: {...state.user, ticketHistory: []},
                currentSelectedNums: action.payload,
                currentWinners: [],
                numsWon: [],
                completedTickets: 0,
                totalPrice: 0
            }
        case ACTIONS.CLEAR_TICKET_HISTORY:
            return{
                ...state,
                user: {...state.user, ticketHistory: []}
            }        
            default:
                return state;    
    }
}

export default userReducer;