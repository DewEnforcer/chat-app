
import { Redirect, Route, Switch } from 'react-router-dom';

import ChatRoom from './components/ChatRoom';
import Header from './components/Header';
import JoinChat from './components/chat/JoinChat';
import CreateChat from './components/chat/CreateChat';
import Home from './components/Home';

import "react-toastify/dist/ReactToastify.css";
import './App.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Header/>
      <ToastContainer/>
      <div className="content">
        <Switch>
          <Route path="/joinChat/:id?" component={JoinChat} />
          <Route path="/newChat" component={CreateChat} />
          <Route path="/chatRoom" component={ChatRoom}/>
          <Route path="/home" component={Home}/>
          <Redirect from="/" to="/home"/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
