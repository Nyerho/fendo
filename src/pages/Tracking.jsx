import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Search, Package, MapPin, CheckCircle, Clock, AlertCircle, Truck } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

function Tracking() {
  const [orderId, setOrderId] = useState('');
  const [trackedOrderId, setTrackedOrderId] = useState('');
  const [error, setError] = useState('');
  const { getOrder } = useOrder();

  const normalizedTrackedOrderId = trackedOrderId.trim();
  const order = normalizedTrackedOrderId ? getOrder(normalizedTrackedOrderId) : null;

  const handleTrack = (e) => {
    e.preventDefault();
    const normalizedInput = orderId.trim();
    setTrackedOrderId(normalizedInput);
    const foundOrder = getOrder(normalizedInput);
    if (foundOrder) {
      setError('');
    } else {
      setError('Order not found. Please check the ID and try again.');
    }
  };

  const getStatusStep = (status) => {
    const steps = ['payment_review', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];
    return steps.indexOf(status);
  };

  const currentStep = order ? getStatusStep(order.status) : -1;

  return (
    <Container className="mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-5 text-fendo-red mb-3">Track Your Order</h2>
            <p className="lead text-muted">Enter your order ID to see the current status of your delivery.</p>
          </div>
          
          <div className="card shadow border-0 p-4 mb-5">
            <Form onSubmit={handleTrack}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Order ID</Form.Label>
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-light border-end-0">
                    <Package size={20} className="text-muted" />
                  </span>
                  <Form.Control 
                    type="text" 
                    placeholder="e.g. ORD-123456" 
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="border-start-0 ps-0"
                    required
                  />
                </div>
              </Form.Group>
              <Button variant="danger" type="submit" className="w-100 btn-lg fw-bold d-flex align-items-center justify-content-center gap-2">
                <Search size={20} /> Track Order
              </Button>
            </Form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </div>

          {order && (
            <div className="card border-0 shadow-sm bg-light">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                  <h4 className="fw-bold mb-0">Order Status</h4>
                  <span className="badge bg-secondary">{order.id}</span>
                </div>
                
                <div className="position-relative ps-4 border-start border-2 border-warning ms-2">
                  
                  {/* Step 1: Payment Review */}
                  <div className="mb-4 position-relative">
                    <div className={`position-absolute top-0 start-0 translate-middle ms-n4 rounded-circle p-1 ${currentStep >= 0 ? 'bg-success' : 'bg-secondary'}`}>
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <h6 className={`fw-bold mb-1 ${currentStep >= 0 ? 'text-success' : 'text-muted'}`}>Payment Review</h6>
                    <small className="text-muted">Waiting for admin to verify payment.</small>
                  </div>

                  {/* Step 2: Order Confirmed */}
                  <div className="mb-4 position-relative">
                    <div className={`position-absolute top-0 start-0 translate-middle ms-n4 rounded-circle p-1 ${currentStep >= 1 ? 'bg-success' : 'bg-secondary'}`}>
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <h6 className={`fw-bold mb-1 ${currentStep >= 1 ? 'text-success' : 'text-muted'}`}>Order Confirmed</h6>
                    <small className="text-muted">Payment verified. Order accepted.</small>
                  </div>

                  {/* Step 3: Preparing */}
                  <div className="mb-4 position-relative">
                    <div className={`position-absolute top-0 start-0 translate-middle ms-n4 rounded-circle p-1 ${currentStep >= 2 ? 'bg-success' : 'bg-secondary'}`}>
                      <Clock size={16} className="text-white" />
                    </div>
                    <h6 className={`fw-bold mb-1 ${currentStep >= 2 ? 'text-success' : 'text-muted'}`}>Preparing</h6>
                    <small className="text-muted">Our chefs are preparing your meal.</small>
                  </div>

                  {/* Step 4: Out for Delivery */}
                  <div className="mb-4 position-relative">
                    <div className={`position-absolute top-0 start-0 translate-middle ms-n4 rounded-circle p-1 ${currentStep >= 3 ? 'bg-success' : 'bg-secondary'}`}>
                      <Truck size={16} className="text-white" />
                    </div>
                    <h6 className={`fw-bold mb-1 ${currentStep >= 3 ? 'text-success' : 'text-muted'}`}>Out for Delivery</h6>
                    <small className="text-muted">Your rider is on the way!</small>
                  </div>

                   {/* Step 5: Delivered */}
                   <div className="mb-0 position-relative">
                    <div className={`position-absolute top-0 start-0 translate-middle ms-n4 rounded-circle p-1 ${currentStep >= 4 ? 'bg-success' : 'bg-secondary'}`}>
                      <MapPin size={16} className="text-white" />
                    </div>
                    <h6 className={`fw-bold mb-1 ${currentStep >= 4 ? 'text-success' : 'text-muted'}`}>Delivered</h6>
                    <small className="text-muted">Enjoy your meal!</small>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Tracking;
