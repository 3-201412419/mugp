import mongoose from 'mongoose';

const ApplySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['influencer', 'artist', 'actor'],
  },
  message: {
    type: String,
    required: true,
  },
  portfolioUrl: {
    type: String,
  },
  notionPageId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  collection: 'applies'
});

export default mongoose.model('Apply', ApplySchema);
