import Product from "./Product/Product";
import "./Products.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { memo } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { store } = useGlobalContext();
  const navigate = useNavigate();

  const featuredProducts = store.state.products
    .filter((product) => product.isFeatured)
    .sort((a, b) => a.name.localeCompare(b.name));

  const topThree = featuredProducts.slice(0, 3);

  const handleViewMore = () => {
    navigate("/products/view-all", { state: { products: featuredProducts, title : "Latest Deals" }, type : "Featured"});
  };

  return (
    <div className="sub-container" id="products">
      <h2>Latest Deals</h2>
      {featuredProducts.length > 0 ? (
        <>
          <div className="contains-product">
            {topThree.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          {featuredProducts.length > 3 && (
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <button className="btn-rounded" onClick={handleViewMore}>
                View More
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="skeleton">
          <Skeleton height={250} />
        </div>
      )}
    </div>
  );
};

export default memo(Products);
