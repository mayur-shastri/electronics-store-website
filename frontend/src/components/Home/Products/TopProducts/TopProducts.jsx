import Product from "../Product/Product";

import "./TopProducts.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import Skeleton from "react-loading-skeleton";

const TopProducts = () => {
  const { store } = useGlobalContext();

  // Filter products marked as top, and sort by times_bought descending
  const topProducts = store.state.products
    .filter((product) => product.isTopProduct)
    .sort((a, b) => b.times_bought - a.times_bought);

  return (
    <div className="sub-container">
      <h2>Top Sellers!</h2>
      {store.state.products.length > 0 ? (
        <div className="contains-product">
          {topProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="skeleton">
          <Skeleton height={250} />
        </div>
      )}
    </div>
  );
};

export default TopProducts;