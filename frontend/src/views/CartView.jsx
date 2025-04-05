import Order from "../components/Cart/Order";

const CartView = () => {
  return (
    <div>
      <main
        style={{
          padding: "1rem",
          paddingInline: "1rem",
        }}
      >
        <Order />
      </main>
    </div>
  );
};

export default CartView;