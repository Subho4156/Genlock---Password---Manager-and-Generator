import mongoose from 'mongoose';

const PasswordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  websiteName: String,
  websiteLink: String,
  username: String,
  password: String,
});

export default mongoose.model('Password', PasswordSchema);
