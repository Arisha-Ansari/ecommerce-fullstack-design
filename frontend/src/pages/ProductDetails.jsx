import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/api";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (id) {
      getProductById(id).then(data => {
        setProduct(data);
        setLoading(false);
      });
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product && !added) {
      addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  const thumbnails = [
    product.image,
    "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=80&h=80&fit=crop",
  ];

  const mainImages = [
    product.image,
    "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop",
  ];

  const relatedProducts = [
    { name: "Related Product 1", price: "$32.00–$40.00", img: "https://images.unsplash.com/photo-1544866092-1935c5ef2a8f?w=120&h=120&fit=crop" },
    { name: "Related Product 2", price: "$32.00–$40.00", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=120&fit=crop" },
    { name: "Related Product 3", price: "$32.00–$40.00", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop" },
    { name: "Related Product 4", price: "$32.00–$40.00", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop" },
  ];

  const youMayLike = [
    { name: "Similar Item 1", price: "$7.00 – $69.50", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=70&h=70&fit=crop" },
    { name: "Similar Item 2", price: "$7.00 – $20.50", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=70&h=70&fit=crop" },
    { name: "Similar Item 3", price: "$7.00 – $89.50", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=70&h=70&fit=crop" },
  ];

  return (
    <div className="font-sans text-sm text-gray-700 bg-white">

      {/* Breadcrumb */}
      <div className="bg-gray-50 px-4 sm:px-10 py-2 text-xs text-gray-400 border-b border-gray-100">
        <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/')}>Home</span>
        <span className="mx-1">&gt;</span>
        <span className="text-blue-600 cursor-pointer">{product.category}</span>
        <span className="mx-1">&gt;</span>
        <span className="text-blue-600 cursor-pointer">Products</span>
        <span className="mx-1">&gt;</span>
        <span>{product.name}</span>
      </div>

      {/* Main Product Section */}
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col lg:flex-row gap-6">

        {/* Left: Images */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="border border-gray-100 rounded-lg overflow-hidden mb-3 h-72 flex items-center justify-center bg-gray-50">
            <img src={mainImages[selectedImage]} alt="Product" className="w-full h-full object-contain" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {thumbnails.map((thumb, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-14 h-14 rounded-md overflow-hidden cursor-pointer flex-shrink-0 border-2 transition-all ${
                  i === selectedImage ? "border-blue-500" : "border-gray-200"
                }`}
              >
                <img src={thumb} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Middle: Product Info */}
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-2">
            <span className="text-green-500 text-xs">✔</span>
            <span className="text-green-500 text-xs font-medium">
              {product.stock > 0 ? "In stock" : "Out of stock"}
            </span>
          </div>

          <h1 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 leading-snug">
            {product.name}
          </h1>

          <div className="flex flex-wrap items-center gap-2 mb-4 text-xs text-gray-400">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <span key={i} className={i <= 4 ? "text-yellow-400" : "text-gray-200"}>★</span>
              ))}
            </div>
            <span>4.0</span>
            <span className="text-blue-500 cursor-pointer">32 reviews</span>
            <span>|</span>
            <span>154 sold</span>
          </div>

          <div className="flex border border-gray-100 rounded-lg overflow-hidden mb-4">
            {[
              { qty: "1–10 pcs", price: `Rs. ${product.price}`, active: true },
              { qty: "10–50 pcs", price: `Rs. ${Math.round(product.price * 0.9)}`, active: false },
              { qty: "50+ pcs", price: `Rs. ${Math.round(product.price * 0.8)}`, active: false },
            ].map((tier, i) => (
              <div
                key={i}
                className={`flex-1 py-2 px-3 text-center ${tier.active ? "bg-yellow-50" : "bg-white"} ${i > 0 ? "border-l border-gray-100" : ""}`}
              >
                <div className={`text-sm font-bold ${tier.active ? "text-orange-600" : "text-gray-700"}`}>{tier.price}</div>
                <div className="text-xs text-gray-400 mt-0.5">{tier.qty}</div>
              </div>
            ))}
          </div>

          <table className="w-full text-xs mb-4">
            <tbody>
              {[
                ["Price", `Rs. ${product.price}`],
                ["Category", product.category],
                ["Description", product.description],
                ["Stock Available", `${product.stock} pcs`],
                ["Customization", "Customized logos and design custom packages"],
                ["Protection", "Refund Policy"],
                ["Warranty", "1 year warranty"],
              ].map(([label, value], i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-1.5 text-gray-400 w-32 align-top">{label}</td>
                  <td className="py-1.5 text-gray-600">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mb-4 flex items-center gap-4">
            <label className="text-xs font-medium">Quantity:</label>
            <div className="flex items-center border border-gray-200 rounded">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                −
              </button>
              <input 
                type="number" 
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                max={product.stock}
                className="w-12 text-center border-l border-r border-gray-200 py-1 outline-none"
              />
              <button 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button — turns green on click */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 text-white rounded-lg font-semibold mb-2 transition-all duration-300 disabled:bg-gray-400 flex items-center justify-center gap-2 ${
              added ? "bg-green-500 hover:bg-green-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {added ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Added!
              </>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>

        {/* Right: Seller Card */}
        <div className="w-full lg:w-52 flex-shrink-0 flex flex-row lg:flex-col gap-4">

          <div className="border border-gray-100 rounded-lg p-4 flex-1 lg:flex-none">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">E</div>
              <div>
                <div className="font-semibold text-xs">Supplier</div>
                <div className="text-xs text-gray-500">E-commerce Store</div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">🇵🇰 Pakistan, Karachi</div>
            <div className="text-xs text-green-500 mb-1 flex items-center gap-1">✔ Verified Seller</div>
            <div className="text-xs text-gray-500 mb-4 flex items-center gap-1">🚚 Worldwide Shipping</div>

            <button className="w-full py-2 bg-blue-600 text-white rounded-md text-xs font-semibold mb-2 hover:bg-blue-700 transition-all">
              Send inquiry
            </button>
            <button className="w-full py-2 bg-white text-blue-600 border border-blue-600 rounded-md text-xs font-semibold mb-2 hover:bg-blue-50 transition-all">
              Seller's profile
            </button>
            <button className="w-full py-2 bg-white text-red-400 border border-gray-100 rounded-md text-xs flex items-center justify-center gap-1 hover:bg-red-50 transition-all">
              ♡ Save for later
            </button>
          </div>

          <div className="border border-gray-100 rounded-lg p-3 flex-1 lg:flex-none">
            <div className="font-semibold text-xs mb-3 text-gray-700">You may like</div>
            {youMayLike.map((item, i) => (
              <div key={i} className="flex gap-2 mb-3 cursor-pointer">
                <img src={item.img} alt="" className="w-12 h-12 object-cover rounded-md border border-gray-100 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-600 leading-snug mb-0.5 line-clamp-2">{item.name}</div>
                  <div className="text-xs text-orange-600 font-semibold">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="border-b-2 border-gray-100 flex overflow-x-auto">
          {["description", "reviews", "shipping", "about seller"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 -mb-0.5 capitalize transition-all ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600 font-semibold"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="py-5">
          <p className="text-xs text-gray-500 leading-relaxed mb-3">
            {product.description}
          </p>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            High-quality product with excellent durability and performance. Perfect for your needs. Available in various specifications to meet different requirements.
          </p>

          <table className="w-full text-xs mb-4 border border-gray-100 rounded-lg overflow-hidden">
            <tbody>
              {[
                ["Category", product.category],
                ["Price", `Rs. ${product.price}`],
                ["Stock", `${product.stock} pcs`],
                ["Size", "Standard"],
                ["Material", "Premium quality"],
              ].map(([label, value], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="py-2 px-3 text-gray-400 w-32 border-b border-gray-100">{label}</td>
                  <td className="py-2 px-3 text-gray-600 border-b border-gray-100">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {[
            "High quality product",
            "Durable and long-lasting",
            "Great value for money",
            "Fast and reliable shipping",
          ].map((feat, i) => (
            <div key={i} className="flex items-start gap-2 mb-1.5">
              <span className="text-green-500 font-bold mt-0.5 text-xs">✔</span>
              <span className="text-xs text-gray-500">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Related products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {relatedProducts.map((product, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <img src={product.img} alt={product.name} className="w-full h-28 object-cover" />
              <div className="p-2">
                <div className="text-xs text-gray-600 mb-1 leading-snug line-clamp-2">{product.name}</div>
                <div className="text-xs text-orange-600 font-semibold">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 px-6 sm:px-16 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-white font-bold text-lg sm:text-xl mb-1">Special discount on bulk orders</div>
          <div className="text-blue-100 text-xs">Get 10-20% off on orders above Rs. 5000</div>
        </div>
        <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold text-sm px-7 py-3 rounded-lg transition-all whitespace-nowrap">
          Shop now
        </button>
      </div>

    </div>
  );
};

export default ProductDetails;