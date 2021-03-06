const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const Purchase = mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  interested: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

Purchase.plugin(mongoosePaginate)

module.exports = mongoose.model('Purchase', Purchase)
