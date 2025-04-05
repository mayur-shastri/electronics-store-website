import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar, FaChevronLeft } from "react-icons/fa";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ProductDetailsView.css";

const ProductDetailsView = () => {
  const { id } = useParams();
  const { store } = useGlobalContext();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Fetch product details from your API
    const fetchProduct = async () => {
      try {
        // Replace with your actual API call
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="not-found">Product not found</div>;
  }

  const isInCart = store.state.cart.some(item => item._id === product._id);

  return (
    <div className="product-details-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaChevronLeft /> Back to Products
      </button>
      
      <div className="product-details-container">
        <div className="product-images">
          <div className="main-image">
            <img 
              src={product.images?.[selectedImage] || product.product_image} 
              alt={product.name} 
            />
          </div>
          <div className="thumbnail-container">
            {product.images?.map((img, index) => (
              <div 
                key={index} 
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.name} thumbnail ${index}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          
          <div className="price-rating">
            <span className="price">${product.price}.00</span>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={i < product.rating ? 'filled' : 'empty'} 
                />
              ))}
              <span>({product.reviewCount || 0} reviews)</span>
            </div>
          </div>

          <p className="description">{product.description}</p>

          <div className="product-specs">
            <h3>Specifications</h3>
            <ul>
              {product.specifications?.map((spec, i) => (
                <li key={i}>
                  <strong>{spec.key}:</strong> {spec.value}
                </li>
              ))}
            </ul>
          </div>

          <div className="action-buttons">
            {isInCart ? (
              <button 
                className="remove-from-cart"
                onClick={() => store.removeFromCart(product._id)}
              >
                Remove from Cart
              </button>
            ) : (
              <button 
                className="add-to-cart"
                onClick={() => {
                  if (store.state.cartQuantity > 10) {
                    toast.warning("You can only add 10 items to cart");
                    return;
                  }
                  store.addToCart(product._id);
                }}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsView;