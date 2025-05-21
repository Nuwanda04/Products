import { useState, useEffect } from 'react';
import styles from "./FilterPanel.module.css";

const FilterPanel = ({ searchTerm, onSearch, sortBy, onSortChange }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  
  // Update local state when prop changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);
  
  const handleSearchChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchTerm);
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <div className={styles.searchContainer}>
          <label htmlFor="search" className={styles.label}>
            Search products:
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="search"
              placeholder="Search products..."
              value={localSearchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <span className={styles.searchIcon}>🔍</span>
            </button>
          </div>
        </div>
      </form>

      <div className={styles.sortContainer}>
        <label htmlFor="sort" className={styles.sortLabel}>
          Sort by:
        </label>
        <div className={styles.selectWrapper}>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className={styles.select}
          >
            <option value="">None</option>
            <option value="name">Name (A-Z)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
          <span className={styles.dropdownArrow}>▼</span>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
