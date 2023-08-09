const mongoose = require('mongoose');

const workflowSchema = new mongoose.Schema({
  description: {
    type: String,
    enum:["admin only","approver only","both"],
    required:true,
  }
});

module.exports = mongoose.model('Workflow', workflowSchema);