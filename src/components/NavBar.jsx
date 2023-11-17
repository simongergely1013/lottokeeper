import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DropdownTriangle, BalanceSvg, PlaySvg, StatsSvg } from "./Svgs";

const styles = {
  main: "h-screen w-1/5 flex flex-col items-center bg-slate-900 text-slate-100 px-4 py-6 border",
  conatiner: "w-full flex items-center justify-center font-bold border",
  stats: "text-xl mr-20",
  title: "text-3xl tracking-widest",
  triangleToggle: "transition-all 0.2s ease-in-out",
  dropdown:
    "flex flex-col gap-3 transition-opacity duration-200 ease-in-out opacity-0",
  dropdownText: "text-sm",
};

const NavBar = () => {
  const { name } = useSelector((state) => state.user.user);
  const userBalance = useSelector((state) => state.user.user.totalBalance);
  const ownerBalance = useSelector((state) => state.owner.owner.totalBalance);
  const [userToggle, setUserToggle] = useState(false);
  const [ownerToggle, setOwnerToggle] = useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.conatiner}>
        <h1 className={styles.title}>Lottokeeper</h1>
      </div>
      <div className="w-full mt-10  px-6">
        <div className="flex items-center gap-1 mb-4">
          <h2>{name}</h2>
          <div onClick={() => setUserToggle(!userToggle)}>
            <DropdownTriangle
              className={`${styles.triangleToggle} ${
                userToggle && "rotate-90"
              }`}
            />
          </div>
        </div>
        <div className={`${styles.dropdown} ${userToggle && "opacity-100"}`}>
          <div className="flex items-center">
            <BalanceSvg />
            <p className={styles.dropdownText}>Total balance: {userBalance}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <PlaySvg />
              <p className={styles.dropdownText}>Play game</p>
            </div>
            <div className="flex items-center">
              <StatsSvg />
              <p className={styles.dropdownText}>Statistics</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-10 px-6">
        <div className="flex items-center gap-1 mb-4">
          <h2>OWNER</h2>
          <div onClick={() => setOwnerToggle(!ownerToggle)}>
            <DropdownTriangle
              className={`${styles.triangleToggle} ${
                ownerToggle && "rotate-90"
              }`}
            />
          </div>
        </div>
        <div className={`${styles.dropdown} ${ownerToggle && "opacity-100"}`}>
          <div className="flex items-center">
            <BalanceSvg />
            <p className={styles.dropdownText}>Total balance: {ownerBalance}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <PlaySvg />
              <p className={styles.dropdownText}>Play game</p>
            </div>
            <div className="flex items-center">
              <StatsSvg />
              <p className={styles.dropdownText}>Statistics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
