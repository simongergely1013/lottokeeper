import React from "react";
import { useSelector } from "react-redux";

const styles = {
  main: "w-full h-24 flex justify-center items-center bg-slate-900",
};

const TopNavBar = () => {
  const { currentSelectedNums } = useSelector((state) => state.data.user);

  return (
    <div className={styles.main}>
      <div className="w-9/12 h-24 flex items-center ">
        <div className="w-[66%] flex justify-center items-center gap-3 text-slate-100 text-xl">
          {currentSelectedNums &&
            currentSelectedNums.map((num) => (
              <div
                className="w-10 h-10 flex justify-center items-center border rounded-full"
                key={num}
              >
                {num}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
