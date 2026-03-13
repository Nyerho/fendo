import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Utensils, Flame, Truck, ArrowRight, Star, Timer, MapPin } from 'lucide-react';
import heroVideo from '../../images/fendo.mp4';
import frontStoreImg from '../../images/fendo frontstore.jpeg';
import fendoMainLogo from '../../images/fendo mainlogo.jpeg';
import chickenShawarmaImg from '../../images/chickenshawarma.jpg';
import beefShawarmaImg from '../../images/PixVerse_Image_Effect_prompt_beef shawarma.jpg';
import catfishImg from '../../images/PixVerse_Image_Effect_prompt_catfish_.jpg';
import chickenWingsImg from '../../images/PixVerse_Image_Effect_prompt_chicken wings_.jpg';
import gizzardSticksImg from '../../images/PixVerse_Image_Effect_prompt_gizzard sticks .jpg';
import turkeyWingsImg from '../../images/PixVerse_Image_Effect_prompt_grillled turkey w.jpg';

function Home() {
  return (
    <>
      <div className="hero-section">
        <video className="hero-video" autoPlay muted loop playsInline preload="auto">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <Container className="py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="hero-pill mb-3">
                <img src={fendoMainLogo} alt="Fendo" className="hero-brand-logo" />
                Freshly grilled. Fast delivery. Every day.
              </div>
              <h1 className="display-4 fw-bold text-white mb-3">
                Fendo <span className="text-fendo-yellow">Shawarma</span> & Grills
              </h1>
              <p className="lead text-white opacity-75 mb-4">
                Smoky grills, loaded shawarma, and doorstep delivery — made fresh when you order.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <Button variant="warning" as={Link} to="/menu" size="lg" className="fw-bold px-4 py-3 rounded-pill">
                  Order Now <ArrowRight size={20} className="ms-2" />
                </Button>
                <Button variant="outline-light" as={Link} to="/tracking" size="lg" className="fw-bold px-4 py-3 rounded-pill">
                  Track Order
                </Button>
              </div>

              <div className="d-flex flex-wrap gap-3 mt-4">
                <div className="hero-stat">
                  <Timer size={18} />
                  <span>15–25 mins</span>
                </div>
                <div className="hero-stat">
                  <Star size={18} />
                  <span>Top rated</span>
                </div>
                <div className="hero-stat">
                  <MapPin size={18} />
                  <span>Near you</span>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-media shadow-lg">
                <img
                  src={frontStoreImg}
                  alt="Fendo Front Store"
                  className="hero-image"
                />
                <div className="hero-media-overlay">
                  <div className="hero-media-card">
                    <div className="d-flex justify-content-between align-items-start gap-3">
                      <div>
                        <div className="fw-semibold">Today’s best picks</div>
                        <div className="text-white opacity-75 small">Chicken Shawarma • Grilled Wings • Catfish</div>
                      </div>
                      <span className="badge bg-fendo-yellow text-dark fw-semibold">Hot</span>
                    </div>
                    <div className="d-flex gap-2 mt-3 flex-wrap">
                      <span className="badge bg-dark border border-secondary fw-normal">Made fresh</span>
                      <span className="badge bg-dark border border-secondary fw-normal">Quality spices</span>
                      <span className="badge bg-dark border border-secondary fw-normal">Fast dispatch</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="pb-2 pb-lg-4">
        <div className="home-gallery">
          <div className="row g-3">
            <div className="col-6 col-md-4 col-lg-2">
              <div className="home-gallery-tile">
                <img src={chickenShawarmaImg} alt="Chicken Shawarma" className="home-gallery-img" />
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="home-gallery-tile">
                <img src={beefShawarmaImg} alt="Beef Shawarma" className="home-gallery-img" />
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="home-gallery-tile">
                <img src={catfishImg} alt="Catfish" className="home-gallery-img" />
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="home-gallery-tile">
                <img src={chickenWingsImg} alt="Chicken Wings" className="home-gallery-img" />
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="home-gallery-tile">
                <img src={gizzardSticksImg} alt="Gizzard Sticks" className="home-gallery-img" />
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="home-gallery-tile">
                <img src={turkeyWingsImg} alt="Turkey Wings" className="home-gallery-img" />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container className="py-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold section-title mb-2">Made for cravings</h2>
          <p className="text-muted mb-0">Order, pay, and track in a few taps.</p>
        </div>

        <div className="row g-4 row-cols-1 row-cols-lg-3">
          <div className="col">
            <Link to="/menu" className="text-decoration-none">
              <div className="feature-card h-100 shadow-sm text-center p-4">
                <div className="feature-icon text-fendo-red mb-3 mx-auto">
                  <Utensils size={48} />
                </div>
                <h3 className="fw-bold">Delicious Shawarma</h3>
                <p className="text-muted">Try our signature shawarma with various fillings. Crafted with love and the finest ingredients.</p>
              </div>
            </Link>
          </div>
          <div className="col">
            <Link to="/menu" className="text-decoration-none">
              <div className="feature-card h-100 shadow-sm text-center p-4">
                <div className="feature-icon text-fendo-red mb-3 mx-auto">
                  <Flame size={48} />
                </div>
                <h3 className="fw-bold">Grilled Specials</h3>
                <p className="text-muted">Chicken, Turkey, Catfish and more. Perfectly grilled to satisfy your cravings.</p>
              </div>
            </Link>
          </div>
          <div className="col">
            <Link to="/tracking" className="text-decoration-none">
              <div className="feature-card h-100 shadow-sm text-center p-4">
                <div className="feature-icon text-fendo-red mb-3 mx-auto">
                  <Truck size={48} />
                </div>
                <h3 className="fw-bold">Fast Delivery</h3>
                <p className="text-muted">Hungry? We deliver fast! Track your order in real-time from our kitchen to your doorstep.</p>
              </div>
            </Link>
          </div>
        </div>
      </Container>

      <div className="bg-white">
        <Container className="py-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
            <div>
              <h2 className="fw-bold section-title mb-2">Popular picks</h2>
              <p className="text-muted mb-0">Fan favorites you can’t go wrong with.</p>
            </div>
            <Button as={Link} to="/menu" variant="fendo" className="px-4">
              View full menu
            </Button>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100 overflow-hidden modern-card">
                <img
                  src={chickenShawarmaImg}
                  alt="Chicken Shawarma"
                  className="modern-card-img"
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">Chicken Shawarma</div>
                    <span className="badge bg-fendo-yellow text-dark">Shawarma</span>
                  </div>
                  <div className="text-muted mt-2">Loaded, creamy, and spicy — built for the perfect bite.</div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100 overflow-hidden modern-card">
                <img
                  src={chickenWingsImg}
                  alt="Chicken Wings"
                  className="modern-card-img"
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">Chicken Wings</div>
                    <span className="badge bg-fendo-yellow text-dark">Grills</span>
                  </div>
                  <div className="text-muted mt-2">Smoky, juicy wings with a bold, peppery finish.</div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100 overflow-hidden modern-card">
                <img
                  src={catfishImg}
                  alt="Catfish"
                  className="modern-card-img"
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">Catfish</div>
                    <span className="badge bg-fendo-yellow text-dark">Grills</span>
                  </div>
                  <div className="text-muted mt-2">Char-grilled catfish with signature spices and heat.</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-5">
        <div className="landing-cta">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-2 text-white">Ready to eat?</h2>
              <p className="mb-0 text-white opacity-75">Place your order now and we’ll get it grilling.</p>
            </div>
            <div className="col-lg-4 d-flex justify-content-lg-end">
              <Button as={Link} to="/menu" variant="warning" size="lg" className="fw-bold px-4 rounded-pill">
                Start ordering
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Home;
