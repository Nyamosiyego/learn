import connectMongo from "@/database/conn";
import Users from "@/model/Schema";
import { hash } from "bcryptjs";


export default async function handler(req, res){
    connectMongo().catch(error => res.json({ error:"Connection failed....!" }))

    if (req.method === "POST") {
        if (!req.body) return res.status(400).json({ error:"No data provided" })
        const { username, email, password } = req.body;

        //check if user already exists
        const checkexisting = await Users.findOne({ email })
        if (checkexisting) return res.status(422).json({ error:"User already exists" })

        //hash password
        Users.create({ username, email, password: await hash(password, 12)})
        .then(user => res.status(201).json({ status:true, user }))
        .catch(error => res.status(400).json({ error }))
    }
    //         (error, data) => {
    //         if (error) return res.status(400).json({ error })
    //         res.status(201).json({ status:true, user:data })
    //     }
    //     )
    // }
    // else{
    //     res.status(400).json({ message:"Method not allowed" })
    // }
}