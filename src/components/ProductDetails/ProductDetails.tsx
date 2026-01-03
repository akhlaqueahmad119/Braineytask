import { useLocation, useNavigate } from "react-router-dom";
import styles from './ProductDetails.module.scss'
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Cake from "../../assets/images/cake.jpg"
export default function ProductDetails() {
  const navigate = useNavigate();

  const { state } = useLocation();
  const product = state?.product;

  console.log(product,"hh");
  const {
    restaurant_name,
  } = product;
  if (!product) return <p>No product found</p>;

  return (
    <div className={styles.restaurant_card}>
      <div className={styles.back_btn} onClick={() => navigate("/home")}>
        <IoIosArrowBack />
      </div>

      <div className={styles.card_image}>
        <img src={Cake} alt={restaurant_name} />
      </div>

      <div className={styles.card_body}>
        <div className={styles.title_row}>
          <h2>{restaurant_name}</h2>
          <div className={styles.rating}>
            <FaStar color="#FFD700" />
            <span>4.5</span>
          </div>
        </div>

        <p className={styles.address}>Connaught Place. New Delhi</p>

        <div className={styles.offers}>
          <span>🔥 4 Offers Trending</span>
        </div>

        <p className={styles.description}>
          Our delicate vanilla cake swirled with chocolate and filled with mocha chocolate chip cream and a layer of dark chocolate ganache.
        </p>
      </div>
    </div>
  );
}
