import { Routes, Route} from 'react-router-dom';
import LogIn from './Auth/Login';
import Home from './Home';
import Signup from './Auth/Sign-up';

function WebbyRoutes () {
    return (
        <Routes>
        <Route exact path="/home" element={<Home/>} />  
        <Route exact path="/" element={<LogIn/>} />
        <Route exact path="/register" element={<Signup/>} />
      </Routes>
    )
}

export default  WebbyRoutes