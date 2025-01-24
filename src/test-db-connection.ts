import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
    try {
        const uri = process.env.MONGODB_URI;
        
        if (!uri) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        console.log('Attempting to connect to MongoDB...');
        
        await mongoose.connect(uri);
        
        console.log('Successfully connected to MongoDB!');
        
        // Create a simple test schema and model
        const TestSchema = new mongoose.Schema({
            name: String,
            timestamp: { type: Date, default: Date.now }
        });
        
        const Test = mongoose.model('Test', TestSchema);
        
        // Try to create a test document
        const testDoc = new Test({ name: 'Connection Test' });
        await testDoc.save();
        
        console.log('Successfully created a test document');
        
        // Clean up - remove the test document
        await Test.deleteOne({ _id: testDoc._id });
        
        console.log('Successfully removed the test document');
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

testConnection();
