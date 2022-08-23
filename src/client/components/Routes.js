import { Routes, Route} from 'react-router-dom';
import LogIn from './Auth/Login';
import Home from './Home';
import Signup from './Auth/Sign-up';
import Chat from './Chat/ChatRoom'

function WebbyRoutes () {
    return (
        <Routes>
        <Route exact path="/home" element={<Home/>} />  
        <Route exact path="/" element={<LogIn/>} />
        <Route exact path="/register" element={<Signup/>} />
        <Route exact path="/chatroom" element={<Chat/>} />
      </Routes>
    )
}

export default  WebbyRoutes