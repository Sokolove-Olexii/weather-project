import styles from "./FilterBar.module.scss";
import { Container } from "../Container/Container";

export const FilterBar = ({ currentFilter, onFilterChange }) => {
  return (
    <Container>
      <div className={styles.filterContainer}>
        <label className={styles.filterItem}>
          <input
            className={styles.filterItem_input}
            type="radio"
            name="weatherFilter"
            value="all"
            checked={currentFilter === "all"}
            onChange={() => onFilterChange("all")}
          />
          <span className={styles.filterItem_span}>All</span>
        </label>

        <label className={styles.filterItem}>
          <input
            className={styles.filterItem_input}
            type="radio"
            name="weatherFilter"
            value="liked"
            checked={currentFilter === "liked"}
            onChange={() => onFilterChange("liked")}
          />
          <span className={styles.filterItem_span}>Liked</span>
        </label>

        <label className={styles.filterItem}>
          <input
            className={styles.filterItem_input}
            type="radio"
            name="weatherFilter"
            value="unliked"
            checked={currentFilter === "unliked"}
            onChange={() => onFilterChange("unliked")}
          />
          <span className={styles.filterItem_span}>Others</span>
        </label>
      </div>
    </Container>
  );
};
