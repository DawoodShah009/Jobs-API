const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Company name must be provided!'],
    },
    position: {
      type: String,
      required: [true, 'Please provide position!'],
    },
    status: {
      type: String,
      enum: ['pending', 'interview', 'decline'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user!!!'],
    },
  },
  { timestamps: true }
)
module.exports = mongoose.model('Job', jobSchema)
