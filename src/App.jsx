import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
// import ProductListing from './pages/ProductListing';
// import ProductDetails from './pages/ProductDetails';
// import AddProduct from './pages/AddProduct';
// import EditProduct from './pages/EditProduct';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-listing" element={<ProductListing />} />
        {/* <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} /> */}
      </Routes>

    </>
  );
}

export default App;