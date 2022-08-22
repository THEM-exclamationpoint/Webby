import { Routes, Route} from 'react-router-dom';
import LogIn from './Auth';
import Home from './Home';

function WebbyRoutes () {
    return (
        <Routes>
        <Route exact path="/" element={<LogIn/>} />
        <Route exact path="/home" element={<Home/>} />
      </Routes>
    )
}

export default  WebbyRoutes