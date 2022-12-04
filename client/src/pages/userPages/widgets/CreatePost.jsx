import {
  EditOutlined,
  DeleteOutlined,
  VideocamOutlined,
  ImageOutlined,
  MoreHorizOutlined,
} from '@mui/icons-material';

import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from '@mui/material';

// drop down

import Dropzone from 'react-dropzone';
import UserImage from '../../../components/userProfilePIcture';
import FlexBetween from '../../../components/FlexBetween';
import WidgetWrapper from '../../../components/WindgetWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPosts } from '../../../redux/userState';

const CreatePost = ({ postImgPath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState('');
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNotMobileScreen = useMediaQuery('(min-width:1000px)');
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append('userId', _id);
    formData.append('discription', post);
    if (image) {
      formData.append('picture', image);
      formData.append('picturePath', image.name);
    }
    console.log(formData, '');
    const response = await fetch(`http://localhost:3001/createPost`, {
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

  // useEffect(() => {
  //   console.log(post);
  // }, [post]);

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={postImgPath} />
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
                      <Typography>{image.name}</Typography>
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
};

export default CreatePost;
