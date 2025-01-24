import mongoose, { Schema, Document } from 'mongoose';

export interface IArtist extends Document {
  name: string;
  category: 'influencer' | 'mc' | 'creator';
  image: string;
  description?: string;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    blog?: string;
  };
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ArtistSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['influencer', 'mc', 'creator'],
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  socialLinks: {
    instagram: String,
    youtube: String,
    blog: String,
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IArtist>('Artist', ArtistSchema);
