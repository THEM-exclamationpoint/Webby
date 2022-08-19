import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { logIn } from './store/auth/login.js';

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let user = useSelector((state) => state.user);
  
    let [userInfo, setUserInfo] = useState({
      username: '',
      password: '',
      accountId: 0,
    });
  
    let [success, setSuccess] = useState(false);
    let [errMsg, setErrMsg] = useState('');
  
    useEffect(() => {
      setErrMsg('');
    }, [userInfo]);
  
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
        accountId: accountNumGen(),
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(fetchUser(userInfo))
        .then(window.localStorage.setItem('CURRENT_USER_ACCT', user.accountId))
        .then(window.localStorage.setItem('userToken', user.password))
        .then(setUserInfo({ username: '', password: '' }))
        .then(setSuccess(true))
        .then(dispatch(logIn()));
    };
  
    const accountNumGen = () => {
      return Math.floor(Math.random() * 10000000000) + 1;
    };
  
    return (
      <div className="LogIn container">
        <section>
          <p className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              autoComplete="off"
              required
              onChange={handleChange}
            />
  
            <label htmlFor="password">Password:</label>
            <input
              name="password"
              type="password"
              id="password"
              required
              onChange={handleChange}
            />
            <button type="submit">Sign In</button>
          </form>
  
          <div>
            Need an Account?
            <br />
            <div className="line">
              <Link to="/register">Sign Up</Link>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default LogIn;