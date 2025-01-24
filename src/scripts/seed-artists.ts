import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import Artist from '../models/Artist';
import { ArtistData } from '../types/artist.types';

dotenv.config();

// JSON 파일 읽기
const sampleDataPath = path.join(__dirname, '../data/sample-artists.json');
const sampleData = JSON.parse(fs.readFileSync(sampleDataPath, 'utf-8'));

async function seedDatabase() {
  try {
    // MongoDB 연결
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('Connected to MongoDB');

    // 기존 데이터 삭제
    await Artist.deleteMany({});
    console.log('Cleared existing artists');

    // 새 데이터 추가
    const result = await Artist.insertMany(sampleData.artists);
    console.log(`Added ${result.length} artists`);

    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// 스크립트 실행
seedDatabase();
