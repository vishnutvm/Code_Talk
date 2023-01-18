import mongoose from 'mongoose';


// chat Post model

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
      default: [],
    },
    createdAt: {
      type: String,
      default: () => new Date().toISOString(),
    },
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
