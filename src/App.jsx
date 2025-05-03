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

function App() {
  return (
    
    <div id="root" className="d-flex flex-column min-vh-100">
      
      <BrowserRouter>
        {/* <Navigation/> */}
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
          <Route
            path="/stats"
            element={
              <ProtectedRoute role={"admin"}> 
                <Stats/>
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