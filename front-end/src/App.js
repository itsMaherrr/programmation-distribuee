import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import MyNavbar from './Navbar';
import Login from './Login';
import Register from './Register';
import Browse from './Browse';
import List from './List';

function App() {
  return (
    <Router>
      <div className="App">
          <MyNavbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Browse />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/browse" element={<Browse />} />
              <Route path = "/list" element={<List />} />
            </Routes>
          </div>
      </div>
    </Router>
  );
}

export default App;
