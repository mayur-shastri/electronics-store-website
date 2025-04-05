import Product from "../components/Home/Products/Product/Product";
import "./ProductsView.css";
import { useLocation } from "react-router-dom";

const ProductsView = () => {
  const location = useLocation();
  const { title, products } = location.state || { title: "Products", products: [], type: "" };

  console.log(location.state);

  return (
    <div className="sub-container">
      <h2>{title}</h2>
      {products.length > 0 ? (
        <div className="contains-product">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductsView;
