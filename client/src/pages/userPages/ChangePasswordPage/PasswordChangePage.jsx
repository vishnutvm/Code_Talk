import React from 'react';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { Typography, useMediaQuery, useTheme } from '@mui/material';

import Navbar from '../navbar';
import PasswordChange from '../../../components/UserComponents/PasswordChangeCompnent/PasswordChange';

function PasswordChangePage() {
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
          {`Welcome to Password edit ${user.username}`}
        </Typography>
        <PasswordChange />
      </Box>
    </Box>
  );
}

export default PasswordChangePage;
