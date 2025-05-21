import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';
import styles from './ProductCard.module.css';

const ProductCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // Load product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
        
        // Check if product is in favorites
        let favorites = localStorage.getItem('favorites');
        if (!favorites) {
          favorites = '[]';
        }
        const parsedFavorites = JSON.parse(favorites);
        setIsFavorite(parsedFavorites.includes(data.id));
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Toggle favorite status
  const toggleFavorite = () => {
    let currentFavorites = localStorage.getItem('favorites');
    if (!currentFavorites) {
      currentFavorites = '[]';
    }
    const parsedFavorites = JSON.parse(currentFavorites);
    
    let newFavorites;
    if (isFavorite) {
      newFavorites = parsedFavorites.filter(favId => favId !== product.id);
    } else {
      newFavorites = [...parsedFavorites, product.id];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  // Show loading state
  if (isLoading) {
    return <div className="loading">Loading product details...</div>;
  }

  // Show error if no product found
  if (!product) {
    return <div className="error">Product not found</div>;
  }


  return (
    <div className={styles.productDetail}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        <FaArrowLeft /> Back to Products
      </button>
      
      <div className={styles.productContainer}>
        <div className={styles.imageContainer}>
          <img 
            className={styles.productImage}
            src={product.thumbnail} 
            alt={product.title}
            onError={(e) => e.target.style.display = 'none'}
          />
          <button 
            className={`${styles.favoriteButton} ${isFavorite ? styles.favorited : ''}`}
            onClick={toggleFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
        
        <div className={styles.productInfo}>
          <h1>{product.title}</h1>
          <p className={styles.category}>{product.category} • {product.brand}</p>
          
          <div className={styles.rating}>
            <span>{product.rating}/5 ★</span>
          </div>
          
          <div className={styles.price}>
            {product.price}
          </div>
          
          <div className={styles.description}>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;