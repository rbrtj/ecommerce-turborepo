import mongoose from 'mongoose';
import clientPromise from 'lib';
export default function handle(req, res) {
  const { method } = req;
  mongoose.connect(clientPromise);
  if (method === 'POST') {
  }
  res.json(req.method);
}
