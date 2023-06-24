import Link from 'next/link';
import { Layout } from '../components/Layout';
import { Button } from 'ui';

const Products = () => {
  return (
    <Layout>
      <Button>
        <Link href={'/products/new'}>Add new product</Link>
      </Button>
    </Layout>
  );
};

export default Products;
