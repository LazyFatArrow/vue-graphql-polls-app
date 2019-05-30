import mongoose, { Schema } from 'mongoose';

const OptionSchema = new Schema({
  name: String,
  votes: {
    type: Number,
    default: 0,
  },
})

const PollSchema = new Schema({
  title: String,
  description: String,
  options: [OptionSchema],
}, {
  timestamps: true,
});

module.exports = mongoose.model('poll', PollSchema);