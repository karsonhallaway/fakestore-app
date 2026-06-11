import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { createProduct } from '../services/productService';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AddProduct()  {

    const [product, setProduct] = useState({
        title: '',
        price: '', 
        desc: '',
        cat: '',
    });

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [validated, setValidated] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            setLoading(false);
            return;
            
        } else {

            try {
                const data = {...product, price: parseFloat(product.price) };
                await createProduct(data);
                setSubmitted(true);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
                setSubmitted(false);
            }
        }
        setValidated(true);
    }

    
    return (
        
        <Container> 
            {submitted && <Alert variant="success" dismissible>{product.title} was created!</Alert>}
            {error && <Alert variant="danger" dismissible>{error}</Alert>}

            <Form onSubmit={handleSubmit} noValidate validated={validated}>
                <h1>Add Product</h1>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Product Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g. Men's Cotten Jacket"
                                name="title"
                                value={product.title}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Product must have a title
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="0.00"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Product must have price
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Describe your product..."
                                    name="desc"
                                    value={product.desc}
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Product must have a description
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                name="cat"
                                value={product.cat}
                                onChange={handleChange}
                                required
                            >
                                <option hidden value="">Choose Category</option>
                                <option>Men's Clothing</option>
                                <option>Women's Clothing</option>
                                <option>Jewelry</option>
                                <option>Electronics</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Please select category
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <LoadingSpinner /> : 'Add Product'}
                </Button>
                <Button variant="outline-danger" as={NavLink} to='/product-listing'>Cancel</Button>
            </Form>
        </Container>
    );

}