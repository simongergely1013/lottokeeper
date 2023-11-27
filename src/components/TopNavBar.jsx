import React from "react";
import { useSelector } from "react-redux";

const styles = {
  main: "w-full h-24 flex justify-center items-center bg-slate-950",
};

const TopNavBar = () => {
  const { userCurrentSelectedNums, ownerCurrentSelectedNums } = useSelector(
    (state) => state.data
  );

  return (
    <div className={styles.main}>
      <div className="w-9/12 h-24 flex items-center ">
        <div className="w-[66%] flex justify-center items-center gap-3 text-slate-900 text-xl font-bold">
          {userCurrentSelectedNums.length !== 0
            ? userCurrentSelectedNums.map((num) => (
                <div
                  className="w-10 h-10 flex justify-center items-center bg-slate-200 border rounded-full"
                  key={num}
                >
                  {num}
                </div>
              ))
            : ownerCurrentSelectedNums.length !== 0
            ? ownerCurrentSelectedNums.map((num) => (
                <div
                  className="w-10 h-10 flex justify-center items-center bg-slate-200 border rounded-full"
                  key={num}
                >
                  {num}
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
