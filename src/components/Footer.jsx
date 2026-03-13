import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import fendoMainLogo from '../../images/fendo mainlogo.jpeg';

function Footer() {
  return (
    <footer className="bg-dark text-white py-5 mt-auto">
      <Container>
        <div className="row g-4">
          <div className="col-md-6 text-center text-md-start">
            <h4 className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-3 text-fendo-yellow">
              <img src={fendoMainLogo} alt="Fendo" className="footer-logo" /> Fendo Shawarma
            </h4>
            <p className="text-muted small mb-0">
              The best shawarma and grilled delicacies in town. Delivered fast and fresh to your doorstep.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <h5 className="text-white mb-3">Quick Links</h5>
            <div className="d-flex flex-column gap-2">
              <Link to="/" className="text-decoration-none text-muted hover-text-white">Home</Link>
              <Link to="/menu" className="text-decoration-none text-muted hover-text-white">Menu</Link>
              <Link to="/tracking" className="text-decoration-none text-muted hover-text-white">Track Order</Link>
            </div>
          </div>
        </div>
        <hr className="my-4 border-secondary" />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-muted small">
          <p className="mb-2 mb-md-0">&copy; {new Date().getFullYear()} Fendo Shawarma & Grills. All rights reserved.</p>
          <div>
            {/* Discreet Admin Link */}
            <Link to="/admin" className="text-decoration-none text-secondary" style={{ opacity: 0.5, fontSize: '0.8rem' }}>
              Staff Access
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
