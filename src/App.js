import React, { useEffect } from 'react';
import CreateUserNameModal from './pages/CreateUserNameModal';
import Main from './pages/Main';
import NavBar from './components/NavBar';
import TopNavBar from './components/TopNavBar';
import UserGame from './pages/UserGame';
import UserStats from './pages/UserStats';
import OwnerStats from './pages/OwnerStats';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

const styles = {
  wrapper: 'h-screen w-screen flex',
  main: 'w-full h-screen flex flex-col justify-center items-center bg-gradient-to-b from-slate-400 to-slate-600'
}

const App = () => {
  const {name} = useSelector(state => state.data.user);

  useEffect(() => {}, [name])
  return (
    <Router>
    <div className={styles.wrapper}>
      {name === "" ? <CreateUserNameModal/> :
      <>
     <NavBar/>
     <div className={styles.main}>
      <TopNavBar/>
      <Routes>
        <Route path='/' element={<Main/>}/> 
        <Route path='/user/game' element={<UserGame/>}/>
        <Route path='/user/stats' element={<UserStats/>}/>
        <Route path='/owner/stats' element={<OwnerStats/>}/>
      </Routes>
     </div>
     </>}
    </div>
    </Router>
  );
}

export default App;