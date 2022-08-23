import { Routes, Route} from 'react-router-dom';
import LogIn from './Auth/Login';
import Home from './Home';
import Signup from './Auth/Sign-up';
import EditProfile from './Profile/EditProfile';

function WebbyRoutes () {
    return (
        <Routes>
        <Route exact path="/home" element={<Home/>} />  
        <Route exact path="/" element={<LogIn/>} />
        <Route exact path="/register" element={<Signup/>} />
        <Route exact path="/editprofile" element={<EditProfile/>} />
      </Routes>
    )
}

export default WebbyRoutes;