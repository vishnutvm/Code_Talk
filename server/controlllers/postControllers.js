// import User from '../models/User.js';
import Post from '../models/Post.js';


export const createPost = async (req, res) => {
  console.log('post creation trigger');
  try {
    const { userId, discription, picturePath } = req.body;
    console.log(req.body);

    // const user = await User.findById(userId)

    const newPost = new Post({
      picturePath,
      discription,
      createdBy: userId,
      like: {},
      Comments: [],
    });
    await newPost.save();
    const post = await Post.find().populate('createdBy');
    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(409).json({ error: err.message });
  }
};

export const getFeedPosts = async (req, res) => {
  console.log("working")
  try {
    const post = await Post.find().populate('createdBy');
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  console.log("get user post")
  try {
    const { userId } = req.params;

    const post = await Post.find({ createdBy }).populate('createdBy');
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const likePost = async (req, res) => {
  console.log("like rout gettin")
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.like.get(userId);

    if (isLiked) {
      post.like.delete(userId);
    } else {
      post.like.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { like: post.like },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
