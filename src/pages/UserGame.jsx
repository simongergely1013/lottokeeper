import React from "react";
import TicketNumber from "../components/TicketNumber";
import { useSelector, useDispatch } from "react-redux";
import {
  startLotto,
  playNewUser,
  resetAll,
  clearTicketHistoryUser,
} from "../store/data/actions";

const styles = {
  main: "w-full h-full flex flex-col items-center px-16 py-10 overflow-y-auto",
  title:
    "w-7/12 text-2xl bg-slate-900 text-slate-100 text-center p-3 tracking-widest rounded",
  ticketContainer: "w-[66%] flex flex-col justify-center items-center py-6",
  numsContainer:
    "border border-4 border-dotted border-slate-300 w-7/12 h-[280px] mt-5 pl-3 py-3 flex items-center flex-wrap bg-slate-900",
  numTicket:
    "w-6 h-6 border border-slate-900 rounded-full bg-slate-100 text-center m-1 cursor-pointer hover:bg-sky-500 hover:text-slate-100",
  ticketSideBar: "w-[34%] flex flex-col items-center justify-center gap-3",
  ticketInfo:
    "w-9/12 text-slate-100 bg-slate-900 tracking-widest text-center border rounded border-slate-900 px-3 py-2",
  buttonsContainer:
    "w-1/2 flex flex-col justify-center items-center gap-3 mt-5",
  button:
    "w-9/12 rounded bg-blue-600 text-slate-100 font-bold tracking-widest px-3 py-2 drop-shadow-xl",
  winnerNumsWrapper:
    "w-1/3 flex flex-col justify-center gap-5 items-center mt-10",
  winnerNumsText: "h-10 text-slate-100 text-xl",
  winnerNumsContainer:
    "w-full h-10 flex justify-center items-center gap-2 text-slate-900 text-xl p-3 mb-4",
  numWinner: "w-10 h-10 flex justify-center items-center border rounded-full",
  yourTickets: "flex justify-between items-center text-slate-100 gap-3",
  ticketHistory: "w-full flex flex-col",
  ticketRow:
    "w-full flex items-center justify-between p-2 border-b text-slate-900",
  ticketRowNum:
    "w-6 h-6 flex justify-center items-center border rounded-full px-2 mr-2 text-xs",
};

let nums = [];
for (let i = 1; i < 40; i++) {
  nums.push(i);
}

const UserGame = () => {
  const {
    ticketHistory,
    currentSelectedNums,
    currentWinners,
    numsWon,
    completedTickets,
    totalPrice,
  } = useSelector((state) => state.data.user);

  const dispatch = useDispatch();

  const handleStart = () => {
    dispatch(startLotto);
  };

  const handleNewTicket = () => {
    dispatch(playNewUser);
  };

  const handleReset = () => {
    dispatch(resetAll);
  };

  const handleClearTicketHistory = () => {
    dispatch(clearTicketHistoryUser);
  };

  return (
    <div className={styles.main}>
      <div className="w-full flex">
        <div className={styles.ticketContainer}>
          <h1 className={styles.title}>Place your numbers</h1>
          <div className={styles.numsContainer}>
            {nums.map((number) => (
              <TicketNumber number={number} />
            ))}
          </div>
        </div>
        <div className={styles.ticketSideBar}>
          <div className={styles.ticketInfo}>
            Completed tickets: <span className="ml-1">{completedTickets}</span>
          </div>
          <div className={styles.ticketInfo}>
            Total price: <span className="ml-1">{totalPrice} akcse</span>
          </div>
          {/* <div className={styles.buttonsContainer}> */}
          <button className={styles.button} onClick={() => handleStart()}>
            Start Lotto
          </button>
          <button className={styles.button} onClick={() => handleNewTicket()}>
            New ticket
          </button>
          <button className={styles.button} onClick={() => handleReset()}>
            Reset
          </button>
          {/* </div> */}
        </div>
      </div>
      <div className={styles.winnerNumsWrapper}>
        <h1 className={styles.winnerNumsText}>
          {currentWinners.length !== 0 ? "The winner numbers are:" : ""}
        </h1>
        <div className={styles.winnerNumsContainer}>
          {currentWinners.map((num) => (
            <div
              className={`${styles.numWinner} ${
                currentSelectedNums.includes(num) && "border-green-500"
              }`}
              key={num}
            >
              {num}
            </div>
          ))}
        </div>
        <div className={styles.winnerNumsText}>
          {currentWinners.length !== 0 && (
            <h2>
              {numsWon.length === 0
                ? "No luck this time. Try again!"
                : `You got ${numsWon.length} hit(s)!`}
            </h2>
          )}
        </div>
      </div>
      {ticketHistory.length !== 0 && (
        <div className="w-full mt-4">
          <div className={styles.yourTickets}>
            <h1 className="text-xl mb-2">Your tickets</h1>
            <button
              className="border rounded px-2"
              onClick={() => handleClearTicketHistory()}
            >
              clear
            </button>
          </div>
          <div className={styles.ticketRow}>
            <div className="w-[10%]"></div>
            <div className="w-[30%] flex">
              <div className="w-full">Numbers played</div>
            </div>
            <div className="w-[30%]">Date played</div>
            <div className="w-[30%]">Ticket ID</div>
          </div>
          <div className={styles.ticketHistory}>
            {ticketHistory.map((ticket, index) => (
              <div key={ticket.id} className={styles.ticketRow}>
                <div className="w-[10%]">
                  #<span className="px-2">{index + 1}</span>
                </div>
                <div className="w-[30%] flex">
                  {ticket.numsPlayed.map((num) => (
                    <div className={styles.ticketRowNum}>{num}</div>
                  ))}
                </div>
                <div className="w-[30%]">{ticket.date}</div>
                <div className="w-[30%]">{ticket.id}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGame;
