import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.ObjectId,
      ref: 'User',
    },
    discription: String,
    picturePath: String,
    like: {
      type: Map,
      of: Boolean,
    },
    Comments: {
      type: Array,
      default: ['nice'],
    },
  },
  { timestamp: true },
);

const Post = mongoose.model('Post', postSchema);

export default Post;
