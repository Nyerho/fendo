import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import { useOrder } from '../context/OrderContext';
import { CheckCircle, Truck, Package, Clock, DollarSign, Lock } from 'lucide-react';
import { useState } from 'react';

function Admin() {
  const { orders, updateOrderStatus } = useOrder();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'fendo123') { // Simple password as requested
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'payment_review': return <Badge bg="warning" text="dark">Payment Review</Badge>;
      case 'confirmed': return <Badge bg="info">Confirmed</Badge>;
      case 'preparing': return <Badge bg="primary">Preparing</Badge>;
      case 'out_for_delivery': return <Badge bg="warning">Out for Delivery</Badge>;
      case 'delivered': return <Badge bg="success">Delivered</Badge>;
      default: return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const handleAction = (orderId, currentStatus) => {
    let nextStatus = '';
    if (currentStatus === 'payment_review') nextStatus = 'confirmed';
    else if (currentStatus === 'confirmed') nextStatus = 'preparing';
    else if (currentStatus === 'preparing') nextStatus = 'out_for_delivery';
    else if (currentStatus === 'out_for_delivery') nextStatus = 'delivered';
    
    if (nextStatus) {
      updateOrderStatus(orderId, nextStatus);
    }
  };

  if (!isAuthenticated) {
    return (
      <Container className="py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow border-0">
              <div className="card-body p-4 text-center">
                <div className="mb-4 text-fendo-red">
                  <Lock size={48} />
                </div>
                <h3 className="mb-4">Admin Access</h3>
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-center"
                      autoFocus
                    />
                  </Form.Group>
                  {error && <p className="text-danger small mb-3">{error}</p>}
                  <Button variant="danger" type="submit" className="w-100">
                    Login
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="d-flex align-items-center gap-2 mb-0">
          <CheckCircle className="text-fendo-red" /> Admin Dashboard
        </h2>
        <Button variant="outline-secondary" size="sm" onClick={() => setIsAuthenticated(false)}>
          Logout
        </Button>
      </div>
      
      {orders.length === 0 ? (
        <div className="text-center py-5 bg-light rounded shadow-sm">
          <p className="lead text-muted">No orders yet.</p>
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <Table hover className="align-middle mb-0 bg-white">
            <thead className="bg-light">
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="fw-bold">{order.id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                  <td>
                    <div>{order.customerDetails.name}</div>
                    <small className="text-muted">{order.customerDetails.phone}</small>
                    {order.customerDetails.email && <div className="text-muted small">{order.customerDetails.email}</div>}
                  </td>
                  <td>
                    <ul className="list-unstyled mb-0 small">
                      {order.items.map((item, idx) => (
                        <li key={idx}>{item.quantity}x {item.name}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="fw-bold">₦{order.total.toLocaleString()}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>
                    {order.status === 'payment_review' && (
                      <Button variant="success" size="sm" onClick={() => handleAction(order.id, order.status)}>
                        <DollarSign size={16} className="me-1" /> Confirm Payment
                      </Button>
                    )}
                    {order.status === 'confirmed' && (
                      <Button variant="primary" size="sm" onClick={() => handleAction(order.id, order.status)}>
                        <Package size={16} className="me-1" /> Start Preparing
                      </Button>
                    )}
                    {order.status === 'preparing' && (
                      <Button variant="warning" size="sm" onClick={() => handleAction(order.id, order.status)}>
                        <Truck size={16} className="me-1" /> Send Out
                      </Button>
                    )}
                    {order.status === 'out_for_delivery' && (
                      <Button variant="outline-success" size="sm" onClick={() => handleAction(order.id, order.status)}>
                        <CheckCircle size={16} className="me-1" /> Mark Delivered
                      </Button>
                    )}
                    {order.status === 'delivered' && (
                      <span className="text-success fw-bold"><CheckCircle size={16} /> Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}

export default Admin;
