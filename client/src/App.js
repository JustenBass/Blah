import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { UserProvider } from './context/user';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login'
import UserProfile from './pages/UserProfile';
import CurrentBlog from './pages/CurrentBlog';
import Settings from './pages/Settings';
import UpdateUsernameForm from './pages/UpdateUsernameForm';
import UpdatePasswordForm from './pages/UpdatePasswordForm'
import DeactivateUser from './pages/DeactivateUser';
import './App.css';


function App() {

return (
    <div className="App">
         <UserProvider>
         <Router>
          <Navbar/>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/signup" element={<Signup />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/profile" element={<UserProfile />}/>
              <Route path="/settings" element={<Settings />}/>
              <Route path="/updateUsernameForm" element={<UpdateUsernameForm />}/>
              <Route path="/updatePasswordForm" element={<UpdatePasswordForm />}/>
              <Route path="/deactivateAccount" element={<DeactivateUser />}/>
              <Route path="/blogs/:id" element={<CurrentBlog />}/>
            </Routes>
            </Router>
        </UserProvider>
  </div>
    )
}

export default App;
