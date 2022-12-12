/* eslint-disable react/jsx-props-no-spreading */

import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from '@mui/material';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik } from 'formik';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editUserSchema } from '../formSchemas/index';
import FlexBetween from './FlexBetween';
// import { updateUser } from '../redux/userState';

// const initialValuesEdit = {
//   username: '',
//   email: '',
//   password: '',
//   phone: '',
//   location: '',
//   picture: '',
// };

function EditFrom() {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const { palette } = useTheme();
  const navigate = useNavigate();
  // const navigate = useNavigate();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const id = user._id;
  const handleFormSubmit = async (values) => {
    const res = fetch(`http://localhost:3001/edituser/${id}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: values,
    })
      .then((response) => response.json())
      .then((data) => {
        const posts = data;
        console.log(posts);
        // dispatch(updateUser({ posts }));
        // reset the state
        // setImage(null);
        // setPost('');
        // setEditing(null);
        // setclose(true);
        navigate('/');
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const initialValuesEdit = {
    username: user.username ? user.username : '',
    email: user.email ? user.email : '',
    phone: user.phone ? user.phone : '',
    location: user.location ? user.location : '',
    picture: user.picture ? user.picture : '',
    linkdin: user.lindin ? user.linkdin : '',
    github: user.github ? user.github : '',
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesEdit}
      validationSchema={editUserSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
            }}
          >
            <Box
              gridColumn="span 4"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => setFieldValue('picture', acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                  >
                    <input {...getInputProps()} />
                    {!values.picture ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.picture.name}</Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>
            <TextField
              label="username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              name="username"
              error={Boolean(touched.username) && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              sx={{ gridColumn: 'span 2' }}
            />
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: 'span 4' }}
            />
            <TextField
              label="Phone"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phone}
              name="phone"
              error={Boolean(touched.phone) && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
              sx={{ gridColumn: 'span 4' }}
            />

            <TextField
              label="Location"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.location}
              name="location"
              error={Boolean(touched.location) && Boolean(errors.location)}
              helperText={touched.location && errors.location}
              sx={{ gridColumn: 'span 4' }}
            />
            <TextField
              label="Linkdin profile"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.linkdin}
              name="linkdin"
              error={Boolean(touched.linkdin) && Boolean(errors.linkdin)}
              helperText={touched.linkdin && errors.linkdin}
              sx={{ gridColumn: 'span 4' }}
            />
            <TextField
              label="Github profile"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.github}
              name="github"
              error={Boolean(touched.github) && Boolean(errors.github)}
              helperText={touched.github && errors.github}
              sx={{ gridColumn: 'span 4' }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': { color: palette.primary.main },
              }}
            >
              UPDATE
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default EditFrom;
