import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Newsletter from "./components/Newsletter";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing"; 

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        {/* baaki routes Product Listing/Details/Cart bante hi yahan add karenge */}
      </Routes>
      <Newsletter />
      <Footer />
    </BrowserRouter>
  );
}

export default App;