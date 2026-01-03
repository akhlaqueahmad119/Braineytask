import { FaWifi } from "react-icons/fa6";
import { GiNetworkBars } from "react-icons/gi";
import { FaBatteryFull } from "react-icons/fa";

import styles from './Header.module.scss'
export default function Header() {

    return (
        <div className={styles.forgot}>
    
          <div className={styles.status_bar}>
            <span>9:41</span>
            <div className={styles.icons}>
              <GiNetworkBars />
              <FaWifi />
              <FaBatteryFull />
            </div>
          </div>
    
        </div>
      );
  
}