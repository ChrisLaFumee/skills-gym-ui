import { Link } from "react-router-dom";
import type { Challenge } from "../utils/api";
import styles from "../styles/ChallengeCard.module.css";

type Props = { challenge: Challenge };

/**
 * Challenge Card Component
 * Displays a single challenge in a list with difficulty level and link to details
 */
export default function ChallengeCard({ challenge }: Props) {
  return (
    <li className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.title}>{challenge.title}</div>
        <div className={styles.difficulty}>Difficulty: {challenge.difficulty}</div>
      </div>
      <Link to={`/challenges/${challenge.id}`} className={styles.link}>
        Start
      </Link>
    </li>
  );
}