import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Skills Gym</h1>
      <p className={styles.subtitle}>Train your coding skills like a workout.</p>

      <Link to="/challenges" className={styles.link}>
        View Challenges
      </Link>
    </div>
  );
}