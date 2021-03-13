import mongoose from 'mongoose';

const replySchema = new mongoose.Schema(
  {
    intent: {
      type: String,
      default: '',
      required: true,
    },
    replyMessage: {
      type: String,
      default: '',
      required: true,
    },
    botId: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Reply = mongoose.model('Reply', replySchema);
