import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';


export default function ProductCard({ id, title, description, price, image }) {
    return (
        <Card style={{width: '18rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text>${price}</Card.Text>
                <Button as={NavLink} to={`/product-details/${id}`} variant="primary">
                    View Product
                </Button> 
            </Card.Body>
        </Card>
    );
}