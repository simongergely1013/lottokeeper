


const initialState = {
    owner:{
        name: "OWNER",
        totalBalance: 0,
        ticketHistory: []
    },
    currentSelectedNums: [],
    currentWinners: [],
    numsWon: [],
    completedTickets: 0,
    totalPrice: 0,
}


const ownerReducer = (state = initialState, action) => {
    return state;
}

export default ownerReducer;