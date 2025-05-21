const mongoose = require('mongoose');

const confessionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  reactions: {
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }
  },
  replies: [
    {
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  reports: { type: Number, default: 0 },
  isApproved: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Confession', confessionSchema);
