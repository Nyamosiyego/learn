import Users from "@/model/Schema";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === "GET") {
        res.json(await Users.find({}, '_id'))
    }
  }