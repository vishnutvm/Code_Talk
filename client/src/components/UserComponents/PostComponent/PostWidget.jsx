/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useState, Fragment } from 'react';
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
// import { useNavigate } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import FlexBetween from '../FlexBetweenHelperComponent/FlexBetween';
import Friend from '../FriendComponent/Friend';
import WidgetWrapper from '../WidgetWrapperHelperComponent/WindgetWrapper';
import { setPost, deletePost } from '../../../redux/userState';
import CreatePost from '../CreatePostComponent/CreatePost';
import { baseUrl } from '../../../constants/constants';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function PostWidget({
  postId,
  postUserId,
  name,
  discription,
  picturePath,
  likes,
  comments,
  isProfile,
  userPicturePath,
}) {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user.user._id);
  // const isLiked = Boolean(likes[loggedInUserId]);
  // const likeCount = Object.keys(likes).length;

  const token = useSelector((state) => state.user.token);
  const { palette } = useTheme();
  const primary = palette.primary.medium;
  const { main } = palette.neutral;
  const [isLiked, setIsLiked] = useState(Boolean(likes[loggedInUserId]));
  const [likeCount, setlikeCount] = useState(Object.keys(likes).length);
  const curUserId = useSelector((state) => state.user.user._id);
  const [edit, setedit] = useState(null);

  const patchLike = async () => {
    const response = await fetch(`${baseUrl}/posts/${postId}/like`, {
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

  // delete the post
  const deleteThePost = async () => {
    console.log('called delete post');
    axios({
      method: 'DELETE',
      url: `${baseUrl}/posts/${postId}/delete`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log(response.data);
      dispatch(deletePost({ id: postId }));
    });
  };

  const editThePost = () => {
    setedit(true);
  };
  if (edit) {
    return <CreatePost profilePicture={userPicturePath} postId={postId} />;
  }
  return (
    <WidgetWrapper m="2rem 1rem">
      <div className="relative">
        <Friend
          friendId={postUserId}
          username={name}
          userPicturePath={userPicturePath}
          isProfile={isProfile}
        />
        {/* edit/delete icons */}

        {curUserId === postUserId && (
          // <div className="div w-full flex justify-end align-middle">
          <div className="absolute top-2 right-2">
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-1  origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                        onClick={editThePost}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                        onClick={deleteThePost}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        )}
      </div>

      <Typography color={main} sx={{ mt: '1rem' }}>
        {discription}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={`${baseUrl}/assets/${picturePath}`}
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

        {/* {curUserId === postUserId && (
          <FlexBetween gap="0.7rem">
            <IconButton onClick={editThePost}>
              <EditOutlined />
            </IconButton>
            <IconButton onClick={deleteThePost}>
              <DeleteOutline />
            </IconButton>
          </FlexBetween>
        )} */}
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
