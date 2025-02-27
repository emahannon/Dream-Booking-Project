// frameworks etc.
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// local imports
import Search from './views/Search/Search';
import LoginPage from './views/Auth/Login/LoginPage';
import UserProfile from "./views/Profile/UserProfile";
import Header from "./layout/Header/Header"
import MyTrips from "./views/MyTrips/MyTrips";
import PastTrips from "./views/PastTrips/PastTrips";
import CreateProfile from './views/Auth/CreateProfile/CreateProfile';
import Review from "./views/Review/Review";
import Booking from "./views/CreateBooking/CreateBooking"
import Book from "./views/Book/Book"
import ViewMyTrip from "./views/ViewMyTrip/ViewMyTrip"

import './App.css';


function App() {
  return (
      <Router>
          <Header />
        <Routes>
            <Route path="/" exact element={<Search />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/current" element={<MyTrips />} />
            <Route path="/past" element={<PastTrips />} />
            <Route path="/signup" element={<CreateProfile />} />
            <Route path="/review/:hotelId/:userId" element={<Review />} />
            <Route path="/booking/:id/:date1/:date2" element={<Booking/>} />
            <Route path="/book/:hotelId/:roomId/:date1/:date2" element={<Book/>} />
            <Route path="/view" element={<ViewMyTrip />} />
        </Routes>
      </Router>
  );
}

export default App;
