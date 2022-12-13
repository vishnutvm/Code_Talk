import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

import { useSelector } from 'react-redux';
import EditFrom from '../../../components/EditFrom';
import Navbar from '../navbar';

function ProfileEditPage() {
  const theme = useTheme();
  const isNotMobileScreen = useMediaQuery('(min-width:1000px)');
  const user = useSelector((state) => state.user.user);
  console.log(user);
  return (
    <Box>
      <Navbar />

      <Box
        width={isNotMobileScreen ? '50%' : '93%'}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          textTransform="uppercase"
          textAlign="center"
          fontWeight="500"
          variant="h5"
          sx={{ mb: '1.5rem' }}
        >
          {`Welcome to profile edit ${user.username}`}
        </Typography>
        <EditFrom />
      </Box>
    </Box>
  );
}

export default ProfileEditPage;
