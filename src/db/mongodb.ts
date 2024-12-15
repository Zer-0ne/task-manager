'use server'
import mongoose from 'mongoose';
mongoose.set('strictPopulate', false);
export const connect = async (): Promise<void> => {
    try {
        const uri = process.env.MONGO_URI as string;

        await mongoose.connect(uri, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useNewUrlParser: true,
            // useUnifiedTopology: true,s
            serverSelectionTimeoutMS: 150000,
        });

        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
};

export default connect;