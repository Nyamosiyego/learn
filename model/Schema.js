import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        required: true,
    },
    password: String,
})

const Users = models.user || model('user', userSchema)

export default Users;