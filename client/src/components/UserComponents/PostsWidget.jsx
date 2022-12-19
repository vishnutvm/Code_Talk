/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../redux/userState';
import { baseUrl } from '../../constants/constants';
import PostWidget from './PostWidget';

function PostsWidget({ userId, isProfile = false }) {
  console.log(isProfile);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.user.posts);
  const token = useSelector((state) => state.user.token);
  // get all the post

  const getPost = async () => {
    const response = await fetch(`${baseUrl}/posts`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    // console.log(data);
  };

  // get user post

  const getUserPost = async () => {
    const response = await fetch(
      `${baseUrl}/posts/${userId}/posts`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  // use effect action swich between user post and all user post

  useEffect(() => {
    if (isProfile) {
      getUserPost();
    } else {
      getPost();
    }
  }, []);

  return (
    <>
      {posts.map(
        ({ _id, createdBy, discription, picturePath, like, Comments }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={createdBy._id}
            name={createdBy.username}
            discription={discription}
            picturePath={picturePath}
            userPicturePath={createdBy.profilePicture}
            likes={like}
            comments={Comments}
            isProfile={isProfile}
          />
        )
      )}
    </>
  );
}

export default PostsWidget;
