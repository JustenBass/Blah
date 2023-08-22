import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { UserProvider } from './context/user';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login'
import CurrentBlog from './pages/CurrentBlog';
import './App.css';


function App(props) {

return (
    <div className="App">
         <UserProvider>
         <Router>
          <Navbar/>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/signup" element={<Signup />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/blogs/:id" element={<CurrentBlog />}/>
            </Routes>
            </Router>
        </UserProvider>
  </div>
    )
}

export default App;
