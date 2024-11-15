import { loadProducts } from './Products';
import { loadPincodes } from './Pincodes';
import { loadStock } from './Stock';

export const loadData = () => {
  const products = loadProducts();
  const stock = loadStock();
  const pincodes = loadPincodes();

  const enrichedProducts = products.map(product => ({
    ...product,
    inStock: stock[product.id] || false,
  }));

  return { products: enrichedProducts, pincodes };
};
