import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Artist from '../models/Artist';

dotenv.config();

async function checkArtists() {
    try {
        // MongoDB 연결
        const uri = process.env.MONGODB_URI;
        console.log('Connecting to MongoDB with URI:', uri);
        
        await mongoose.connect(process.env.MONGODB_URI || '');
        console.log('Connected to MongoDB successfully');

        // 모든 아티스트 조회
        const artists = await Artist.find({});
        console.log('\nFound artists:', artists.length);
        console.log('\nArtists data:');
        console.log(JSON.stringify(artists, null, 2));

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
}

// 스크립트 실행
checkArtists();
