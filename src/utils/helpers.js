// Format currency
export const formatCurrency = (value) => {
  return `${parseFloat(value).toFixed(2)}`;
};

// Truncate text with ellipsis
export const truncateText = (text, length = 50) => {
  if (!text || text.length <= length) return text;
  return `${text.substring(0, length)}...`;
};

// Sort products by different criteria
export const sortProducts = (products, sortBy) => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price-low-high':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-high-low':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'rating':
      return sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    case 'name-a-z':
      return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    case 'name-z-a':
      return sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sortedProducts;
  }
};

// Filter products by category or search query
export const filterProducts = (products, { category, query }) => {
  let filtered = [...products];
  
  if (category && category !== 'all') {
    filtered = filtered.filter(product => product.category === category);
  }
  
  if (query) {
    const lowerCaseQuery = query.toLowerCase();
    filtered = filtered.filter(product => 
      product.title.toLowerCase().includes(lowerCaseQuery) || 
      product.description.toLowerCase().includes(lowerCaseQuery)
    );
  }
  
  return filtered;
};