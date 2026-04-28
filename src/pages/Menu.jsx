import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';
import imgW_181027 from '../../images/WhatsApp Image 2026-03-12 at 18.10.27.jpeg';
import imgW_181121 from '../../images/WhatsApp Image 2026-03-12 at 18.11.21.jpeg';
import imgW_181119 from '../../images/WhatsApp Image 2026-03-12 at 18.11.19.jpeg';
import imgW_181048 from '../../images/WhatsApp Image 2026-03-12 at 18.10.48.jpeg';
import imgW_181028 from '../../images/WhatsApp Image 2026-03-12 at 18.10.28.jpeg';
import chickenShawarmaImg from '../../images/chickenshawarma.jpg';
import beefShawarmaImg from '../../images/PixVerse_Image_Effect_prompt_beef shawarma.jpg';
import catfishImg from '../../images/PixVerse_Image_Effect_prompt_catfish_.jpg';
import fruityZoboImg from '../../images/WhatsApp Image 2026-04-23 at 15.06.12.jpeg';
import goatPepperSoupRiceImg from '../../images/WhatsApp Image 2026-04-23 at 15.06.13.jpeg';
import catfishPepperSoupHeadImg from '../../images/WhatsApp Image 2026-04-23 at 15.06.32.jpeg';
import catfishPepperSoupCenterTailImg from '../../images/WhatsApp Image 2026-04-23 at 15.06.57.jpeg';
import goatMeatPepperSoupImg from '../../images/WhatsApp Image 2026-04-23 at 15.07.13.jpeg';

const menuItems = [
  { id: 1, name: 'Fendo Shawarma Main (Chicken, Beef & Mix)', price: 6000, category: 'Shawarma', image: beefShawarmaImg },
  { id: 2, name: 'Regular Shawarma', price: 4000, category: 'Shawarma', image: chickenShawarmaImg },
  { id: 3, name: 'Suya Shawarma', price: 4500, category: 'Shawarma', image: chickenShawarmaImg },
  { id: 4, name: 'Suya Shawarma (Large)', price: 6500, category: 'Shawarma', image: beefShawarmaImg },

  { id: 5, name: 'Barbecue Fish', price: 7000, priceText: '₦7,000–₦10,000', category: 'Grilled Specials', image: catfishImg },
  { id: 6, name: 'Grill Plantain (Bole) with Fish', price: 8000, priceText: '₦8,000–₦10,000', category: 'Grilled Specials', image: catfishImg },
  { id: 7, name: 'Barbecue Fish + Plantain Combo', price: 12000, priceText: '₦12,000+', category: 'Grilled Specials', image: catfishImg },

  { id: 8, name: 'Goat Meat Pepper Soup with White Rice', price: 5500, priceText: '₦5,500–₦7,000', category: 'Pepper Soup', image: goatPepperSoupRiceImg },
  { id: 9, name: 'Goat Meat Pepper Soup', price: 5500, priceText: '₦5,500–₦7,000', category: 'Pepper Soup', image: goatMeatPepperSoupImg },
  { id: 10, name: 'Pepper Soup', price: 6500, priceText: '₦6,500–₦8,000', category: 'Pepper Soup', image: imgW_181028 },
  { id: 11, name: 'Catfish Pepper Soup (Head)', price: 4000, priceText: '₦4,000 (Head)', category: 'Pepper Soup', image: catfishPepperSoupHeadImg },
  { id: 12, name: 'Catfish Pepper Soup (Center & Tail)', price: 3500, priceText: '₦3,500 (Center & Tail)', category: 'Pepper Soup', image: catfishPepperSoupCenterTailImg },

  {
    id: 13,
    name: 'Fendo Gril-tendo Special Combo (Barbecue Fish + Noodles + Hotdog)',
    price: 9000,
    priceText: '₦9,000–₦11,000',
    category: 'Combos & Sides',
    image: imgW_181027,
  },
  { id: 14, name: 'Chicken & Chips', price: 5500, category: 'Combos & Sides', image: imgW_181119 },
  { id: 15, name: 'Turkey & Chips', price: 6000, category: 'Combos & Sides', image: imgW_181027 },
  { id: 16, name: 'Small Chops (per pack)', price: 3000, category: 'Combos & Sides', image: imgW_181121 },
  { id: 17, name: 'Veggie Noodles', price: 3000, category: 'Combos & Sides', image: imgW_181121 },
  { id: 18, name: 'White Rice (Plain)', price: 2000, category: 'Combos & Sides', image: imgW_181119 },
  { id: 19, name: 'White Rice (with sauce or soup)', price: 3500, category: 'Combos & Sides', image: imgW_181028 },

  { id: 20, name: 'Fendo Fruity Zobo', price: 1000, category: 'Drinks', image: fruityZoboImg },
  { id: 21, name: 'Smoothies', price: 2500, category: 'Drinks', image: imgW_181048 },
  { id: 22, name: 'Soft Drinks', price: 800, category: 'Drinks', image: imgW_181048 },
  { id: 23, name: 'Alcohol (varies)', price: 0, priceText: 'Varies', category: 'Drinks', image: imgW_181048, canAdd: false },
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
                  <span className="h4 mb-0 fw-bold text-fendo-red">{item.priceText ?? `₦${item.price.toLocaleString()}`}</span>
                  <Button
                    variant="danger"
                    onClick={() => addToCart(item)}
                    className="d-flex align-items-center gap-2"
                    disabled={item.canAdd === false}
                  >
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
