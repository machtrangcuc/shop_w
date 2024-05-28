import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from './views/logIn.jsx'
import SignUp from './views/signUp.jsx'
import HomePage from './views/homePage.jsx';
import Laptop from './views/laptopPage.jsx';
import Phone from './views/phonePage.jsx';
import Other from './views/otherPage.jsx';
import CartPage from './views/cartPage.jsx';
import ProfilePage from './views/profilePage.jsx';

function App() {

  return (
    <>
      <div className="h-full w-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/laptop" element={<Laptop />} />
            <Route path="/phone" element={<Phone />} />
            <Route path="/other" element={<Other />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
