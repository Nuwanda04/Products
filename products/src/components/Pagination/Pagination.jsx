import styles from "./Pagination.module.css";

export default function Pagination({ totalPages, page, onPageChange }) {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageButton}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>

      <span className={styles.pageInfo}>
        Page {page} of {totalPages}
      </span>

      <button
        className={styles.pageButton}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
