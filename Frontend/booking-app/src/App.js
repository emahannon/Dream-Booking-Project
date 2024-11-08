// frameworks etc.
import React from 'react';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// local imports
import Search from './views/Search/Search';
import LoginPage from './views/Auth/Login/LoginPage';
import UserProfile from "./views/Profile/UserProfile";
import Header from "./layout/Header/Header"
import MyTrips from "./views/MyTrips/MyTrips";
import PastTrips from "./views/PastTrips/PastTrips";
import SavedBookings from "./views/SavedBookings/SavedBookings";
import CreateProfile from './views/Auth/CreateProfile/CreateProfile';
import './App.css';


function App() {
  return (
      <Router>
          <Header />
        <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/current" element={<MyTrips />} />
            <Route path="/past" element={<PastTrips />} />
            <Route path="/saved" element={<SavedBookings />} />
            <Route path="/signup" element={<CreateProfile />} />
        </Routes>
      </Router>
  );
}

export default App;
