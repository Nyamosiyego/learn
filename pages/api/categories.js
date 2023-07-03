import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/model/Category";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    res.json(await Category.find().populate("parent"));
  }

  if (method === "POST") {
    const { name, parent } = req.body;
    const CategoryDoc = await Category.create({ name, parent });
    res.status(200).json(CategoryDoc);
  }
  if (method === "PUT") {
    const { name, parent, _id } = req.body;
    const CategoryDoc = await Category.findByIdAndUpdate(
      _id,
      { name, parent },
      { new: true }
    );
    res.status(200).json(CategoryDoc);
  }

  if (method === 'DELETE') {
    const { _id } = req.query;
    await Category.findByIdAndDelete(_id);
    res.status(200).json({ message: 'Category deleted' });
  }
}
