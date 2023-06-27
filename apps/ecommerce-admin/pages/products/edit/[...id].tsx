import { useRouter } from 'next/router';
import { Layout } from '../../../components/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '..';
import ProductForm from '../../../components/ProductForm';

const EditProductPage = () => {
  const router = useRouter();
  const [product, setProduct] = useState<Product>(null);
  const productId = router.query.id;
  useEffect(() => {
    if (!productId) return;
    axios.get('/api/products/?id=' + productId).then((res) => {
      setProduct(res.data);
    });
  }, [productId]);
  if (!product) return <h1>Loading ...</h1>;
  return (
    <Layout>
      <ProductForm product={product} />
    </Layout>
  );
};

export default EditProductPage;
