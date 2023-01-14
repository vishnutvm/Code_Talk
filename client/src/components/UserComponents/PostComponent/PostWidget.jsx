/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useState, Fragment } from 'react';
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from '@mui/icons-material';
// import axios from 'axios';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import * as moment from 'moment';

import FlexBetween from '../FlexBetweenHelperComponent/FlexBetween';
import Friend from '../FriendComponent/Friend';
import WidgetWrapper from '../WidgetWrapperHelperComponent/WindgetWrapper';
import { setPost, deletePost } from '../../../redux/userState';
import CreatePost from '../CreatePostComponent/CreatePost';
import { baseUrl } from '../../../constants/constants';
import axios from '../../../utils/axios';

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

  const [updatedComment, setupdatedComment] = useState(comments);

  const token = useSelector((state) => state.user.token);
  const { palette } = useTheme();
  const primary = palette.primary.medium;
  const { main } = palette.neutral;
  const [isLiked, setIsLiked] = useState(Boolean(likes[loggedInUserId]));
  const [likeCount, setlikeCount] = useState(Object.keys(likes).length);
  const curUserId = useSelector((state) => state.user.user._id);
  const { username, profilePicture } = useSelector((state) => state.user.user);
  // const user = useSelector((state) => state.user.user);
  const [edit, setedit] = useState(null);
  const [model, setModel] = useState(false);
  const [comment, setcomment] = useState();

  const succesNotify = (message) => {
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
    });
  };
  // const { username, profilePicture, _id } = user;

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
  const addcomment = async () => {
    console.log(comment);
    console.log('working');
    axios({
      method: 'POST',
      url: `${baseUrl}/posts/${postId}/comment`,

      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        comment,
        username,
        userprofile: profilePicture,
        // time: moment().format('MMM Do YY'),
      },
    }).then((response) => {
      setcomment('');
      setupdatedComment(response.data.Comments);
      console.log(updatedComment);
      // dispatch(setPost({ post: response.data }));

      console.log(response.data);
    });

    // const updatedPost = await response.json();
  };

  // delete the post
  const deleteThePost = async () => {
    // console.log('called delete post');
    axios({
      method: 'DELETE',
      url: `${baseUrl}/posts/${postId}/delete`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      succesNotify('Post Deleted');
      // console.log(response.data);
      dispatch(deletePost({ id: postId }));
    });
  };

  const editThePost = () => {
    setedit(true);
  };
  // const commentSubmit = () => {
  //   console.log(comment);
  //   setcomment('');
  // };

  if (edit) {
    return (
      <CreatePost
        profilePicture={userPicturePath}
        postId={postId}
        setedit={setedit}
      />
    );
  }
  return (
    <WidgetWrapper m="2rem 1rem">
      <ToastContainer />
      <div className="relative">
        <div
          tabIndex={-1}
          className={
            model
              ? 'fixed top-10 left-0 right-0 z-50  p-4  overflow-y-auto md:inset-0 h-modal md:h-full'
              : 'fixed top-0 left-0 right-0 z-50 hidden p-4  overflow-y-auto md:inset-0 h-modal md:h-full'
          }
        >
          <div className=" z-10 relative w-full h-full max-w-md md:h-auto m-auto  ">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={() => setModel(false)}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  aria-hidden="true"
                  className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this post?
                </h3>
                <button
                  onClick={() => {
                    deleteThePost();
                    setModel(false);
                  }}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setModel(false)}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
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
                          'block px-4 py-2 text-sm text-gray-700',
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
                      <button
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        )}
                        onClick={() => setModel(true)}
                        type="button"
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
                      </button>
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
            <Typography>{updatedComment.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        {/* <ShareOutlined /> */}
      </FlexBetween>
      {isComments && (
        <section className="bg-white dark:bg-gray-900 py-4 lg:py-8">
          <div className="max-w-2xl mx-auto px-4">
            <form className="mb-6">
              <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  rows={3}
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Write a comment..."
                  required=""
                  onChange={(e) => setcomment(e.target.value)}
                  value={comment}
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 bg-blue-500"
                onClick={addcomment}
              >
                Post comment
              </button>
            </form>
            {updatedComment.length
              ? updatedComment.map((comment, i) => (
                  // eslint-disable-next-line react/jsx-indent
                  <article className="p-3 mb-3 text-base bg-white rounded-lg dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                          {/* commentd user image */}
                          {comment.userprofile && (
                            <img
                              className="mr-2 w-6 h-6 rounded-full"
                              src={`${baseUrl}/assets/${comment.userprofile}`}
                              alt="Profile image"
                            />
                          )}

                          {/* commented user name */}
                          {comment.username}
                        </p>

                      </div>

                   
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">
                      {comment.comment}
                    </p>
                  </article>
              ))
              : ''}
          </div>
        </section>
      )}
    </WidgetWrapper>
  );
}

export default PostWidget;
