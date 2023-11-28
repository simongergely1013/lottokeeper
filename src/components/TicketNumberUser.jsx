import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeNumberUser } from "../store/data/actions";

const styles = {
  number:
    "w-8 h-8 flex justify-center items-center rounded-full text-center font-bold m-1 cursor-pointer hover:bg-green-700 hover:text-slate-100 drop-shadow-xl",
};

const TicketNumberUser = ({ number }) => {
  const [isActive, setIsActive] = useState(false);
  const { userCurrentSelectedNums } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const handleNumClick = (num) => {
    if (
      userCurrentSelectedNums.length >= 5 ||
      userCurrentSelectedNums.includes(num)
    ) {
      return;
    } else {
      setIsActive(!isActive);
      dispatch(placeNumberUser(num));
    }
  };

  useEffect(() => {
    if (userCurrentSelectedNums.length === 0) {
      setIsActive(false);
    }
  }, [userCurrentSelectedNums]);

  return (
    <div
      className={`${styles.number} ${
        isActive ? "bg-green-700 text-slate-100" : "bg-slate-100 text-slate-900"
      }`}
      onClick={() => handleNumClick(number)}
    >
      {number}
    </div>
  );
};

export default TicketNumberUser;
