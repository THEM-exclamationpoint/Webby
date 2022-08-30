import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from '../../store/auth/user'
import {Link} from 'react-router-dom'
const Home = () => {
  const dispatch = useDispatch()
  let user = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(setUser())
  }, [dispatch])

  return (
    <div>
      <h1> Welcome, {user.name}!</h1>
      <Link to="/graph">Graph</Link>
      <Link to="/chatroom">Chat</Link>
      <Link to="/editprofile">EditProfile</Link>
    </div>
  )
}

export default Home
