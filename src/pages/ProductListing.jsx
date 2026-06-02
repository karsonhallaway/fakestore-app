import { useState, useEffect } from 'react';
import { getProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

export default function ProductListing() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(error.message)
            }
        };
        fetchProducts();
    }, [])

    if (loading) return( <LoadingSpinner /> );
    if (error) return( <ErrorMessage message={error} /> );

    return(
        <Container>
            <h3>Products</h3>
            <Row>
                {products.map((product) => (
                    <Col key={product.id} sm={6} lg={3}>
                        <ProductCard
                            id={product.id}
                            title={product.title}
                            image={product.image}
                            description={product.description}
                            price={product.price}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
