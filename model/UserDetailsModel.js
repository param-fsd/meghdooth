const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User1',
    required: true,
  },
  image: {
    type: String,
    required: [true, 'User image is required'],
  },
  video: {
    type: String,
    required: [true, 'User video is required'],
  },
}, {
  timestamps: true, 
});

const Details = mongoose.model('Details1', detailsSchema);

module.exports = Details;
