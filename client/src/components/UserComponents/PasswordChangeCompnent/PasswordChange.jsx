import { Formik } from 'formik';
import React, { useState } from 'react';
import { Box } from '@mui/system';
import { Button, TextField, useMediaQuery, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from '../../../utils/axios';
import { editPassSchema } from '../../../formSchemas';
import { useNavigate } from 'react-router-dom';
function PasswordChange() {
  const [resetErr, setresetErr] = useState(null);
  const token = useSelector((state) => state.user.token);
  const { _id } = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const handleFormSubmit = (values) => {
    if (values.newPassword === values.oldPassword) {
      console.log('matching');
      setresetErr('New password Should not same as old !');
    } else {
      console.log('not matching');
      setresetErr(null);
      axios
        .post(`/user/resetpass/${_id}`, values)
        .then((response) => {
          console.log(response);
          navigate('/');
        })
        .catch((err) => {
          console.log('err');
          setresetErr(err.response.data.error);

          console.log(err.response.data.error);
        });
      setresetErr(null);
    }
    console.log(values);
  };

  const initialValuesEditPass = {
    oldPassword: '',
    newPassword: '',
  };
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const { palette } = useTheme();

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesEditPass}
      validationSchema={editPassSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              margin: '6px 0',
            }}
          />
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
            }}
          >
            <TextField
              label="Old password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.oldPassword}
              name="oldPassword"
              error={
                Boolean(touched.oldPassword) && Boolean(errors.oldPassword)
              }
              helperText={touched.oldPassword && errors.oldPassword}
              sx={{ gridColumn: 'span 4' }}
            />
            {/* {errors.oldPassword && touched.oldPassword ? (
              <p style={{ color: 'red' }} className="form-error">
                {errors.oldPassword}
              </p>
            ) : null} */}

            <TextField
              label="New password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.newPassword}
              name="newPassword"
              error={
                Boolean(touched.newPassword) && Boolean(errors.newPassword)
              }
              helperText={touched.newPassword && errors.newPassword}
              sx={{ gridColumn: 'span 4' }}
            />
          </Box>
          <Box pt="2rem" textAlign="center">
            {resetErr ? (
              <p style={{ color: 'red' }} className="form-error">
                {resetErr}
              </p>
            ) : null}
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

export default PasswordChange;
