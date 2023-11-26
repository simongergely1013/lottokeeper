import React from "react";
import TicketNumber from "../components/TicketNumberUser";
import formatBalance from "../utilities/formatBalance";
import { FaSort } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addTicketUser,
  startLottoUser,
  startNewRoundUser,
  resetAll,
  sortTicketHistoryByHitsUser,
  sortTicketHistoryByPayoutUser,
  sortTicketHistoryByDateUser,
} from "../store/data/actions";

const styles = {
  main: "w-full h-full flex flex-col items-center px-16 py-10 overflow-y-auto",
  title:
    "w-7/12 text-2xl bg-slate-900 text-slate-100 text-center p-3 tracking-widest rounded",
  ticketContainer: "w-[65%] flex flex-col justify-center items-center py-6",
  numsContainer:
    "border border-4 border-dotted border-slate-300 w-7/12 h-[280px] mt-5 mb-2 pl-3 py-3 flex items-center flex-wrap bg-slate-900",
  numTicket:
    "w-6 h-6 border border-slate-900 rounded-full bg-slate-100 text-center m-1 cursor-pointer hover:bg-sky-500 hover:text-slate-100",
  ticketSideBar: "w-[35%] h-full flex flex-col  justify-center pb-16 gap-3",
  ticketInfo:
    "w-9/12 text-slate-100 bg-slate-900 tracking-widest text-center rounded px-3 py-2",
  buttonsContainer:
    "w-1/2 flex flex-col justify-center items-center gap-3 mt-5",
  ticketButton:
    "w-7/12 rounded bg-blue-600 text-slate-100 tracking-widest m-2 px-3 py-2 drop-shadow-xl",
  button:
    "w-9/12 rounded bg-blue-600 text-slate-100 tracking-widest px-3 py-2 drop-shadow-xl",
  winnerNumsWrapper:
    "w-1/3 flex flex-col justify-center gap-5 items-center mt-10",
  winnerNumsText: "h-10 text-slate-100 text-xl tracking-widest",
  winnerNumsContainer:
    "w-full h-10 flex justify-center items-center gap-4 text-slate-900 text-xl p-3 mb-4",
  numWinner:
    "w-10 h-10 flex justify-center items-center border border-2 rounded-full text-slate-100",
  yourTickets: "text-slate-100",
  ticketHistory: "w-full flex flex-col",
  ticketRow:
    "w-full flex items-center justify-between p-4 rounded bg-slate-900 text-slate-200 tracking-widest mb-1",
  ticketRowNum:
    "w-6 h-6 flex justify-center items-center border rounded-full px-2 mr-2 text-xs",
};

let nums = [];
for (let i = 1; i < 40; i++) {
  nums.push(i);
}

const UserGame = () => {
  const { userTicketHistory, userCurrentWinners, userTotalPrice } = useSelector(
    (state) => state.data
  );

  const totalPaidOut = userTicketHistory.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amountWon,
    0
  );

  const dispatch = useDispatch();

  const handleAddTicket = () => {
    dispatch(addTicketUser);
  };

  const handleStartLotto = () => {
    dispatch(startLottoUser);
  };

  const handleStartNewRound = () => {
    dispatch(startNewRoundUser);
  };

  const handleReset = () => {
    dispatch(resetAll);
  };

  const handleSortHits = () => {
    dispatch(sortTicketHistoryByHitsUser);
  };

  const handleSortPayout = () => {
    dispatch(sortTicketHistoryByPayoutUser);
  };

  const handleSortDate = () => {
    dispatch(sortTicketHistoryByDateUser);
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
          <button
            className={styles.ticketButton}
            onClick={() => handleAddTicket()}
          >
            Add ticket
          </button>
        </div>
        <div className={styles.ticketSideBar}>
          <div className={styles.ticketInfo}>
            Total price:{" "}
            <span className="ml-1">{formatBalance(userTotalPrice)} AK</span>
          </div>
          <button className={styles.button} onClick={() => handleStartLotto()}>
            Start Lotto
          </button>
          <button
            className={styles.button}
            onClick={() => handleStartNewRound()}
          >
            Start New Round
          </button>
          <button className={styles.button} onClick={() => handleReset()}>
            Reset to Default
          </button>
        </div>
      </div>
      <div className={styles.winnerNumsWrapper}>
        <h1 className={styles.winnerNumsText}>
          {userCurrentWinners.length !== 0 ? "The winner numbers are:" : ""}
        </h1>
        <div className={styles.winnerNumsContainer}>
          {userCurrentWinners.map((num) => (
            <div className={styles.numWinner} key={num}>
              {num}
            </div>
          ))}
        </div>
      </div>
      {userTicketHistory.length !== 0 && userCurrentWinners.length === 0 && (
        <div className="w-full mt-4">
          <div className={styles.yourTickets}>
            <h1 className="text-2xl tracking-widest pl-2 mb-4">Your tickets</h1>
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
            {userTicketHistory.map((ticket, index) => (
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
      {userCurrentWinners.length !== 0 && (
        <div className="w-full mt-10">
          <div className={styles.yourTickets}>
            <h1 className="text-xl tracking-widest pl-2 mb-2">Your tickets</h1>
          </div>
          <div className={styles.ticketRow}>
            <div className="w-[5%]"></div>
            <div className="w-[20%] flex">
              <div className="w-full">Numbers played</div>
            </div>
            <div className="w-[5%] flex items-center gap-2">
              Hits{" "}
              <FaSort
                onClick={() => handleSortHits()}
                className="cursor-pointer"
              />
            </div>
            <div className="w-[15%] flex items-center gap-2">
              Amount paid out{" "}
              <FaSort
                onClick={() => handleSortPayout()}
                className="cursor-pointer"
              />
            </div>
            <div className="w-[25%] flex items-center gap-2">
              Date played{" "}
              <FaSort
                onClick={() => handleSortDate()}
                className="cursor-pointer"
              />
            </div>
            <div className="w-[30%]">Ticket ID</div>
          </div>
          <div className={styles.ticketHistory}>
            {userTicketHistory.map((ticket, index) => (
              <div key={ticket.id} className={styles.ticketRow}>
                <div className="w-[5%]">
                  #<span className="px-2">{index + 1}</span>
                </div>
                <div className="w-[20%] flex">
                  {ticket.numsPlayed.map((num) => (
                    <div className={styles.ticketRowNum}>{num}</div>
                  ))}
                </div>
                <div className="w-[5%] pl-1">
                  {ticket.ticketWinnerNums.length}
                </div>
                <div className="w-[15%] pl-0.5">
                  {ticket.amountWon}
                  <span className="pl-2">AK</span>
                </div>
                <div className="w-[25%] pl-0.5">{ticket.date}</div>
                <div className="w-[30%] pl-0.5">{ticket.id}</div>
              </div>
            ))}
          </div>
          <div className="bg-slate-900 text-slate-100 tracking-widest p-4 mt-2 rounded mb-1">
            <h2>
              Total amount paid out:{" "}
              <span className="pl-1">{formatBalance(totalPaidOut)} AK</span>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGame;
