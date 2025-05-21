import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Products from './pages/Products/Products';
import ProductCard from './components/ProductCard/ProductCard';

function App() {
  // State for favorites (moved from Products component to be accessible app-wide if needed)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteProducts');
    return saved ? JSON.parse(saved) : [];
  });

  // Save favorites to localStorage when they change
  const updateFavorites = (newFavorites) => {
    localStorage.setItem('favoriteProducts', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route 
              path="/products" 
              element={
                <Products 
                  favorites={favorites} 
                  onUpdateFavorites={updateFavorites} 
                />
              } 
            />
            <Route 
              path="/product/:id" 
              element={
                <ProductCard 
                  favorites={favorites} 
                  onToggleFavorite={(id) => {
                    const newFavorites = favorites.includes(id)
                      ? favorites.filter(favId => favId !== id)
                      : [...favorites, id];
                    updateFavorites(newFavorites);
                  }}
                />
              } 
            />
            {/* Add a catch-all route for 404 pages */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
