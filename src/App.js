import { ToastContainer } from "react-toastify";
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx'

function App() {
  return (
    <div className="App">
      <HomePage/>
      <ToastContainer position="top-right" />

    </div>
  );
}

export default App;
