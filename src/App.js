import React from 'react';
import NavBar from './components/NavBar';
import TopNavBar from './components/TopNavBar';
import UserGame from './components/UserGame';

const styles = {
  wrapper: 'h-screen w-screen flex',
  main: 'w-full h-screen flex flex-col justify-center items-center bg-slate-700'
}

const App = () => {
  return (
    <div className={styles.wrapper}>
     <NavBar/>
     <div className={styles.main}>
      <TopNavBar/>
      <UserGame/>
     </div>
    </div>
  );
}

export default App;