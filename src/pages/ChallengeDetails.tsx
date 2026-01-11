import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getChallengeById, type Challenge } from "../utils/api";
import styles from "../styles/ChallengeDetails.module.css";

export default function ChallengeDetails() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setError("Challenge ID not provided");
      setIsLoading(false);
      return;
    }

    getChallengeById(id)
      .then((data) => {
        setChallenge(data);
        setError("");
      })
      .catch((err) => {
        setError(String(err));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div className={styles.container}>
      <Link to="/challenges" className={styles.backLink}>
        ← Back
      </Link>

      {error && <p className={styles.error}>API error: {error}</p>}

      {isLoading && <p className={styles.loading}>Loading challenge...</p>}

      {!isLoading && !challenge && !error && (
        <p className={styles.loading}>Challenge not found.</p>
      )}

      {!isLoading && challenge && (
        <>
          <h2 className={styles.title}>{challenge.title}</h2>

          <div className={styles.details}>
            <div className={styles.detailRow}>
              <span className={styles.label}>Difficulty:</span> {challenge.difficulty}
            </div>
          </div>

          {challenge.prompt && (
            <div className={styles.promptSection}>
              <h3 className={styles.promptTitle}>Prompt</h3>
              <p className={styles.promptContent}>{challenge.prompt}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}