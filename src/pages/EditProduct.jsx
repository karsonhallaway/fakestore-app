import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { updateProduct, getProductById } from '../services/productService';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import LoadingSpinner from '../components/LoadingSpinner';

export default function EditProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState({
        title: '',
        price: '', 
        description: '',
        category: '',
    });
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);

     const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct, 
            [name]: value,
        }));
    }

    useEffect(() => {
        const fetchProduct = async() => {
            try {
                const data = await getProductById(id);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
                setSubmitted(false);
            } 
        }
        fetchProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = {...product, price: parseFloat(product.price) };
            await updateProduct(id, data);
            setLoading(false);
            setSubmitted(true);
            setTimeout(() => {useNavigate(`/product-details/${id}`)}, 2000);
        } catch (error) {
            setError(error.message);
            setLoading(false);
            setSubmitted(false);
        }
    }

    if (loading) return <LoadingSpinner />;
    if (error) return <Alert variant='danger'>{error}</Alert>;
    {submitted && <Alert variant='success'>
        Product updated successfully!
        Now redirecting...</Alert>}

    return (
        <Container>
            <h3>Edit Product</h3>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={product.title}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a product title.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a product price.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row> 
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a product description.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Category</Form.Label>
                            <Form.Select
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="electronics">Electronics</option>
                                <option value="jewelery">Jewelery</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Please select a product category.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit" disabled={loading}>
                    Update Product
                </Button>
                <Button variant="outline-secondary" as={NavLink} to={`/product-details/${id}`} className="ms-2">
                    Cancel
                </Button>

            </Form>
        </Container>
    )
}