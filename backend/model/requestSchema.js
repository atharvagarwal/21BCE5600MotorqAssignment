const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  description: {
    type: String,
    required:true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Users",
    required:true,
  },
  workflowId:{
    type: mongoose.Schema.Types.ObjectId,
    required:true
  },
  status:{
    type:Boolean,
    default:false
  },
  workflow:{
    type:String,
  },
  justification:{
    type:String,
  },
  timestamp:{
    type:Date,
  },
  adminApproved:{
    type:Boolean,
    default:false
  },
   approverApproved:{
    type:Boolean,
    default:false
  },
});

module.exports = mongoose.model('Request', requestSchema);