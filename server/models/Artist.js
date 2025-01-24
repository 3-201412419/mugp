const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Artist', artistSchema);
