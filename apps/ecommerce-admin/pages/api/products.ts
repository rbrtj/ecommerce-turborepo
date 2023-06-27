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

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === 'POST') {
    const { title, description, price } = req.body as ReqBody;
    const productDoc = await Product.create({
      title,
      description,
      price,
    });
    res.json(productDoc);
  }

  if (method === 'PUT') {
    const { title, description, price, _id } = req.body as ReqBody;
    const producDoc = await Product.updateOne(
      {
        _id,
      },
      {
        title,
        description,
        price,
      }
    );
    res.json(producDoc);
  }
}
