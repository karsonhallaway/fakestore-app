import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { NavLink } from 'react-router-dom';

export default function Home() {
    return (
        <Container>
            <Row>
                <Col className="home-hero-content">
                    <h1>Welcome to FakeStore!</h1>
                    <h2>A simple E-Commerce project</h2>
                    <p>Browse product listing or add your own product.</p>
                    <Button className="me-2" variant="primary" as={NavLink} to="/product-listing">View Products</Button>
                    <Button variant="outline-secondary" as={NavLink} to="/add-product">Add Product</Button>
                </Col>
            </Row>
            <Row className="text-center">
                {[
                    { icon: '🛍️', title: 'Add Products', desc: 'Add products using POST'},
                    { icon: '⚡️', title: 'Update Listings', desc: 'Update your listing using PUT'},
                    { icon: '✅', title: 'View Products', desc: 'View your product in a database' }, 
                    { icon: '❌', title: 'Delete Products', desc: 'Delete your product using DELETE'},
                ].map((f, i) => (
                    <Col key={i} sm={6} lg={3}>
                        <h3>{f.icon}</h3>
                        <h4>{f.title}</h4>
                        <p>{f.desc}</p>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}