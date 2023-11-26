import React from "react";
import formatBalance from "../utilities/formatBalance";
import { FaSort } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  sortTicketHistoryByHitsUser,
  sortTicketHistoryByPayoutUser,
  sortTicketHistoryByDateUser,
} from "../store/data/actions";

const styles = {
  title:
    "text-2xl bg-slate-900 tracking-widest p-4 text-slate-100 font-bold mt-4",
  ticketHistoryTitleDiv:
    "flex items-center bg-slate-900 text-slate-100 p-4 mb-1",
  ticketHistory: "w-full flex flex-col",
  ticketRow:
    "w-full flex items-center justify-between p-4 mb-1 rounded text-slate-100 bg-slate-900 tracking-widest",
  ticketRowNum:
    "w-6 h-6 flex justify-center items-center border rounded-full px-2 mr-2 text-xs",
};

const UserStats = () => {
  const { userTicketHistory, userName } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const totalPaidOut = userTicketHistory.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amountWon,
    0
  );

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
    <div className="w-full h-full px-16 py-10">
      <h1 className={styles.title}>{userName}'s Statistics</h1>
      {userTicketHistory.length !== 0 && (
        <div className="w-full mt-10">
          <div className={styles.ticketHistoryTitleDiv}>
            <h1 className="text-xl tracking-widest pl-2 mb-2">
              Ticket history
            </h1>
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

export default UserStats;
