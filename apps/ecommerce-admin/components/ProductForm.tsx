import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { Button, Input, Label, Textarea } from 'ui';
import { Product } from '../pages/products';
import { Camera, Upload } from 'lucide-react';

interface ProductFormProps {
  product?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    price: product?.price || '',
    images: product?.images || [],
  });
  const [goToProducts, setGoToProducts] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const imageInputRef = useRef(null);
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

  const handleClickUpload = () => {
    imageInputRef.current.click();
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files?.length > 0) {
      const fileList = Array.from(files);
      const data = new FormData();
      fileList.forEach((file) => {
        data.append('file', file);
      });
      const res = await axios.post('/api/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(res.data);
    }
  };

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
      <Label>Photos</Label>
      <div className="mb-2">
        <div
          className="w-24 h-24 flex flex-col justify-center items-center gap-1 rounded-md bg-gray-300 cursor-pointer"
          onClick={handleClickUpload}
        >
          <Camera size="24px" /> <span className="text-xs">Upload Photo</span>
          <Input
            type="file"
            className="hidden"
            ref={imageInputRef}
            onChange={handleImageUpload}
          />
        </div>
        {!product?.images.length && <div>No photos in this product</div>}
      </div>
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
