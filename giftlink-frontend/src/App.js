import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';  // Imported LoginPage
import RegisterPage from './components/RegisterPage/RegisterPage';  // Imported RegisterPage
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/app" element={<MainPage />} />
          <Route path="/app/login" element={<LoginPage/>} />  // Route for LoginPage
          <Route path="/app/register" element={<RegisterPage />} />  // Route for RegisterPage
        </Routes>
    </Router>
  );
}

export default App;
