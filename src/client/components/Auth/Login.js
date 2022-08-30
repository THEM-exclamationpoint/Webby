import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setUser } from '../../store/auth/user';
import { logIn, logInGoogle } from '../../store/auth';
import { Button, TextField } from '@mui/material';

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let user = useSelector((state) => state.auth);
  
    let [userInfo, setUserInfo] = useState({
      username: '',
      password: '',
    });
  
    let [success, setSuccess] = useState(false);
  
    useEffect(() => {
      if (success) {
        navigate('/home');
      }
    });
  
    const handleChange = (e) => {
      e.preventDefault();
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
       await dispatch(logIn(userInfo.username, userInfo.password))

       setSuccess(true)

       dispatch(setUser())
    };

    const handleSubmitGoogle = async(e) => {
      e.preventDefault();
       await dispatch(logInGoogle())

       setSuccess(true)

       dispatch(setUser())
    };

    return (
      <div className="login-container">
        <section>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
             <TextField
            onChange={handleChange}
            className="form-field"
            name="username"
            label="username"
            type="text"
            required
          />
          <div>
             <TextField
            onChange={handleChange}
            className="form-field"
            name="password"
            label="password"
            type="password"
            required
          /></div>
            <Button type="submit">Sign In</Button>
          </form>

  <Button type='button' onClick={handleSubmitGoogle}>Sign in with Google</Button>
  
          <div>
            Need an Account?
            <br />
            <div className="line">
              <Link to="/register"><Button>Sign Up</Button></Link>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default LogIn;