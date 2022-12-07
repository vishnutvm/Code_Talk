/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  // ShareOutlined,
  EditOutlined,
  DeleteOutline,
} from '@mui/icons-material';
import axios from 'axios';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import FlexBetween from '../../../components/FlexBetween';
import Friend from '../../../components/Friend';
import WidgetWrapper from '../../../components/WindgetWrapper';
import { setPost, deletePost } from '../../../redux/userState';

function PostWidget({
  postId,
  postUserId,
  name,
  discription,
  picturePath,
  likes,
  comments,
  isProfile,
}) {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user._id);
  // const isLiked = Boolean(likes[loggedInUserId]);
  // const likeCount = Object.keys(likes).length;

  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const primary = palette.primary.medium;
  const { main } = palette.neutral;
  const [isLiked, setIsLiked] = useState(Boolean(likes[loggedInUserId]));
  const [likeCount, setlikeCount] = useState(Object.keys(likes).length);
  const curUserId = useSelector((state) => state.user._id);

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setlikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    setIsLiked(!isLiked);
  };

  const deleteThePost = async () => {
    console.log('called delete post');
    axios({
      method: 'DELETE',
      url: `http://localhost:3001/posts/${postId}/delete`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log(response.data);
      dispatch(deletePost({ id: postId }));
    });
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        username={name}
        profilePicture={picturePath}
        isProfile={isProfile}
      />
      <Typography color={main} sx={{ mt: '1rem' }}>
        {discription}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        {/* <ShareOutlined /> */}

        {curUserId === postUserId && (
          <FlexBetween gap="0.7rem">
            <IconButton>
              <EditOutlined />
            </IconButton>
            <IconButton onClick={deleteThePost}>
              <DeleteOutline />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment) => (
            <Box key={`${name}-${name}`}>
              <Divider />
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
}

export default PostWidget;
