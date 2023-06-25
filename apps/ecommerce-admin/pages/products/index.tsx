import Link from 'next/link';
import { Button } from 'ui';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout } from '../../components/Layout';

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    axios.get<Product[]>('/api/products').then((res) => {
      setProducts(res.data);
    });
  }, []);
  return (
    <Layout>
      <Button>
        <Link href={'/products/new'}>Add new product</Link>
      </Button>
      <table>
        <thead>
          <tr>
            <td>Product name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>Buttons</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Products;
