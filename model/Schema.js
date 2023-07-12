import { Schema, model, models } from 'mongoose';
import Product from './Product';

const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        required: true,
    },
    password: String,
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
})

userSchema.pre("remove", async function (next) {
  try {
    const userId = this._id;

    // Delete all products associated with the user
    await Product.deleteMany({ user: userId });

    next();
  } catch (error) {
    next(error);
  }
});

const Users = models.user || model('user', userSchema)

export default Users;