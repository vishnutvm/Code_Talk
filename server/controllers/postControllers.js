/* eslint-disable import/extensions */
// import User from '../models/User.js';

import Post from '../models/Post.js';
// import { uploadFile } from '../s3.js';

export const createPost = async (req, res) => {
  console.log('file', req.file);
  // const buffer = Buffer.from(req.file);
  // console.log(buffer);
  // console.log('buffer', req.file.buffer);
  console.log('post creation trigger');
  try {
    // // uploading imagge
    const { userId, discription, picturePath } = req.body;
    console.log(req.body);

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

export const editPost = async (req, res) => {
  console.log('post editing trigger');
  try {
    const { postId, discription, picturePath } = req.body;
    console.log(req.body);

    const post = await Post.findById(postId);
    console.log(post);
    Post.findOneAndUpdate(
      { _id: postId },
      { discription, picturePath },
      { new: true }
    ).then(async (update) => {
      console.log(update);
      const updatedPosts = await Post.find().populate('createdBy');
      res.status(201).json(updatedPosts);
    });
    // await newPost.save();
    // const post = await Post.find().populate('createdBy');
    // res.status(201).json(post)
  } catch (err) {
    console.log(err);
    res.status(409).json({ error: err.message });
  }
};

export const getFeedPosts = async (req, res) => {
  console.log('working');
  try {
    const post = await Post.find().populate('createdBy');
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  console.log('get user post');
  try {
    const { userId } = req.params;

    const post = await Post.find({ createdBy: userId }).populate('createdBy');
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// delete the post
export const deletePost = async (req, res) => {
  console.log('delete user post');
  try {
    const { postId } = req.params;
    console.log(postId);
    // const post = Post.deleteB({ _id: postId });
    Post.deleteOne({ _id: postId }).then(async () => {
      const updatedProfile = await Post.find();
      console.log(updatedProfile);
      // const post = await Post.find({ createdBy: userId }).populate('createdBy');
      res.status(200).json(updatedProfile);
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const likePost = async (req, res) => {
  console.log('like rout gettin');
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

export const commentPost = async (req, res) => {
  console.log('like rout gettin');
  try {
    const { id } = req.params;
    const comment = req.body;
    console.log(req.body);
    const post = await Post.findById(id);
    post.Comments.push(comment);
    await post.save();
    const updatedPost = await Post.findById(id);
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
