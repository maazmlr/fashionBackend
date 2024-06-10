import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  type:String,
  
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensures email is unique
  },
  password: {
    type: String,
    required: true
  }
});

const Agent = mongoose.model('Agent', agentSchema);

export default Agent;
