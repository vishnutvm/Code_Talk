/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import {
  EditOutlined,
  DeleteOutlined,
  VideocamOutlined,
  ImageOutlined,
  CloseOutlined,
} from '@mui/icons-material';

import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';

// drop down

import Dropzone from 'react-dropzone';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UserImage from '../UserProfileComponent/UserProfilePicture';
import FlexBetween from '../FlexBetweenHelperComponent/FlexBetween';
import WidgetWrapper from '../WidgetWrapperHelperComponent/WindgetWrapper';
import { editPost, setPosts } from '../../../redux/userState';
import { baseUrl } from '../../../constants/constants';

// eslint-disable-next-line react/prop-types
function CreatePost({ profilePicture, postId = null }) {
  console.log('working', profilePicture);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(postId);
  const [close, setclose] = useState(null);

  // image state

  const [image, setImage] = useState(null);

  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  // const isNotMobileScreen = useMediaQuery('(min-width:1000px)');
  const { mediumMain } = palette.neutral;
  const { medium } = palette.neutral;
  const navigate = useNavigate();
  // getting the post for edit
  const editingPost = useSelector((state) => state.user.posts.find((pos) => pos._id === postId));
  console.log(editingPost);
  const [post, setPost] = useState(editingPost ? editingPost.discription : '');
  const [isImage, setIsImage] = useState(
    !!(editingPost && editingPost.picturePath),
  );
  const [editPrev, setEditprev] = useState(
    editingPost && editingPost.picturePath
      ? `http://localhost:3001/assets/${editingPost.picturePath}`
      : '',
  );
  // handle post edit
  const handleEditPost = () => {
    // need to clearn the edit componenet
    // need to update the post state
    // need to update the post state even the edit post closed

    const formData = new FormData();
    formData.append('userId', _id);
    formData.append('postId', editingPost._id);
    formData.append('discription', post);
    // if (editPrev) {
    //   console.log(editPrev);
    //   formData.append('picturePath', editingPost.picturePath);
    // }
    if (image) {
      console.log(image);
      formData.append('picture', image);
      formData.append('picturePath', image.name);
    }

    // found bug need to remove
    console.log(formData);
    const res = fetch(`${baseUrl}/posts/editPost`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const posts = data;
        dispatch(editPost({ posts }));
        // reset the state
        setImage(null);
        setPost('');
        setEditing(null);
        setclose(true);
        navigate(0);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  // handle create post
  const handlePost = async () => {
    const formData = new FormData();
    formData.append('userId', _id);
    formData.append('discription', post);
    if (image) {
      console.log(image);
      formData.append('picture', image);
      formData.append('picturePath', image.name);
    }

    console.log(formData, '');

    const res = fetch(`${baseUrl}/posts/createPost`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(formData, 'formdata');
        const posts = data;
        dispatch(setPosts({ posts }));
        // reset the state
        setImage(null);
        setPost('');
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  // editing post

  if (editing) {
    return (
      <WidgetWrapper
        m="2rem 2rem"
        sx={{ padding: '0.5rem 0.5rem 0.75rem 1.5rem' }}
      >
        <Tooltip title="cancel" arrow placement="right">
          <IconButton
            sx={{ display: 'block', marginLeft: 'auto', marginRight: '0' }}
            onClick={handleEditPost}
          >
            <CloseOutlined />
          </IconButton>
        </Tooltip>

        <FlexBetween gap="1.5rem">
          <UserImage imagePath={profilePicture} />
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: '100%',
              backgroundColor: palette.neutral.light,
              borderRadius: '2rem',
              padding: '1rem 2rem',
            }}
          />
        </FlexBetween>
        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add New Image Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{image && image.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {isImage && (
                    <IconButton
                      onClick={() => {
                        setImage(null);
                        setEditprev('');
                        setIsImage(false);
                      }}
                      sx={{ width: '15%' }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
            <Box>
              {/* need to change after edit success */}

              {image ? (
                <img
                  width="100%"
                  height="auto"
                  alt="post"
                  style={{
                    borderRadius: '0.75rem',
                    marginTop: '0.75rem',
                  }}
                  src={URL.createObjectURL(image)}
                />
              ) : (
                editPrev && (
                  <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{
                      borderRadius: '0.75rem',
                      marginTop: '0.75rem',
                    }}
                    src={editPrev && editPrev}
                  />
                )
              )}
            </Box>
          </Box>
        )}

        <Divider sx={{ margin: '1.25rem 0' }} />

        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>

          <FlexBetween gap="0.25rem">
            <VideocamOutlined sx={{ color: mediumMain }} />
            <Typography color={mediumMain}>Video</Typography>
          </FlexBetween>

          <Button
            // if there is not post value desable the button
            disabled={!post}
            // eslint-disable-next-line no-return-assign
            onClick={handleEditPost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: '3rem',
            }}
          >
            UPDATE
          </Button>
        </FlexBetween>
      </WidgetWrapper>
    );
  }
  if (!close) {
    return (
      <WidgetWrapper mb="1.2rem">
        <FlexBetween gap="1.5rem">
          <UserImage imagePath={profilePicture} />
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: '100%',
              backgroundColor: palette.neutral.light,
              borderRadius: '2rem',
              padding: '1rem 2rem',
            }}
          />
        </FlexBetween>
        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>
                          {image ? image.name : editingPost}
                        </Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: '15%' }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}

        <Divider sx={{ margin: '1.25rem 0' }} />

        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>

          <FlexBetween gap="0.25rem">
            <VideocamOutlined sx={{ color: mediumMain }} />
            <Typography color={mediumMain}>Video</Typography>
          </FlexBetween>

          <Button
            // if there is not post value desable the button
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: '3rem',
            }}
          >
            POST
          </Button>
        </FlexBetween>
      </WidgetWrapper>
    );
  }

  if (close) {
    return null;
  }

  // normal post
}

export default CreatePost;
