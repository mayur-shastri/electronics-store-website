import "./Product.css";
import headphones_pink from "@/assets/images/airpods_max_pink.jpg";
import { FaStar } from "react-icons/fa";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  let { store } = useGlobalContext();
  let navigate = useNavigate();
  let stars = [];
  
  for (let i = 0; i < product?.rating; i++) {
    stars.push(<FaStar key={i} />);
  }

  const isInCart = product?.addedToCart;

  const handleViewDetails = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div className="product-container">
      <div className="image">
        <img
          src={product?.product_image || headphones_pink}
          alt="Product Image"
          width={"100%"}
        />
      </div>
      <div className="product-details">
        <div className="name-price-product">
          <h4>{product?.name}</h4>
          <h5>
            $<span className="actual-product-price">{product?.price}.00</span>
          </h5>
        </div>
        <p className="product-description">{product?.description}</p>
        <div className="star-rating">
          <div className="stars">{stars}</div>
          <span>({parseInt(Math.random() * 100)} Reviews)</span>
        </div>
        <div className="product-actions">
          <button 
            className="view-details"
            onClick={handleViewDetails}
          >
            View Details
          </button>
          {isInCart == false ? (
            <button
              className="add-to-cart"
              onClick={() => {
                if (store.state.cartQuantity > 10) {
                  toast.warning("You can only add 10 items to cart");
                  return;
                }
                store.addToCart(product?._id);
              }}
            >
              Add to Cart
            </button>
          ) : (
            <button
              className="add-to-cart"
              onClick={() => {
                store.removeFromCart(product?._id);
              }}
            >
              Remove from cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;