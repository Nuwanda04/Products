import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './ProductList.module.css';

const ProductList = ({ products = [], favorites = [], onToggleFavorite, onProductClick }) => {
  const navigate = useNavigate();

  // Handle product click
  const handleClick = (productId) => {
    if (onProductClick) {
      onProductClick(productId);
    } else {
      navigate(`/product/${productId}`);
    }
  };

  // Handle favorite button click
  const handleFavoriteClick = (e, productId) => {
    e.stopPropagation();
    onToggleFavorite(productId);
  };

  if (!products || products.length === 0) {
    return (
      <div className={styles.noProducts}>
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div className={styles.productGrid}>
      {products.map((product) => {
        const { id, title, price, thumbnail, category } = product;
        const isFavorite = favorites.includes(id);
        
        // Keep title as is
        const shortTitle = title;
        
        return (
          <div 
            key={id} 
            className={styles.productCard}
            onClick={() => handleClick(id)}
          >
            <div className={styles.imageContainer}>
              <img 
                src={thumbnail} 
                alt={title}
                className={styles.productImage}
                onError={(e) => e.target.style.display = 'none'}
              />
              <button 
                className={`${styles.favoriteButton} ${isFavorite ? styles.favorited : ''}`}
                onClick={(e) => handleFavoriteClick(e, id)}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
            
            <div className={styles.productInfo}>
              <span className={styles.category}>{category}</span>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.price}>${price}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;