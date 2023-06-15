import mongoose from "mongoose";

const connectMongo = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });

        if (connection.readyState >= 1) {
            return Promise.resolve(true);
        }
    } catch (error) {
        return Promise.reject(error);
    }
    }

export default connectMongo;    