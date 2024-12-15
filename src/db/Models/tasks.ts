import mongoose, { Schema } from "mongoose";
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    author: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
export default Task