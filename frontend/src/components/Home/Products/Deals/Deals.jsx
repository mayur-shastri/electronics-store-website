import Product from "../Product/Product";
import "./Deals.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import Skeleton from "react-loading-skeleton";

const Deals = () => {
  const { store } = useGlobalContext();

  const dealProducts = store.state.products.filter((product) => {
    return product.isDeal;
  });

  return (
    <div className="sub-container" id="deals">
      <h2>Deals Just For You!</h2>
      {store.state.products.length > 0 ? (
        <div className="contains-product">
          {dealProducts.map((product) => (
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

export default Deals;
