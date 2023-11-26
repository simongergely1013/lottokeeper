import React from "react";
import { useDispatch } from "react-redux";
import { createUserName } from "../store/data/actions";
import { useState } from "react";

const styles = {
  main: "relative w-full h-full flex flex-col justify-center items-center text-slate-100",
  createUserNameWrapper:
    "w-full h-full flex flex-col justify-center items-center bg-slate-700 text-slate-100",
  form: "w-1/4 flex flex-col items-center gap-5 p-10 rounded bg-slate-900",
  titleDiv: "w-full flex justify-center items-center",
  title: "text-2xl font-bold tracking-widest",
  input: "w-full h-9 pl-4 border rounded text-slate-900",
  submitDiv: "w-full h-1/3 flex justify-center",
  submit: "w-full h-10 rounded py-1 px-10 text-xl bg-indigo-500 cursor-pointer",
};

const CreateUserName = () => {
  const [userName, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(createUserName(userName));
    setUsername("");
  };

  return (
    <div className={styles.createUserNameWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.titleDiv}>
          <h1 className={styles.title}>Create username</h1>
        </div>
        <input
          placeholder="Enter username..."
          className={styles.input}
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className={styles.submitDiv}>
          <input
            type="submit"
            className={styles.submit}
            onClick={() => handleSubmit()}
          />
        </div>
      </form>
    </div>
  );
};

const CreateUserNameModal = () => {
  return (
    <div className={styles.main}>
      <CreateUserName />
    </div>
  );
};

export default CreateUserNameModal;
