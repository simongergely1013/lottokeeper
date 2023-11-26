import {v4 as uuidv4} from 'uuid';
// import updateUserBalance from '../../utilities/updateUserBalance';
// import updateOwnerBalance from '../../utilities/updateOwnerBalance';

export const ACTIONS = {
    // USER
        SET_USERNAME: 'SET_USERNAME',
        USER_PLACE_NUMBER:'USER_PLACE_NUMBER',
        USER_UPDATE_TOTAL_PRICE: 'USER_UPDATE_TOTAL_PRICE',
        USER_ADD_TICKET: 'USER_ADD_TICKET',
        USER_START_NEW_ROUND: 'USER_START_NEW_ROUND',
        USER_START_LOTTO: 'USER_START_LOTTO',
        USER_SET_CURRENT_WINNERS: 'USER_SET_CURRENT_WINNERS',
        USER_CLEAR_CURRENT_SELECTED_NUMS: 'USER_CLEAR_CURRENT_SELECTED_NUMS',
        USER_SORT_TICKET_HISTORY_BY_HITS: 'USER_SORT_TICKET_HISTORY_BY_HITS',
        USER_SORT_TICKET_HISTORY_BY_PAYOUT: 'USER_SORT_TICKET_HISTORY_BY_PAYOUT',
        USER_SORT_TICKET_HISTORY_BY_DATE: 'USER_SORT_TICKET_HISTORY_BY_DATE',
    
    // OWNER
        OWNER_PLACE_NUMBER: 'OWNER_PLACE_NUMBER',
        OWNER_UPDATE_TOTAL_PRICE: 'OWNER_UPDATE_TOTAL_PRICE',
        OWNER_GENERATE_TICKET: 'OWNER_GENERATE_TICKET',
        OWNER_ADD_TICKET: 'OWNER_ADD_TICKET',
        OWNER_START_NEW_ROUND: 'OWNER_START_NEW_ROUND',
        OWNER_START_LOTTO: 'OWNER_START_LOTTO',
        OWNER_SET_CURRENT_WINNERS: 'OWNER_SET_CURRENT_WINNERS',
        OWNER_CLEAR_CURRENT_SELECTED_NUMS: 'OWNER_CLEAR_CURRENT_SELECTED_NUMS',
        OWNER_SORT_TICKET_HISTORY_BY_HITS: 'OWNER_SORT_TICKET_HISTORY_BY_HITS',
        OWNER_SORT_TICKET_HISTORY_BY_PAYOUT: 'OWNER_SORT_TICKET_HISTORY_BY_PAYOUT',
        OWNER_SORT_TICKET_HISTORY_BY_DATE: 'OWNER_SORT_TICKET_HISTORY_BY_DATE',
    
    //GLOBAL
        RESET_ALL: 'RESET_ALL',
}


const initialState = {
    // user
        userName: "",
        userBalance: 10000,
        userTicketHistory: [],
        userCurrentSelectedNums: [],
        userCurrentWinners: [],
        userTotalPrice: 0,
        userHitsDescending: false,
        userPayoutDescending: false,
        userDateDescending: false,
    
    // owner
        ownerName: "OWNER",
        ownerBalance: 0,
        ownerTicketHistory: [],
        ownerCurrentSelectedNums: [],
        ownerCurrentWinners: [],
        ownerTotalPrice: 0,
        ownerHitsDescending: false,
        ownerPayoutDescending: false,
        ownerDateDescending: false,
    
}

const dataReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.SET_USERNAME:
            return{
                ...state,
                userName: action.payload
                }
        case ACTIONS.USER_PLACE_NUMBER:
            return{
                ...state,
                userCurrentSelectedNums: [...action.payload]
            }
        case ACTIONS.USER_UPDATE_TOTAL_PRICE:
            return{
                ...state,
                userTotalPrice: state.userTotalPrice + 500
                }
        case ACTIONS.USER_ADD_TICKET:
            return{
                ...state,
                userTicketHistory: action.payload,
                userBalance: state.userBalance - 500,
                ownerBalance: state.ownerBalance + 500
                }            
        case ACTIONS.USER_START_LOTTO:
            const totalPaidOutUser1 = action.payload.reduce(
                (accumulator, currentValue) => accumulator + currentValue.amountWon,
                0
              );
            return{
                ...state,
                userTicketHistory: action.payload,
                userBalance: state.userBalance + totalPaidOutUser1,
                ownerBalance: state.ownerBalance - totalPaidOutUser1
            }
        case ACTIONS.USER_SET_CURRENT_WINNERS:
            return{
                ...state,
                userCurrentWinners: action.payload
            }    
         case ACTIONS.USER_CLEAR_CURRENT_SELECTED_NUMS:
             return{
                ...state,
                userCurrentSelectedNums: []
            }   
        case ACTIONS.USER_START_NEW_ROUND:
            return{
                ...state,
                userTicketHistory: [],
                userCurrentWinners: [],
                userTotalPrice: 0
            }
        case ACTIONS.USER_SORT_TICKET_HISTORY_BY_HITS:
            return{
                ...state,
                userTicketHistory: action.payload,
                userHitsDescending : !state.userHitsDescending
                }    
        case ACTIONS.USER_SORT_TICKET_HISTORY_BY_PAYOUT:
            return{
                ...state,
                userTicketHistory: action.payload,
                userPayoutDescending : !state.userPayoutDescending
                }
        case ACTIONS.USER_SORT_TICKET_HISTORY_BY_DATE:
            return{
                ...state,
                userTicketHistory: action.payload,
                userDateDescending : !state.userDateDescending
                }

        //OWNER ACTIONS
                    
        case ACTIONS.OWNER_PLACE_NUMBER:
            return{
                ...state,
                ownerCurrentSelectedNums: [...action.payload]
                }   
                            
        case ACTIONS.OWNER_UPDATE_TOTAL_PRICE:
            return{
                ...state,
                ownerTotalPrice: action.payload
                }     
                            
        case ACTIONS.OWNER_ADD_TICKET:
            return{
                ...state,
                ownerTicketHistory: action.payload,
                ownerBalance: state.ownerBalance + 500,
                userBalance: state.userBalance - 500
                }   
                        
        case ACTIONS.OWNER_GENERATE_TICKET:
            return{
                ...state,
                ownerTicketHistory: action.payload,
                ownerBalance: state.ownerBalance + 500,
                userBalance: state.userBalance - 500
                }
        case ACTIONS.OWNER_START_LOTTO:
                const totalPaidOutUser2 = action.payload.reduce(
                                    (accumulator, currentValue) => accumulator + currentValue.amountWon,
                                    0
                                );
            return{
                ...state,
                ownerTicketHistory: action.payload,
                ownerBalance: state.ownerBalance - totalPaidOutUser2,
                userBalance: state.userBalance + totalPaidOutUser2
                }
        case ACTIONS.OWNER_SET_CURRENT_WINNERS:
            return{
                ...state,
                ownerCurrentWinners: action.payload
                }   
        case ACTIONS.OWNER_CLEAR_CURRENT_SELECTED_NUMS:
            return{
                ...state,
                ownerCurrentSelectedNums: []
                }   
        case ACTIONS.OWNER_START_NEW_ROUND:
            return{
                ...state,
                ownerTicketHistory: [],
                ownerCurrentWinners: [],
                }   
        case ACTIONS.OWNER_SORT_TICKET_HISTORY_BY_HITS:
            return{
                ...state,
                    ownerTicketHistory: action.payload,
                    ownerHitsDescending : !state.ownerHitsDescending
                }    
        case ACTIONS.OWNER_SORT_TICKET_HISTORY_BY_PAYOUT:
            return{
                ...state,
                ownerTicketHistory: action.payload,
                ownerPayoutDescending : !state.ownerPayoutDescending
                }
        case ACTIONS.OWNER_SORT_TICKET_HISTORY_BY_DATE:
            return{
                ...state,
                ownerTicketHistory: action.payload,
                ownerDateDescending : !state.ownerDateDescending
                }        

        //GLOBAL ACTIONS    

        case ACTIONS.RESET_ALL:
            return{
                 ...state,
                        
                userBalance: 10000,
                userTicketHistory: [],
                userCurrentSelectedNums: [],
                userCurrentWinners: [],
                userTotalPrice: 0,
                userHitsDescending: false,
                userPayoutDescending: false,
                userDateDescending: false,
                                    
                ownerBalance: 0,
                ownerTicketHistory: [],
                ownerCurrentSelectedNums: [],
                ownerCurrentWinners: [],
                ownerTotalPrice: 0,
                randomTicketsPrice: 0,
                ownerHitsDescending: false,
                ownerPayoutDescending: false,
                ownerDateDescending: false,
                }                          
                default:
                return state;    
                    }
                }

export default dataReducer;