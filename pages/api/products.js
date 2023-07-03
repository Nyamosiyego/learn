import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/Product";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const { title, description, price, image } = req.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
      image,
    });
    res.status(200).json(productDoc);
  }

  if (method === "PUT") {
    const { _id, title, description, price, image } = req.body;
    await Product.updateOne({ _id }, { title, description, price, image });
    res.status(200).json({ _id, title, description, price, image });
  }

  if (method === "DELETE") {
    const { id } = req.query;
    await Product.deleteOne({ _id: id });
    res.status(200).json({ id });
  }
}
