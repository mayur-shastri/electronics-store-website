import Logo from "../NavBar/Logo/Logo";
import "./ShopFooter.css";
import { Link } from "react-router-dom";


const ShopFooter = () => {
  const newYear = new Date().getFullYear();

  const bottomMargin = {
    marginBottom : "1em"
  }

  return (
    <div className="sub-container">
      <div className="useful-links">
        <Logo/>
        <div style={bottomMargin}></div>
        <ul className="useful-details">
          <li style={bottomMargin}>Contact : 020-3423-432</li>
          <li>Vaishnavi Summit, Ground Floor, Banglore - 560034</li>
        </ul>
      </div>
      <div className="bottom-section">
        <div className="bottom-section-left">
          <ul>
            <li>
              <Link to={"/"}>Deals</Link>
            </li>
            <li>
              <a href="#products">What's New</a>
            </li>
            <li>
              <a href="#">Delivery</a>
            </li>
          </ul>
        </div>
        <div className="bottom-sectino-right">copyright &copy; {newYear}</div>
      </div>
    </div>
  );
};
export default ShopFooter;
