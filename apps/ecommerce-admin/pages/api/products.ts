import mongoose from 'mongoose';
import {clientPromise} from 'packages/lib/mongodb.ts';
export default function handle(req, res) {
  const { method } = req;
  mongoose.connect(clientPromise);
  if (method === 'POST') {
  }
  res.json(req.method);
}
