import { Product } from '../../context/DataContext';
import { mockProducts } from '../../data/mockProducts';

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Transform ProductDetail[] to Product[] if needed, or just use as is if compatible
    // mockProducts has more fields, but is assignable to Product if types match
    return Promise.resolve(mockProducts as unknown as Product[]);
  },
  getById: async (id: string): Promise<Product | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return Promise.resolve(mockProducts.find(p => p.id === id) as unknown as Product);
  }
};
