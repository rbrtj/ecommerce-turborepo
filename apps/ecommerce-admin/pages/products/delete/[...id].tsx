import { useRouter } from 'next/router';
import { Layout } from '../../../components/Layout';
import { Button } from 'ui';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '..';

const getProductApi = (id: string | string[]) => `/api/products?id=${id}`;
const PRODUCT_LIST_PATH = '/products';

const ProductDeletePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get(getProductApi(id))
      .then((res) => setProduct(res.data))
      .catch(() => setProduct(null));
  }, [id]);

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(getProductApi(id));
      router.push(PRODUCT_LIST_PATH);
    } catch (error) {
      //
    }
  };

  if (product === undefined) {
    return (
      <Layout>
        <h3>Loading ...</h3>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <h3>Product not found</h3>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col w-full gap-24 items-center mt-24">
        <h3>
          Do you really want to delete product&nbsp;
          <span className="font-bold">&quot;{product?.title}&quot;</span>?
        </h3>
        <div className="flex gap-4">
          <Button variant="destructive" onClick={handleDeleteProduct}>
            Yes
          </Button>
          <Button onClick={() => router.push(PRODUCT_LIST_PATH)}>No</Button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDeletePage;
