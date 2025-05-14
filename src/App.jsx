import React, { useEffect, useState } from "react";
import Navbar from "./components/reusables/Navbar";
import { Routes, BrowserRouter, Route, Router, Navigate } from "react-router-dom";
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import ProductPage from "./components/ProductPage";
import ProtectedRoute from "./components/reusables/ProtectedRoute";
import Cart from "./components/cart";
import Profile from "./components/Profile";
import PaymentPage from "./components/PaymentPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
      setUser(user);
    });

    return () => unsubscribe();
  },[]);

  return (
    <div className="bg-gray-700 min-h-screen">
      <BrowserRouter>
        <Navbar user={user}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
          <Route path="/cart" element={
            <ProtectedRoute user={user}>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute user={user}>
              <Profile />
            </ProtectedRoute>
          } />
           <Route path="/payment" element={
            <ProtectedRoute user={user}>
              <PaymentPage />
            </ProtectedRoute>
          } />
          <Route path="/product/:id" element={<ProductPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
