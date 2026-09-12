import styles from "./Loading.module.scss";

function Loading({ children }) {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>{children}</p>
        </div>
    );
}

export default Loading;
