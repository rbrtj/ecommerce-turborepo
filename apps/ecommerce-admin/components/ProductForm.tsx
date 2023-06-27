import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Input, Label, Textarea } from 'ui';
import { Product } from '../pages/products';

interface ProductFormProps {
  product?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
  const [title, setTitle] = useState(product?.title ? product.title : '');
  const [description, setDescription] = useState(
    product?.description ? product.description : ''
  );
  const [price, setPrice] = useState(product?.price ? product.price : '');
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
    <form onSubmit={createProduct} className="flex flex-col gap-5">
      <h1 className="text-neutral-900 text-xl">
        {product ? 'Edit product' : 'New product'}
      </h1>
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
  );
};

export default ProductForm;
