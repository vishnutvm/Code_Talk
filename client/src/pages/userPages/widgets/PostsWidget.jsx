/* eslint-disable react/prop-types */
import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../../redux/userState';

import PostWidget from './PostWidget';

function PostsWidget({ userId, isProfile = false }) {
  console.log(isProfile);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  // get all the post

  const getPost = async () => {
    const response = await fetch('http://localhost:3001/posts', {
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
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      },
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

  // useMemo(() => {
  //   if (isProfile) {
  //     getUserPost();
  //   } else {
  //     getPost();
  //   }
  // }, []);

  // useCallback(() => getPost(), [posts]);

  // useMemo(() => first, [second]);
  // // useEffect(()=>{

  // // },[post])

  return (
    <>
      {posts.map(
        ({
          _id,
          createdBy,
          discription,
          picturePath,
          userPicturePath,
          like,
          Comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={createdBy._id}
            name={createdBy.username}
            discription={discription}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={like}
            comments={Comments}
            isProfile={isProfile}
          />
        ),
      )}
    </>
  );
}

export default memo(PostsWidget);
