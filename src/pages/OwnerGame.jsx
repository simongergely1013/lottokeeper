import React, { useState } from "react";
import TicketNumber from "../components/TicketNumberOwner";
import formatNumber from "../utilities/formatNumber";
import { useSelector, useDispatch } from "react-redux";
import { FaSort } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { IoIosAddCircle } from "react-icons/io";
import {
  addTicketOwner,
  generateTickets,
  playOwner,
  newGameOwner,
  resetAll,
  sortTicketHistoryByHitsOwner,
  sortTicketHistoryByPayoutOwner,
  sortTicketHistoryByDateOwner,
} from "../store/data/actions";

const styles = {
  main: "w-full h-full flex flex-col items-center px-16 py-10 overflow-y-auto",
  title:
    "w-7/12 text-2xl bg-slate-900 text-slate-100 text-center p-3 tracking-widest rounded",
  ticketContainer: "w-[65%] flex flex-col justify-center items-center py-6",
  numsContainer:
    "border border-4 border-dotted border-slate-300 w-7/12 h-[280px] mt-5 mb-2 pl-3 py-3 flex items-center flex-wrap bg-slate-900",
  ticketSideBar: "w-[35%] h-full flex flex-col justify-center pb-16 gap-3",
  randomTickets:
    "w-2/3 flex justify-center items-center text-slate-100 bg-indigo-800 tracking-widest text-center rounded px-3 py-2",
  gameInfo:
    "w-2/3 flex justify-center items-center text-slate-100 bg-slate-900 tracking-widest text-center rounded px-3 py-2",
  ticketButton:
    "w-7/12 flex justify-center items-center gap-2 rounded bg-blue-600 text-slate-100 tracking-widest m-2 px-3 py-2 drop-shadow-xl hover:scale-110",
  button:
    "w-2/3 rounded bg-blue-600 text-slate-100 tracking-widest px-3 py-2 drop-shadow-xl hover:scale-110",
  generateButton:
    "w-2/3 rounded bg-indigo-800 text-slate-100 tracking-widest px-3 py-2 drop-shadow-xl",
  resetButton:
    "w-2/3 rounded bg-blue-800 text-slate-100 tracking-widest px-3 py-2 drop-shadow-xl hover:scale-110",
  ticketHistory: "w-full flex flex-col",
  ticketRow:
    "w-full flex items-center justify-between p-4 rounded bg-slate-900 text-slate-200 tracking-widest mb-1",
  ticketRowNum:
    "w-7 h-7 flex justify-center items-center rounded-full px-2 mr-2 text-xs font-bold",
  winnerNumsWrapper:
    "w-5/12 flex flex-col justify-center gap-5 items-center py-6 px-4 mt-10 rounded",
  winnerNumsText: "h-10 text-slate-100 text-xl tracking-widest",
  winnerNumsContainer:
    "w-full h-10 flex justify-center items-center gap-4 text-slate-900 text-xl p-3 mb-4",
  numWinner:
    "w-12 h-12 flex justify-center items-center bg-green-700 border-2 border-green-700 rounded-full text-slate-100 font-bold",
};

let nums = [];
for (let i = 1; i < 40; i++) {
  nums.push(i);
}

const OwnerGame = () => {
  const {
    ownerTicketHistory,
    ownerTotalPrice,
    ownerCurrentWinners,
    ownerCurrentSelectedNums,
    ownerName,
    userName,
    userBalance,
  } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const [randomTickets, setRandomTickets] = useState(0);
  const [randomTicketsPrice, setRandomTicketsPrice] = useState(0);
  const totalPrice = ownerTotalPrice + randomTicketsPrice;

  const totalPaidOut = ownerTicketHistory.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amountWon,
    0
  );

  const totalRevenueOnTickets = ownerTicketHistory.reduce(
    (accumulator, currentValue) => accumulator + currentValue.revenueOnTicket,
    0
  );

  const alertCondition = totalPrice > userBalance;
  const alertMessage = `${ownerName} doesn't have enough balance.`;

  const handleNumberChange = (value) => {
    setRandomTickets(value);
    setRandomTicketsPrice(value * 500);
  };

  const handleAddTicket = () => {
    switch (true) {
      case alertCondition:
        alert(alertMessage);
        break;
      case ownerCurrentSelectedNums.length < 5:
        return;
      default:
        dispatch(addTicketOwner);
    }
  };

  const handleGenerateTickets = () => {
    if (alertCondition) {
      alert(alertMessage);
    } else {
      dispatch(generateTickets(randomTickets));
      setRandomTickets(0);
      setRandomTicketsPrice(0);
    }
  };

  const handlePlay = () => {
    if (alertCondition) {
      alert(alertMessage);
    } else {
      dispatch(playOwner);
    }
  };

  const handleNewGame = () => {
    if (alertCondition) {
      alert(alertMessage);
    }
    dispatch(newGameOwner);
  };

  const handleReset = () => {
    dispatch(resetAll);
    setRandomTickets(0);
    setRandomTicketsPrice(0);
  };

  const handleSortHits = () => {
    dispatch(sortTicketHistoryByHitsOwner);
  };

  const handleSortPayout = () => {
    dispatch(sortTicketHistoryByPayoutOwner);
  };

  const handleSortDate = () => {
    dispatch(sortTicketHistoryByDateOwner);
  };

  return (
    <div className={styles.main}>
      <div className="w-full flex items-center justify-center mb-10">
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
            Add Ticket to List
          </button>
        </div>
        <div className={styles.ticketSideBar}>
          <div className={styles.gameInfo}>
            <TiShoppingCart className="mr-3" />
            Total price:
            <span className="pl-2">{formatNumber(totalPrice)} AK</span>
          </div>
          <div className={styles.randomTickets}>
            <div className="flex items-center gap-4">
              <h2>Random tickets:</h2>
              <input
                type="number"
                className="w-12 text-black text-center ml-2"
                min={0}
                placeholder="0"
                value={randomTickets}
                onChange={(e) => handleNumberChange(e.target.value)}
              />
            </div>
          </div>
          {randomTickets > 0 && (
            <button
              className={styles.generateButton}
              onClick={() => handleGenerateTickets()}
            >
              Generate Random Tickets
            </button>
          )}
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
          ownerCurrentWinners.length !== 0 && "bg-slate-900"
        }`}
      >
        <h1 className={styles.winnerNumsText}>
          {ownerCurrentWinners.length !== 0 ? "The winner numbers are:" : ""}
        </h1>
        <div className={styles.winnerNumsContainer}>
          {ownerCurrentWinners.map((num) => (
            <div className={styles.numWinner} key={num}>
              {num}
            </div>
          ))}
        </div>
      </div>
      {ownerTicketHistory.length !== 0 && ownerCurrentWinners.length === 0 && (
        <div className="w-full">
          <div>
            <h1 className="text-2xl text-slate-100 tracking-widest pl-2 mb-4">
              All tickets
            </h1>
          </div>
          <div className={styles.ticketRow}>
            <div className="w-[5%]"></div>
            <div className="w-[25%]">
              <div className="w-full">Numbers played</div>
            </div>
            <div className="w-[10%]">Played by</div>
            <div className="w-[30%]">Date played</div>
            <div className="w-[30%]">Ticket ID</div>
          </div>
          <div className={styles.ticketHistory}>
            {ownerTicketHistory.map((ticket, index) => (
              <div key={ticket.id} className={styles.ticketRow}>
                <div className="w-[5%]">
                  #<span className="px-2">{index + 1}</span>
                </div>
                <div className="w-[25%] flex">
                  {ticket.numsPlayed.map((num) => (
                    <div
                      className={`${styles.ticketRowNum} bg-slate-200 text-slate-900`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <div className="w-[10%]">
                  {ticket.isGenerated ? "Generated" : ownerName}
                </div>
                <div className="w-[30%]">{ticket.date}</div>
                <div className="w-[30%]">{ticket.id}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {ownerCurrentWinners.length !== 0 && (
        <div className="w-full mt-10">
          <div className="text-slate-100">
            <h1 className="text-xl tracking-widest pl-2 mb-2">Your tickets</h1>
          </div>
          <div className={styles.ticketRow}>
            <div className="w-[5%]"></div>
            <div className="w-[15%] flex">
              <div className="w-full">Numbers played</div>
            </div>
            <div className="w-[8%] flex items-center pl-3 gap-2">
              Hits{" "}
              <FaSort
                onClick={() => handleSortHits()}
                className="cursor-pointer"
              />
            </div>
            <div className="w-[20%] flex items-center gap-2">
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
            {ownerTicketHistory.map((ticket, index) => (
              <>
                <div key={ticket.id} className={styles.ticketRow}>
                  <div className="w-[5%]">
                    #<span className="px-2">{index + 1}</span>
                  </div>
                  <div className="w-[15%] flex">
                    {ticket.numsPlayed.map((num) => (
                      <div
                        className={`${styles.ticketRowNum} ${
                          ownerCurrentWinners.includes(num)
                            ? "bg-green-700 text-slate-100"
                            : "bg-slate-200 text-slate-900"
                        }`}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                  <div className="w-[8%] pl-5">
                    {ticket.ticketWinnerNums.length}
                  </div>
                  <div className="w-[20%] pl-2">
                    {ticket.amountWon}
                    <span className="pl-2">AK</span>
                  </div>
                  <div className="w-[25%] pl-0.5">{ticket.date}</div>
                  <div className="w-[30%] pl-0.5">{ticket.id}</div>
                </div>
                <div className="flex items-center bg-slate-800 text-slate-200 tracking-widest gap-14 p-4 mb-4 rounded">
                  <p>Revenue on ticket: {ticket.revenueOnTicket} AK</p>
                  <p className="flex gap-4">
                    Played by:
                    <span>{ticket.isGenerated ? "Generated" : ownerName}</span>
                  </p>
                </div>
              </>
            ))}
          </div>
          <div className="flex flex-col justify-center gap-4 bg-slate-900 text-slate-100 tracking-widest p-5 mt-2 rounded mb-1">
            <h2 className="">
              Total amount paid out to {userName}:{" "}
              <span className="pl-1">{formatNumber(totalPaidOut)} AK</span>
            </h2>
            <h2 className="border-b border-slate-500 pb-3">
              {ownerName}'s Total Revenue:{" "}
              <span className="pl-1">
                {formatNumber(totalRevenueOnTickets)} AK
              </span>
            </h2>
            <h2 className="">
              {ownerName}'s Total profit:{" "}
              <span
                className={`pl-3 mr-2 ${
                  totalRevenueOnTickets - totalPaidOut < 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {formatNumber(totalRevenueOnTickets - totalPaidOut)}
              </span>
              <span>AK</span>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerGame;
