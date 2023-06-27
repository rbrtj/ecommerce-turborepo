import { Layout } from '../../components/Layout';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ProductForm from '../../components/ProductForm';
const NewProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();
  const createProduct = async (ev) => {
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
    };
    await axios.post('/api/products', data);
    setGoToProducts(true);
  };
  if (goToProducts) {
    router.push('/products');
  }
  return (
    <Layout>
      <ProductForm />
    </Layout>
  );
};

export default NewProduct;
