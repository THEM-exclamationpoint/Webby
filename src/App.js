import "./App.css";
import LogIn from "./client/components/Auth";
import WebbyRoutes from './client/components/Routes'
import NavBar from "./client/components/Nav";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar/>
        <WebbyRoutes/>
      </header>
    </div>
  );
}

export default App;
