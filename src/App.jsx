import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Tracking from './pages/Tracking';
import Admin from './pages/Admin';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <Navigation />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/tracking" element={<Tracking />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </OrderProvider>
    </CartProvider>
  );
}

export default App;
