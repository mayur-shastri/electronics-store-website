import Product from "../Product/Product";
import "./Deals.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

const Deals = () => {
  const { store } = useGlobalContext();
  const navigate = useNavigate();

  const dealProducts = store.state.products.filter((product) => product.isDeal);
  const topThreeDeals = dealProducts.slice(0, 3);

  const handleViewMore = () => {
    navigate("/products/view-all", {
      state: {
        title: "Deals Just For You!",
        products: dealProducts,
      },
      type: "Deals"
    });
  };

  return (
    <div className="sub-container" id="deals">
      <h2>Deals Just For You!</h2>
      {store.state.products.length > 0 ? (
        <>
          <div className="contains-product">
            {topThreeDeals.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          {dealProducts.length > 3 && (
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <button onClick={handleViewMore} className="view-more-btn">
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

export default Deals;