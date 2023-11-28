import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeNumberOwner } from "../store/data/actions";

const styles = {
  number:
    "w-8 h-8 flex justify-center items-center rounded-full text-center font-bold m-1 cursor-pointer transition-all duration-100 hover:bg-green-700 hover:text-slate-100 drop-shadow-xl",
};

const TicketNumberOwner = ({ number }) => {
  const [isActive, setIsActive] = useState(false);
  const { ownerCurrentSelectedNums } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const handleNumClick = (num) => {
    if (
      ownerCurrentSelectedNums.length >= 5 ||
      ownerCurrentSelectedNums.includes(num)
    ) {
      return;
    } else {
      setIsActive(!isActive);
      dispatch(placeNumberOwner(num));
    }
  };

  useEffect(() => {
    if (ownerCurrentSelectedNums.length === 0) {
      setIsActive(false);
    }
  }, [ownerCurrentSelectedNums]);

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

export default TicketNumberOwner;
