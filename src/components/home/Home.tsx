import { useNavigate } from 'react-router-dom';
import { useRestaurantStore } from '../../store/restaurantStore';
import styles from  './Home.module.scss';
import { useEffect } from 'react';
import Cake from "../../assets/images/cake.jpg"
export default function Home() {
  const { restaurants, fetchRestaurants } = useRestaurantStore();

  const navigate = useNavigate();
  useEffect(() => {
    fetchRestaurants();
  }, []);
  const handleDetails = (r: any) => {
    navigate("/ProductDetails", {
      state: { product: r }
    });
  };
  return (
    <div className={styles.home}>
      <h2>Your taste</h2>

      <div className={styles.list}>
        {restaurants?.map((r) => (
          <div key={r.restaurant_id} className={styles.card} onClick={() =>handleDetails(r)}>
            <div className={styles.image}>
              <img
                src={Cake}
  alt={r.restaurant_name}
/>
            </div>

            <div className={styles.content}>
              <h3>{r.restaurant_name}</h3>
              <p className={styles.category}>Cakes, Pastry, Pastas</p>
              <p className={styles.address}>{r.address_complete}</p>

              <div className={styles.meta}>
                <span className={styles.rating}>⭐ 4.5</span>
                <span className={styles.price}>₹200 for two</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
