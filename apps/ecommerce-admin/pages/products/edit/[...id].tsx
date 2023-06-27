import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout } from '../../../components/Layout';
import ProductForm from '../../../components/ProductForm';
import { Product } from '..';

const EditProductPage = () => {
  const { query } = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const { id } = query;

    if (!id) {
      return;
    }

    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/?id=${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [query]);

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <Layout>
      <ProductForm product={product} />
    </Layout>
  );
};

export default EditProductPage;
