import girlHeadphones from "@/assets/images/girl_headphones-1.png";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="sub-container">
      <div className="banner">
        <div className="banner-text">
          <h1>
            Grab Upto 50% Off On <br></br>Many Deals
          </h1>
          <span className="is-buy-now">
            <a href="#products">
              <button className="btn-rounded buy-now">Buy Now</button>
            </a>
          </span>
        </div>
        <div className="subject">
          <img src={girlHeadphones} alt="Girl Headphones" width={"100%"} />
        </div>
      </div>
    </div>
  );
};
export default Banner;
