import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSort } from "react-icons/fa";
import {
  sortTicketHistoryByHitsUser,
  sortTicketHistoryByPayoutUser,
  sortTicketHistoryByDateUser,
} from "../store/data/actions";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import formatNumber from "../utilities/formatNumber";
import countHitsFrequency from "../utilities/countHitsFrequency";

ChartJS.register(ArcElement, CategoryScale, Title, Tooltip, Legend);

const styles = {
  title:
    "text-2xl bg-slate-900 tracking-widest p-4 text-slate-100 font-bold mt-4 rounded",
  tableHitsNum: "w-[20%] flex pl-4",
  tableHitsPayRate: "w-[80%] pl-10",
  tableHitsRow:
    "w-full flex items-center border border-slate-700 rounded pl-4 py-2",
  ticketHistoryTitleDiv:
    "flex items-center bg-slate-900 text-slate-100 p-4 mb-1",
  ticketHistory: "w-full flex flex-col",
  ticketRow:
    "w-full flex items-center justify-between p-4 mb-1 rounded text-slate-100 bg-slate-900 tracking-widest",
  ticketRowNum:
    "w-7 h-7 flex justify-center items-center rounded-full px-2 mr-2 text-xs font-bold",
};

const UserStats = () => {
  const { userTicketHistory, userName, userCurrentWinners } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();

  const totalCosts = userTicketHistory.length * 500;
  const totalPaidOut = userTicketHistory.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amountWon,
    0
  );
  const totalProfit = formatNumber(totalPaidOut - totalCosts);

  const hitsFrequency = countHitsFrequency(
    userTicketHistory.map((ticket) => ticket.ticketWinnerNums.length)
  );

  const dataPie = {
    labels: ["0 hits", "1 hit", "2 hits", "3 hits", "4 hits", "5 hits"],
    datasets: [
      {
        label: "# of Hits",
        data: Object.values(hitsFrequency),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
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
    <div className="w-full h-full px-16 py-10 overflow-y-auto">
      <h1 className={styles.title}>{userName}'s Statistics</h1>
      {userCurrentWinners.length !== 0 && (
        <div className="w-full mt-10">
          <div className="w-full h-96 bg-slate-900 flex items-center p-8 mb-16 rounded">
            <div className="w-[65%] h-full flex justify-center items-center border-slate-500 rounded p-6">
              <div className="">
                <h1 className="text-slate-200 text-center py-2 px-4 mb-2 border border-slate-700 tracking-wider rounded">
                  Hits Frequency
                </h1>
                <Pie data={dataPie} />
              </div>
            </div>
            <div className="w-[35%] h-full flex flex-col justify-center items-center border-slate-500 rounded text-slate-100 tracking-widest">
              <div className="w-3/4 flex flex-col">
                <div className={styles.tableHitsRow}>
                  <div className="w-[25%]"># Hits</div>
                  <div className="w-[75%] pl-4">Payout rates</div>
                </div>
                <div className={styles.tableHitsRow}>
                  <div className={styles.tableHitsNum}>0</div>
                  <div className={styles.tableHitsPayRate}>-</div>
                </div>
                <div className={styles.tableHitsRow}>
                  <div className={styles.tableHitsNum}>1</div>
                  <div className={styles.tableHitsPayRate}>-</div>
                </div>
                <div className={styles.tableHitsRow}>
                  <div className={styles.tableHitsNum}>2</div>
                  <div className={styles.tableHitsPayRate}>
                    {formatNumber(1000)} AK
                  </div>
                </div>
                <div className={styles.tableHitsRow}>
                  <div className={styles.tableHitsNum}>3</div>
                  <div className={styles.tableHitsPayRate}>
                    {formatNumber(2000)} AK
                  </div>
                </div>
                <div className={styles.tableHitsRow}>
                  <div className={styles.tableHitsNum}>4</div>
                  <div className={styles.tableHitsPayRate}>
                    {formatNumber(3500)} AK
                  </div>
                </div>
                <div className={styles.tableHitsRow}>
                  <div className={styles.tableHitsNum}>5</div>
                  <div className={styles.tableHitsPayRate}>
                    {formatNumber(5000)} AK
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.ticketHistoryTitleDiv}>
            <h1 className="text-xl tracking-widest pl-2 mb-2">
              Ticket history
            </h1>
          </div>
          <div className={styles.ticketRow}>
            <div className="w-[5%]"></div>
            <div className="w-[18%] flex">
              <div className="w-full">Numbers played</div>
            </div>
            <div className="w-[7%] flex items-center gap-2">
              Hits{" "}
              <FaSort onClick={handleSortHits} className="cursor-pointer" />
            </div>
            <div className="w-[15%] flex items-center gap-2">
              Paid out{" "}
              <FaSort onClick={handleSortPayout} className="cursor-pointer" />
            </div>
            <div className="w-[25%] flex items-center gap-2">
              Date played{" "}
              <FaSort onClick={handleSortDate} className="cursor-pointer" />
            </div>
            <div className="w-[30%]">Ticket ID</div>
          </div>
          <div className={styles.ticketHistory}>
            {userTicketHistory.map((ticket, index) => (
              <React.Fragment key={ticket.id}>
                <div className={styles.ticketRow}>
                  <div className="w-[5%]">
                    #<span className="px-2">{index + 1}</span>
                  </div>
                  <div className="w-[18%] flex">
                    {ticket.numsPlayed.map((num) => (
                      <div
                        key={num}
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
                  <div className="w-[7%] pl-2">
                    {ticket.ticketWinnerNums.length}
                  </div>
                  <div className="w-[15%] pl-0.5">
                    {formatNumber(ticket.amountWon)}
                    <span className="pl-2">AK</span>
                  </div>
                  <div className="w-[25%] pl-0.5">{ticket.date}</div>
                  <div className="w-[30%] pl-0.5">{ticket.id}</div>
                </div>
                <div className="flex items-center bg-slate-800 text-slate-200 tracking-wider gap-14 p-4 mb-4 rounded">
                  <p className="pl-2">Ticket cost: 500 AK</p>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-col gap-4 bg-slate-900 text-slate-100 tracking-widest p-4 mt-2 rounded mb-1">
            <h2>
              Total costs:{" "}
              <span className="pl-1">{formatNumber(totalCosts)} AK</span>
            </h2>
            <h2 className="border-b border-slate-500 pb-3">
              Total amount paid out:{" "}
              <span className="pl-1">{formatNumber(totalPaidOut)} AK</span>
            </h2>
            <h2>
              {userName}'s Total Profit:{" "}
              <span
                className={`pl-3 mr-2 ${
                  totalPaidOut - totalCosts < 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {totalProfit}
              </span>
              <span>AK</span>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserStats;
