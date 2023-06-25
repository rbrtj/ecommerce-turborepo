import { mongooseConnect } from 'lib';
import { Product } from '../../models/Product';
import { NextApiRequest, NextApiResponse } from 'next';

export interface ReqBody {
  title: string;
  description: string;
  price: number;
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await mongooseConnect();
  if (method === 'POST') {
    const { title, description, price } = req.body as ReqBody;
    const productDoc = await Product.create({
      title,
      description,
      price,
    });
    res.json(productDoc);
  }
}
