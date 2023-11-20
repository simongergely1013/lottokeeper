import React from 'react';
import NavBar from './components/NavBar';
import TopNavBar from './components/TopNavBar';
import UserGame from './components/UserGame';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const styles = {
  wrapper: 'h-screen w-screen flex',
  main: 'w-full h-screen flex flex-col justify-center items-center bg-slate-700'
}

const App = () => {
  return (
    <Router>
    <div className={styles.wrapper}>
     <NavBar/>
     <div className={styles.main}>
      <TopNavBar/>
      <UserGame/>
      {/* <Switch>
       <Route path='/'>
       </Route>
      </Switch> */}
     </div>
    </div>
    </Router>
  );
}

export default App;