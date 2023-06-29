import { NextApiRequest, NextApiResponse } from 'next';
import multiparty from 'multiparty';
const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new multiparty.Form();
  const { fields, files } = await new Promise<{ fields: any; files: any }>(
    (resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    }
  );
  console.log(files);
  res.json('ok');
};

export const config = {
  api: { bodyParser: false },
};

export default handle;
