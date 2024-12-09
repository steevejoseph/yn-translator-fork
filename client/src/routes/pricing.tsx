// import { Link } from "react-router-dom";

const PricingPage = () => {
  return (
    <div className="" style={{ paddingTop: "80px" }}>
      <form action="/api/create-checkout-session" method="POST">
        <button type="submit">Checkout</button>
      </form>
    </div>
  );
};
export default PricingPage;
