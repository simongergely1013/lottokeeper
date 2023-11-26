import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeNumberOwner } from "../store/data/actions";

const styles = {
  number:
    "w-8 h-8 flex justify-center items-center border rounded-full bg-slate-100 text-center font-bold m-1 cursor-pointer transition-all duration-100 hover:bg-green-500 hover:text-slate-100 drop-shadow-xl",
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
      key={number}
      className={`${styles.number} ${
        isActive && "bg-green-600 text-slate-100"
      }`}
      onClick={() => handleNumClick(number)}
    >
      {number}
    </div>
  );
};

export default TicketNumberOwner;
