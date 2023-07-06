import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/Product";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth/[...nextauth]";
import user from "@/model/Schema";

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
   const session = await getServerSession(req, res, authOptions);
   const userId = session?.userId;
  //  const product = await Product.findById(req.body._id);
    const { title, description, price, images, category, properties } =
      req.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
      category,
      properties,
      user: userId,
    });
    await user.findByIdAndUpdate(userId, { $push: { products: productDoc._id } });
    res.json(productDoc);
  }

  if (method === "PUT") {
    const session = await getServerSession(req, res, authOptions)
    const userId = session?.userId;
    const product = await Product.findById(req.body._id);
    
    const { title, description, price, images, category, properties, _id } =
      req.body;
    await Product.updateOne(
      { _id },
      { title, description, price, images, category, properties, user: userId }
    );
    await user.findByIdAndUpdate(userId, { $push: { products: product._id } });
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      const session = await getServerSession(req, res, authOptions);
      const userId = session?.userId;
      const product = await Product.findById(req.query.id);
      await Product.deleteOne({ _id: req.query?.id });
      await user.findByIdAndUpdate(userId, {
        $pull: { products: product._id },
      });
      res.json(true);
    }
  }
}