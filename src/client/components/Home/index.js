import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/auth/user';
 const Home = () => {
    const dispatch = useDispatch();
    let user = useSelector((state) => state.user);
    useEffect(()=>{
        dispatch(setUser())
    },[dispatch])

    return (
        <div>
            Welcome
        </div>
    )
}

export default Home