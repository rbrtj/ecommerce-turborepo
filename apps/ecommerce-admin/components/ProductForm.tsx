import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button, Input, Label, Textarea } from 'ui';
import { Product } from '../pages/products';

interface ProductFormProps {
  product?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    price: product?.price || '',
  });
  const [goToProducts, setGoToProducts] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (product?._id) {
      await axios.put(`/api/products`, {
        ...formData,
        _id: product._id,
      });
    } else {
      await axios.post('/api/products', formData);
    }
    setGoToProducts(true);
  };

  useEffect(() => {
    if (goToProducts) {
      router.push('/products');
    }
  }, [goToProducts, router]);

  useEffect(() => {
    setIsValid(
      formData.title.trim() !== '' && parseFloat(formData.price.toString()) > 0
    );
  }, [formData]);

  return (
    <form onSubmit={handleSaveProduct} className="flex flex-col gap-5">
      <h1 className="text-neutral-900 text-xl">
        {product ? 'Edit product' : 'New product'}
      </h1>
      <Label>Name</Label>
      <Input
        name="title"
        placeholder="Product name"
        value={formData.title}
        onChange={handleInputChange}
        required
      />
      <Label>Description</Label>
      <Textarea
        name="description"
        placeholder="Product description"
        value={formData.description}
        onChange={handleInputChange}
      />
      <Label>Price (in USD)</Label>
      <Input
        name="price"
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={handleInputChange}
        required
      />
      <Button disabled={!isValid} type="submit" className="w-32">
        Save
      </Button>
    </form>
  );
};

export default ProductForm;
