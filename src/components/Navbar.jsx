import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function NavBar() {
    return (
        <Navbar bg="info" variant="dark" expand="lg" className="p-3 mb-4" >
            <Navbar.Brand as={NavLink} to='/'>FakeStore</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link as={NavLink} to='/' end>Home</Nav.Link>
                    <Nav.Link as={NavLink} to='/product-listing'>Products</Nav.Link>
                    <Nav.Link as={NavLink} to='/add-product'>Add Product</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

