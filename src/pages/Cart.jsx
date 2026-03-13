import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, CreditCard, Banknote } from 'lucide-react';
import { useState } from 'react';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const { createOrder } = useOrder();
  const navigate = useNavigate();
  
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({ name: '', phone: '', email: '', address: '' });
  const [paymentStep, setPaymentStep] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  if (cartItems.length === 0) {
    return (
      <Container className="mt-5 text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="text-fendo-red mb-3">
          <ShoppingBag size={64} />
        </div>
        <h2 className="mb-3">Your Cart is Empty</h2>
        <p className="lead text-muted mb-4">Looks like you haven't added any delicious food yet.</p>
        <Button as={Link} to="/menu" variant="danger" size="lg" className="px-5">Browse Menu</Button>
      </Container>
    );
  }

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setPaymentStep(true);
  };

  const confirmPayment = () => {
    // Create order in context
    const orderId = createOrder(cartItems, total, customerDetails);
    setCurrentOrderId(orderId);
    setOrderComplete(true);
    clearCart();
  };

  const closeCheckout = () => {
    setShowCheckout(false);
    setPaymentStep(false);
    setOrderComplete(false);
    if (orderComplete) {
      navigate('/tracking');
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <h2 className="mb-4 fw-bold text-fendo-red">Your Cart</h2>
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <Table responsive hover className="mb-0">
            <thead className="bg-light">
              <tr>
                <th className="py-3 ps-4">Item</th>
                <th className="py-3">Price</th>
                <th className="py-3">Quantity</th>
                <th className="py-3">Subtotal</th>
                <th className="py-3 text-end pe-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="align-middle">
                  <td className="ps-4 fw-medium">{item.name}</td>
                  <td>₦{item.price.toLocaleString()}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="rounded-circle"
                        style={{ width: '32px', height: '32px', padding: 0 }}
                      >-</Button>
                      <span className="fw-bold mx-1">{item.quantity}</span>
                      <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="rounded-circle"
                        style={{ width: '32px', height: '32px', padding: 0 }}
                      >+</Button>
                    </div>
                  </td>
                  <td className="fw-bold">₦{(item.price * item.quantity).toLocaleString()}</td>
                  <td className="text-end pe-4">
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                    ><Trash2 size={18} /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-light">
                <tr>
                    <td colSpan="3" className="text-end fw-bold py-3 fs-5">Total:</td>
                    <td colSpan="2" className="fw-bold py-3 fs-5 text-fendo-red">₦{total.toLocaleString()}</td>
                </tr>
            </tfoot>
          </Table>
        </div>
      </div>
      <div className="d-flex justify-content-end gap-3 mt-4">
        <Button variant="outline-secondary" onClick={clearCart} size="lg">Clear Cart</Button>
        <Button variant="warning" onClick={handleCheckout} size="lg" className="fw-bold px-5">Checkout</Button>
      </div>

      {/* Checkout Modal */}
      <Modal show={showCheckout} onHide={closeCheckout} backdrop="static" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {orderComplete ? 'Order Confirmed!' : paymentStep ? 'Make Payment' : 'Checkout Details'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderComplete ? (
            <div className="text-center py-4">
              <div className="text-success mb-3">
                <ShoppingBag size={64} />
              </div>
              <h4>Thank you for your order!</h4>
              <p className="lead">Your Order ID is: <span className="fw-bold text-fendo-red">{currentOrderId}</span></p>
              <p className="text-muted">We have received your payment confirmation. Our admin will verify and process your order shortly.</p>
              <div className="alert alert-info">
                Please save your Order ID to track your delivery status.
              </div>
            </div>
          ) : paymentStep ? (
            <div>
              <p className="lead mb-4">Total Amount to Pay: <span className="fw-bold text-fendo-red">₦{total.toLocaleString()}</span></p>
              
              <div className="d-grid gap-3 mb-4">
                <div className="card p-3 border-warning bg-light">
                  <div className="d-flex align-items-center gap-3">
                    <Banknote size={32} className="text-success" />
                    <div>
                      <h6 className="mb-1 fw-bold">Bank Transfer</h6>
                      <p className="mb-0 small text-muted">Transfer to: Fendo Grills | GTBank | 0123456789</p>
                    </div>
                  </div>
                </div>
                
                <div className="card p-3">
                  <div className="d-flex align-items-center gap-3">
                    <CreditCard size={32} className="text-primary" />
                    <div>
                      <h6 className="mb-1 fw-bold">Card Payment</h6>
                      <p className="mb-0 small text-muted">Pay securely with your debit/credit card</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="alert alert-warning small">
                Note: After making the transfer, click the button below to notify us. Admin will verify your payment before processing.
              </div>
            </div>
          ) : (
            <Form onSubmit={handlePayment}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control 
                  type="text" 
                  required 
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control 
                  type="tel" 
                  required 
                  value={customerDetails.phone}
                  onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                  type="email" 
                  required 
                  value={customerDetails.email}
                  onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Delivery Address</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  required 
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                />
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button type="submit" variant="fendo">Proceed to Payment</Button>
              </div>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          {orderComplete ? (
            <Button variant="warning" onClick={() => {
              closeCheckout();
              navigate('/tracking');
            }}>Track Order</Button>
          ) : paymentStep ? (
            <>
              <Button variant="secondary" onClick={() => setPaymentStep(false)}>Back</Button>
              <Button variant="success" onClick={confirmPayment}>I Have Made Payment</Button>
            </>
          ) : (
            <Button variant="secondary" onClick={closeCheckout}>Cancel</Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Cart;
