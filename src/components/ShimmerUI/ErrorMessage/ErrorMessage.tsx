import { Link } from "react-router-dom";
import * as styles from "./ErrorMessage.module.scss";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <svg className={styles.errorIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p className={styles.errorMessage}>{message}</p>
        <Link to="/browse">
        <button className={styles.errorButton}>
          Home Page
        </button>
        </Link>
      </div>
    </div>
  );
};
