import { Vendor } from "@/model/Vendor";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Vendor.findOne({ _id: req.query?.id }));
    }else {
      res.json(await Vendor.find({}));
    }
    
  }

  if (method === "DELETE") {
    res.json(await Vendor.deleteOne({ _id: req.query?.id }));
  }
}
