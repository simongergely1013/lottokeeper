import React from "react";
import TicketNumber from "../components/TicketNumberUser";
import formatNumber from "../utilities/formatNumber";
import { FaSort } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { IoIosAddCircle } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import {
  addTicketUser,
  playUser,
  newGameUser,
  resetAll,
  sortTicketHistoryByHitsUser,
  sortTicketHistoryByPayoutUser,
  sortTicketHistoryByDateUser,
} from "../store/data/actions";

const styles = {
  main: "w-full h-full flex flex-col items-center px-16 py-2 overflow-y-auto",
  title:
    "w-7/12 text-2xl bg-slate-900 text-slate-100 text-center p-3 tracking-widest rounded",
  ticketContainer: "w-[65%] flex flex-col justify-center items-center py-6",
  numsContainer:
    "border border-4 border-dotted border-slate-300 w-7/12 h-[280px] mt-5 mb-2 pl-3 py-3 flex items-center flex-wrap bg-slate-900",
  numTicket:
    "w-6 h-6 border border-slate-900 rounded-full bg-slate-100 text-center m-1 cursor-pointer hover:bg-sky-500 hover:text-slate-100",
  ticketSideBar: "w-[35%] h-full flex flex-col  justify-center pb-16 gap-3",
  ticketInfo:
    "w-9/12 flex justify-center items-center text-slate-100 bg-slate-900 tracking-widest text-center rounded px-3 py-2",
  buttonsContainer:
    "w-1/2 flex flex-col justify-center items-center gap-3 mt-5",
  ticketButton:
    "w-7/12 flex justify-center items-center gap-2 rounded bg-blue-600 text-slate-100 tracking-widest m-2 px-3 py-2 drop-shadow-xl hover:scale-110",
  button:
    "w-9/12 rounded bg-blue-600 text-slate-100 tracking-widest px-3 py-2 drop-shadow-xl hover:scale-110",
  resetButton:
    "w-9/12 rounded bg-blue-800 text-slate-100 tracking-widest px-3 py-2 drop-shadow-xl hover:scale-110",
  winnerNumsWrapper:
    "w-5/12 flex flex-col justify-center gap-5 items-center py-6 px-4 mt-4 rounded",
  winnerNumsText: "h-10 text-slate-100 text-xl tracking-widest",
  winnerNumsContainer:
    "w-full h-10 flex justify-center items-center gap-4 text-slate-900 text-xl p-3 mb-4",
  numWinner:
    "w-12 h-12 flex justify-center items-center bg-green-700 border-2 border-green-700 rounded-full text-slate-100 font-bold",
  yourOverview: "text-slate-100 mb-4",
  ticketHistory: "w-full flex flex-col",
  ticketRow:
    "w-full flex items-center justify-between p-4 rounded bg-slate-900 text-slate-200 tracking-wider mb-1",
  ticketRowNum:
    "w-7 h-7 flex justify-center items-center rounded-full px-2 mr-2 text-xs font-bold",
};

let nums = [];
for (let i = 1; i < 40; i++) {
  nums.push(i);
}

const UserGame = () => {
  const {
    userTicketHistory,
    userCurrentSelectedNums,
    userCurrentWinners,
    userTotalPrice,
    userBalance,
    userName,
  } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const totalPaidOut = userTicketHistory.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amountWon,
    0
  );

  const alertCondition = userTotalPrice > userBalance;
  const alertMessage = `${userName} doesn't have enough balance.`;

  const handleAddTicket = () => {
    switch (true) {
      case alertCondition:
        alert(alertMessage);
        break;
      case userCurrentSelectedNums.length < 5:
        return;
      default:
        dispatch(addTicketUser);
    }
  };

  const handlePlay = () => {
    if (alertCondition) {
      alert(alertMessage);
    } else {
      dispatch(playUser);
    }
  };

  const handleNewGame = () => {
    if (alertCondition) {
      alert(alertMessage);
    }
    dispatch(newGameUser);
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
            <IoIosAddCircle />
            Add to Ticket List
          </button>
        </div>
        <div className={styles.ticketSideBar}>
          <div className={styles.ticketInfo}>
            <TiShoppingCart className="mr-3" />
            Total price:{" "}
            <span className="ml-1">{formatNumber(userTotalPrice)} AK</span>
          </div>
          <button className={styles.button} onClick={() => handlePlay()}>
            Play
          </button>
          <button className={styles.button} onClick={() => handleNewGame()}>
            New Game
          </button>
          <button className={styles.resetButton} onClick={() => handleReset()}>
            Reset to Default
          </button>
        </div>
      </div>
      <div
        className={`${styles.winnerNumsWrapper} ${
          userCurrentWinners.length !== 0 && "bg-slate-900"
        }`}
      >
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
        <div className="w-full">
          <div className={styles.yourOverview}>
            <h1 className="text-2xl tracking-widest pl-2 mb-4">
              Your Overview
            </h1>
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
                    <div
                      className={`${styles.ticketRowNum} bg-slate-200 text-slate-900`}
                    >
                      {num}
                    </div>
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
        <div className="w-full">
          <div className={styles.yourOverview}>
            <h1 className="text-xl tracking-widest pl-2 mb-2">Your Overview</h1>
          </div>
          <div className={styles.ticketRow}>
            <div className="w-[4%]"></div>
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
            <div className="w-[17%] flex items-center gap-2 pl-2">
              Amount paid out{" "}
              <FaSort
                onClick={() => handleSortPayout()}
                className="cursor-pointer"
              />
            </div>
            <div className="w-[28%] flex items-center gap-2 pl-2">
              Date played{" "}
              <FaSort
                onClick={() => handleSortDate()}
                className="cursor-pointer"
              />
            </div>
            <div className="w-[28%]">Ticket ID</div>
          </div>
          <div className={styles.ticketHistory}>
            {userTicketHistory.map((ticket, index) => (
              <>
                <div key={ticket.id} className={styles.ticketRow}>
                  <div className="w-[4%]">
                    #<span className="px-2">{index + 1}</span>
                  </div>
                  <div className="w-[18%] flex">
                    {ticket.numsPlayed.map((num) => (
                      <div
                        className={`${styles.ticketRowNum} ${
                          userCurrentWinners.includes(num)
                            ? "bg-green-700 text-slate-100"
                            : "bg-slate-200 text-slate-900"
                        }`}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                  <div className="w-[5%] pl-1">
                    {ticket.ticketWinnerNums.length}
                  </div>
                  <div className="w-[15%] pl-0.5">
                    {formatNumber(ticket.amountWon)}
                    <span className="pl-2">AK</span>
                  </div>
                  <div className="w-[25%] pl-0.5">{ticket.date}</div>
                  <div className="w-[28%] pl-0.5">{ticket.id}</div>
                </div>
                <div className="flex items-center bg-slate-800 text-slate-200 tracking-wider gap-14 p-4 mb-4 rounded">
                  <p className="pl-2">Ticket cost: 500 AK</p>
                </div>
              </>
            ))}
          </div>
          <div className="bg-slate-900 text-slate-100 tracking-widest p-4 mt-2 rounded mb-1">
            <h2>
              Total amount paid out:{" "}
              <span className="pl-1">{formatNumber(totalPaidOut)} AK</span>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGame;
