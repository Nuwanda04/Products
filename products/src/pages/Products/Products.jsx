import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductList from '../../components/ProductList/ProductList';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import Pagination from '../../components/Pagination/Pagination';
import styles from './Products.module.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get current page, search, and sort from URL
  const page = parseInt(searchParams.get('page') || '1');
  const searchTerm = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || '';
  
  // Number of products per page
  const productsPerPage = 9;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  
  // Load favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Handle search
  const handleSearch = (searchTerm) => {
    // Update the URL with the search term
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('search', searchTerm);
      params.set('page', '1');
    } else {
      params.delete('search');
    }
    navigate(`?${params.toString()}`, { replace: true });
  };

  // Handle sort change
  const handleSortChange = (sortValue) => {
    const params = new URLSearchParams(searchParams);
    if (sortValue) {
      params.set('sort', sortValue);
    } else {
      params.delete('sort');
    }
    // Reset to first page when changing sort
    params.set('page', '1');
    navigate(`?${params.toString()}`, { replace: true });
  };

  // Fetch products from API with sorting and search
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const skip = (page - 1) * productsPerPage;
        
        // Build the base URL
        let url = `https://dummyjson.com/products`;
        const params = new URLSearchParams({
          limit: productsPerPage,
          skip: skip
        });

        // Add search if present
        if (searchTerm) {
          url += `/search`;
          params.set('q', searchTerm);
        }

        // Add sorting if present
        if (sortBy) {
          switch(sortBy) {
            case 'name':
              params.set('select', 'title,price,rating,thumbnail');
              break;
            case 'price-asc':
              params.set('sort', 'price');
              params.set('order', 'asc');
              break;
            case 'price-desc':
              params.set('sort', 'price');
              params.set('order', 'desc');
              break;
            default:
              break;
          }
        }

        // Make the API call
        const response = await fetch(`${url}?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        
        let data = await response.json();
        
        // If we're sorting by name on the client side
        if (sortBy === 'name') {
          data.products = data.products.sort((a, b) => 
            a.title.localeCompare(b.title)
          );
        }
        
        setProducts(data.products || []);
        setTotalProducts(data.total || 0);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page, searchTerm, sortBy, searchParams]);

  // Toggle favorite status of a product
  const toggleFavorite = (productId) => {
    setFavorites(prevFavorites => 
      prevFavorites.includes(productId)
        ? prevFavorites.filter(id => id !== productId)
        : [...prevFavorites, productId]
    );
  };

  // Handle product click
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className={styles.productsPage}>
      <h1>Our Products</h1>
      
      <FilterPanel 
        searchTerm={searchTerm}
        onSearch={handleSearch}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />
      
      {isLoading ? (
        <div className={styles.loading}>Loading products...</div>
      ) : products.length === 0 ? (
        <div className={styles.error}>No products found. Try a different search.</div>
      ) : (
        <>
          <ProductList 
            products={products} 
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onProductClick={handleProductClick}
          />
          {totalPages > 1 && (
            <div className={styles.paginationContainer}>
              <Pagination 
                totalPages={totalPages} 
                page={page} 
                onPageChange={(newPage) => {
                  const params = new URLSearchParams(searchParams);
                  params.set('page', newPage);
                  navigate(`?${params.toString()}`);
                }} 
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
