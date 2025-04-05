import { useNavigate } from "react-router-dom";
import Product from "../Product/Product";
import "./TopProducts.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import Skeleton from "react-loading-skeleton";

const TopProducts = () => {
  const { store } = useGlobalContext();
  const navigate = useNavigate();

  // Filter top products
  const topProducts = store.state.products
    .filter((product) => product.isTopProduct)
    .sort((a, b) => b.times_bought - a.times_bought);

  // Top 3 products only
  const topThree = topProducts.slice(0, 3);

  const handleViewMore = () => {
    navigate("/products/view-all", { state: { title: "Top Sellers", products: topProducts }, type : "Top" });
  };

  return (
    <div className="sub-container">
      <h2>Top Sellers!</h2>
      {store.state.products.length > 0 ? (
        <>
          <div className="contains-product">
            {topThree.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          {topProducts.length > 3 && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
              <button onClick={handleViewMore} className="btn-rounded">
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

export default TopProducts;