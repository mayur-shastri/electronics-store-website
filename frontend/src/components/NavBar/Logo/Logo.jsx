import logoImage from '../../../assets/images/logo.png';
import './logo.css';
const Logo = () => {

  return <div className="logo">
    <img className='logo-img' src={logoImage} alt="Logo" />
    <div>BestShoffers </div>
  </div>;

};
export default Logo;
