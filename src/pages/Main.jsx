import React from "react";
import { Link } from "react-router-dom";
import { GiReceiveMoney } from "react-icons/gi";

const styles = {
  main: "w-full h-full flex justify-center items-center overflow-y-auto",
  container: "w-full h-full flex flex-col items-center p-16",
  logoIcon: "w-1/3 h-1/3 fill-slate-100 bg-slate-900 p-6 rounded-t-3xl",
  logoText:
    "w-1/3 text-4xl font-bold bg-slate-900 text-center p-8 rounded-b-2xl text-slate-100 tracking-widest mb-4",
  buttonsContainer: "w-1/3 flex justify-center items-center gap-4",
  button:
    "w-1/2 bg-slate-900 text-slate-100 text-center tracking-widest font-bold p-4 rounded-xl transition duration-300 ease-in-out hover:animate-pulse hover:scale-110",
};

const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <GiReceiveMoney className={styles.logoIcon} />
        <h1 className={styles.logoText}>Lottokeeper</h1>
        <div className={styles.buttonsContainer}>
          <Link to="/user/game" className={styles.button}>
            User Mode
          </Link>
          <Link to="/owner/game" className={styles.button}>
            Owner Mode
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
