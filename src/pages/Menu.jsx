import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';
import imgW_181027 from '../../images/WhatsApp Image 2026-03-12 at 18.10.27.jpeg';
import imgW_181123 from '../../images/WhatsApp Image 2026-03-12 at 18.11.23.jpeg';
import imgW_181121 from '../../images/WhatsApp Image 2026-03-12 at 18.11.21.jpeg';
import imgW_181120 from '../../images/WhatsApp Image 2026-03-12 at 18.11.20.jpeg';
import imgW_181119 from '../../images/WhatsApp Image 2026-03-12 at 18.11.19.jpeg';
import imgW_181048 from '../../images/WhatsApp Image 2026-03-12 at 18.10.48.jpeg';
import imgW_181028 from '../../images/WhatsApp Image 2026-03-12 at 18.10.28.jpeg';
import chickenShawarmaImg from '../../images/chickenshawarma.jpg';
import beefShawarmaImg from '../../images/PixVerse_Image_Effect_prompt_beef shawarma.jpg';

const menuItems = [
  // Ordered mapping from the first image to the last, with correct names
  { id: 1, name: 'Grilled Turkey', price: 2500, category: 'Grills', image: imgW_181027 },
  { id: 2, name: 'CatFish Peppersoup', price: 4000, category: 'Soups', image: imgW_181123 },
  { id: 3, name: 'Peppered Sauce with Kpomo, Goatmeat, etc', price: 1500, category: 'Sauce', image: imgW_181121 },
  { id: 4, name: 'Cowleg/Goatmeat Peppersoup', price: 3500, category: 'Soups', image: imgW_181028 },
  { id: 5, name: 'Chicken and Chips', price: 3000, category: 'Combos', image: imgW_181119 },
  { id: 6, name: 'Zobo', price: 500, category: 'Drinks', image: imgW_181048 },
  { id: 7, name: 'Grilled Chicken', price: 3500, category: 'Grills', image: imgW_181120 },
  { id: 8, name: 'Chicken Shawarma', price: 1500, category: 'Shawarma', image: chickenShawarmaImg },
  { id: 9, name: 'Beef Shawarma', price: 1700, category: 'Shawarma', image: beefShawarmaImg },
];

function Menu() {
  const { addToCart } = useCart();

  return (
    <Container className="mt-5 mb-5">
      <h2 className="mb-4 text-center fw-bold display-5 text-fendo-red">Our Menu</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {menuItems.map((item) => (
          <Col key={item.id}>
            <Card className="h-100 shadow-sm border-0 overflow-hidden">
              <Card.Img variant="top" src={item.image} alt={item.name} className="card-img-top" />
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Card.Title className="fw-bold">{item.name}</Card.Title>
                  <span className="badge bg-fendo-yellow text-dark">{item.category}</span>
                </div>
                <Card.Text className="text-muted flex-grow-1">
                  Delicious {item.name} prepared with fresh ingredients and our secret spices.
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <span className="h4 mb-0 fw-bold text-fendo-red">₦{item.price.toLocaleString()}</span>
                  <Button variant="danger" onClick={() => addToCart(item)} className="d-flex align-items-center gap-2">
                    <Plus size={18} /> Add
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Menu;
