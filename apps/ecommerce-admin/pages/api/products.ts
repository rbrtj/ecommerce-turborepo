import { mongooseConnect } from 'lib';
import { Product } from '../../models/Product';
import { NextApiRequest, NextApiResponse } from 'next';

export interface ReqBody {
  title: string;
  description: string;
  price: number;
  _id?: string;
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await mongooseConnect();

  switch (method) {
    case 'GET':
      if (req.query?.id) {
        const product = await Product.findOne({ _id: req.query.id });
        return res.json(product);
      } else {
        const products = await Product.find();
        return res.json(products);
      }
    case 'POST':
      const { title, description, price } = req.body as ReqBody;
      const newProduct = await Product.create({
        title,
        description,
        price,
      });
      return res.json(newProduct);
    case 'PUT':
      const {
        title: titleUpdate,
        description: descUpdate,
        price: priceUpdate,
        _id,
      } = req.body as ReqBody;
      const updatedProduct = await Product.updateOne(
        { _id },
        { title: titleUpdate, description: descUpdate, price: priceUpdate }
      );
      return res.json(updatedProduct);
    case 'DELETE':
      const _idToDelete = req.query.id as string;
      const deletedProduct = await Product.deleteOne({ _id: _idToDelete });
      return res.json(deletedProduct);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
