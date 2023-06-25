import { Button, Input, Label, Textarea } from 'ui';
import { Layout } from '../../components/Layout';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
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
      <form onSubmit={createProduct} className="flex flex-col gap-5">
        <h1 className="text-neutral-900 text-xl">New Product</h1>
        <Label>Name</Label>
        <Input
          placeholder="Product name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Label>Description</Label>
        <Textarea
          placeholder="Product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Label>Price (in USD)</Label>
        <Input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Button type="submit" className="w-32">
          Save
        </Button>
      </form>
    </Layout>
  );
};

export default NewProduct;
