import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Menu, Truck, Home, UtensilsCrossed } from 'lucide-react';

function Navigation() {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Navbar expand="lg" className="bg-fendo-red" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <UtensilsCrossed size={32} />
          Fendo Shawarma
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="d-flex align-items-center gap-1">
              <Home size={18} /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/menu" className="d-flex align-items-center gap-1">
              <Menu size={18} /> Menu
            </Nav.Link>
            <Nav.Link as={Link} to="/tracking" className="d-flex align-items-center gap-1">
              <Truck size={18} /> Track Order
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/cart" className="d-flex align-items-center gap-1 position-relative">
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <Badge 
                  bg="warning" 
                  text="dark" 
                  className="position-absolute top-0 start-100 translate-middle rounded-circle"
                >
                  {itemCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
