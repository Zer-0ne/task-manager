import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    profile: { type: String },
    name: { type: String },
    username: {
        type: String,
        required: [true, 'Please add username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        unique: true
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    image: { type: String }
}, {
    timestamps: true
});

// Check if the model already exists, if not, create it
const Users = mongoose.models.User || mongoose.model('User', userSchema);

export default Users; // Use default export for consistency
