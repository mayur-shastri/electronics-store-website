import Product from "./Product/Product";

import "./Products.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { memo } from "react";
import Skeleton from "react-loading-skeleton";

const Products = () => {
  const { store } = useGlobalContext();

  const featuredProducts = store.state.products
    .filter((product) => product.isFeatured)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="sub-container" id="products">
      <h2>Latest Deals</h2>
      {featuredProducts.length > 0 ? (
        <div className="contains-product">
          {featuredProducts.map((product) => (
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

export default memo(Products);