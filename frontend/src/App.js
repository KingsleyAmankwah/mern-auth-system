/*eslint-disable*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App m-0 p-0 w-full h-full">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;
