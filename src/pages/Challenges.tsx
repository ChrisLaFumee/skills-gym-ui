import { useEffect, useState } from "react";
import { getChallenges, type Challenge } from "../utils/api";
import ChallengeCard from "../components/ChallengeCard";
import styles from "../styles/Challenges.module.css";

export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getChallenges()
      .then((data) => {
        setChallenges(data);
        setError("");
      })
      .catch((err) => {
        setError(String(err));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Challenges</h2>

      {error && <p className={styles.error}>API error: {error}</p>}

      {isLoading && <p className={styles.loading}>Loading challenges...</p>}

      {!isLoading && challenges.length === 0 && !error && (
        <p className={styles.loading}>No challenges found.</p>
      )}

      {!isLoading && challenges.length > 0 && (
        <ul className={styles.list}>
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </ul>
      )}
    </div>
  );
}