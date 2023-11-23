import React from "react";
import formatBalance from "../utilities/formatBalance";
import { useSelector } from "react-redux";

const styles = {
  title: "text-2xl text-slate-100 font-bold tracking-wider mt-4",
  yourTickets: "flex justify-between items-center text-slate-100 gap-3",
  ticketHistory: "w-full flex flex-col",
  ticketRow:
    "w-full flex items-center justify-between p-2 border-b text-slate-100",
  ticketRowNum:
    "w-6 h-6 flex justify-center items-center border rounded-full px-2 mr-2 text-xs",
};

const UserStats = () => {
  const { ticketHistory, name } = useSelector((state) => state.data.user);
  const totalPaidOut = ticketHistory.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amountWon,
    0
  );

  return (
    <div className="w-full h-full px-16 py-10">
      <h1 className={styles.title}>{name}'s Statistics</h1>
      {ticketHistory.length !== 0 && (
        <div className="w-full mt-10">
          <div className={styles.yourTickets}>
            <h1 className="text-xl mb-2">Your tickets</h1>
          </div>
          <div className={styles.ticketRow}>
            <div className="w-[5%]"></div>
            <div className="w-[20%] flex">
              <div className="w-full">Numbers played</div>
            </div>
            <div className="w-[5%]">Hits</div>
            <div className="w-[15%]">Amount paid out</div>
            <div className="w-[25%]">Date played</div>
            <div className="w-[30%]">Ticket ID</div>
          </div>
          <div className={styles.ticketHistory}>
            {ticketHistory.map((ticket, index) => (
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
                  {ticket.userWinnerNums.length}
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
          <div className="text-slate-100 font-bold tracking-wider mt-4 border-b">
            <h2>
              Total amount paid out:{" "}
              <span className="pl-1">{formatBalance(totalPaidOut)}</span>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserStats;
