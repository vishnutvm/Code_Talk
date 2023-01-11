/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BallTriangle } from 'react-loader-spinner';
import { setPosts } from '../../../redux/userState';
import { baseUrl } from '../../../constants/constants';
import PostWidget from '../PostComponent/PostWidget';

// XlviLoader
function PostsWidget({ userId, isProfile = false }) {
  const [loading, setloading] = useState(true);
  // console.log(isProfile);
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
    setloading(false);
    // console.log(data);
  };

  // get user post

  const getUserPost = async () => {
    const response = await fetch(`${baseUrl}/posts/${userId}/posts`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

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

  // useEffect(() => {
  //   // console.log(posts);
  //   setloading(true);
  // }, [posts]);

  // console.log(posts);
  return (
    <>
      {!loading ? (
        posts.map(
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
        )
      ) : (
        <div role="status" className="space-y-2.5 animate-pulse max-w-lg mt-4">
          <div className="flex items-center w-full space-x-2">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32" />
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24" />
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
          </div>
          <div className="flex items-center w-full space-x-2 max-w-[480px]">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24" />
          </div>
          <div className="flex items-center w-full space-x-2 max-w-[400px]">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80" />
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
          </div>
          <div className="flex items-center w-full space-x-2 max-w-[480px]">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24" />
          </div>
          <div className="flex items-center w-full space-x-2 max-w-[440px]">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32" />
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24" />
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
          </div>
          <div className="flex items-center w-full space-x-2 max-w-[360px]">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80" />
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  );
}

export default PostsWidget;
