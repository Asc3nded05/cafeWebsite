import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import CreateAccount from './pages/CreateAccount'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Stats from './pages/Stats'
import ProtectedRoute from './components/ProtectedRoutes'
import { jwtDecode } from 'jwt-decode';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Footer from './components/Footer'
import Navigation from './components/Navigation'
import NoPage from './pages/NoPage'
import NavigationAdmin from "./components/NavigationAdmin";
import { useEffect, useState } from "react";

// const getRoleFromToken = () => {
//   const token = localStorage.getItem('authToken');
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       return decodedToken?.role || 'guest'; // Default to 'guest' if no role
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       return 'guest'; // Return 'guest' or handle the error as needed
//     }
//   }
//   return 'guest'; // Default role if no token
// };

function App() {
  // const [Nav, setNav] = useState(getViewOnRole()); // Initialize Nav
  //   useEffect(() => {
  //       // Re-calculate Nav whenever the role state changes
  //       setNav(getViewOnRole());
  //   }, [])
  // const [count, setCount] = useState(0)
  
  return (
    
    <div id="root" className="d-flex flex-column min-vh-100">
      
      <BrowserRouter>
        <Navigation/>
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
            path="/orders"
            element={
              <ProtectedRoute role={"admin"}>
                <Orders/>
              </ProtectedRoute>
            }
          />
          </Routes>
          
    
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App