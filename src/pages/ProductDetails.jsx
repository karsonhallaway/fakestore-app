import { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { getProductById, deleteProduct } from '../services/productService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ProductDetails() {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleDelete = async () => {
        try {
            await deleteProduct(id);
            handleCloseModal();
            navigate('/product-listing');
        } catch (error) {
            setError(error.message);
            handleCloseModal();
            setLoading(false);
        }
    };
    
    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
                setLoading(false);

            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        getProductDetails();


    }, [id]);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <Container>
            <Breadcrumb>
                <Breadcrumb.Item linkAs={NavLink} linkProps={{ to: '/product-listing' }}>
                    Products
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{product?.title}</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col md={5}>
                    <img src={product?.image} alt={product?.title} className="img-fluid" />
                </Col>
                <Col md={7}>
                    <h2>{product?.title}</h2>
                    <p>{product?.description}</p>
                    <p><strong>Price:</strong> ${product?.price.toFixed(2)}</p>

                    <Button variant="outline-danger" onClick={handleShowModal}>
                        Delete Product
                    </Button>
                    
                    <Button variant="outline-secondary" as={NavLink} to={`/edit-product/${id}`} className="ms-2">
                        Edit Product
                    </Button>

                    <Button variant="secondary" as={NavLink} to={`/product-listing`} className="ms-2">
                        Back
                    </Button>

                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to delete {product?.title}?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant ="danger" onClick={handleDelete}>
                                Confirm Delete
                            </Button>
                            <Button variant ="outline-secondary" onClick={handleCloseModal}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
}