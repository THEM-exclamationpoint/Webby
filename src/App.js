import "./App.css";
import LogIn from "./client/components/Auth";
import WebbyRoutes from './client/components/Routes'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WebbyRoutes/>
      </header>
    </div>
  );
}

export default App;
