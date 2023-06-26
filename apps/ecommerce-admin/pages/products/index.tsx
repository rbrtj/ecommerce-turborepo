import Link from 'next/link';
import { Button } from 'ui';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout } from '../../components/Layout';
import { Edit } from 'lucide-react';

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
      <div className="relative w-[80%] mx-auto mt-2 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Product name</th>
              <th className="px-6 py-3 flex justify-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{product.title}</td>
                <td className="px-6 py-4 flex justify-center">
                  <Link href={'/products/edit/' + product._id}>
                    <Button className="inline-flex gap-2">
                      <Edit size="16px" />
                      Edit
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Products;
