import './style.css'
import {Link} from 'react-router-dom'

//TODO: clicking a username on the graph causes this menu to appear

//TODO: link to chatroom takes you directly to a new chat with the clicked user. Possibly include a default message.

//TODO: Change "add friend" to read "remove friend", if user already has that friend

const UserInteractionsMenu = function (props) {
  return (
    <div className="userInteractionsMenu">
      <h3>{props.username}</h3>
      <ul>
        <li>
          <Link to="/chatroom">
            Ask {props.username} to enjoy {props.interest.toLowerCase()} with
            you!
          </Link>
        </li>
        <li>Add friend</li>
        <li>
          {' '}
          <Link to="/chatroom">Chat</Link>
        </li>
      </ul>
    </div>
  )
}

export default UserInteractionsMenu
