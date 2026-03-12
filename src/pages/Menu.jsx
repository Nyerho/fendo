import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';
import chickenShawarmaImg from '../../images/chickenshawarma.jpg';
import grilledChickenImg from '../../images/grilledchicken.jpg';
import grilledSausagesImg from '../../images/grilled sausages.jpg';
import beefShawarmaImg from '../../images/PixVerse_Image_Effect_prompt_beef shawarma.jpg';
import catfishImg from '../../images/PixVerse_Image_Effect_prompt_catfish_.jpg';
import chickenWingsImg from '../../images/PixVerse_Image_Effect_prompt_chicken wings_.jpg';
import gizzardSticksImg from '../../images/PixVerse_Image_Effect_prompt_gizzard sticks .jpg';
import turkeyWingsImg from '../../images/PixVerse_Image_Effect_prompt_grillled turkey w.jpg';

const menuItems = [
  { id: 1, name: 'Chicken Shawarma', price: 1500, category: 'Shawarma', image: chickenShawarmaImg },
  { id: 2, name: 'Beef Shawarma', price: 1700, category: 'Shawarma', image: beefShawarmaImg },
  { id: 3, name: 'Grilled Chicken', price: 3500, category: 'Grills', image: grilledChickenImg },
  { id: 4, name: 'Grilled Sausage', price: 1000, category: 'Grills', image: grilledSausagesImg },
  { id: 5, name: 'Gizzard Sticks', price: 1200, category: 'Grills', image: gizzardSticksImg },
  { id: 6, name: 'Catfish', price: 4000, category: 'Grills', image: catfishImg },
  { id: 7, name: 'Turkey Wings', price: 2500, category: 'Grills', image: turkeyWingsImg },
  { id: 8, name: 'Chicken Wings', price: 2000, category: 'Grills', image: chickenWingsImg },
  { id: 9, name: 'Full Turkey', price: 25000, category: 'Grills', image: 'https://placehold.co/600x400/D32F2F/FFD700?text=Full+Turkey' },
  { id: 10, name: 'Full Chicken', price: 8000, category: 'Grills', image: 'https://placehold.co/600x400/D32F2F/FFD700?text=Full+Chicken' },
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
