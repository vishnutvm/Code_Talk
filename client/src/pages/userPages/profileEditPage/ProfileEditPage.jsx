import React from 'react';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import EditFrom from '../../../components/EditFrom';
import Navbar from '../navbar';

function ProfileEditPage() {
  const theme = useTheme();
  const isNotMobileScreen = useMediaQuery('(min-width:1000px)');
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
        <Typography fontWeight="500" variant="h5" sx={{ mb: '1.5rem' }}>
          {/* Welcome to Socipedia, the Social Media for Sociopaths! */}
        </Typography>
        <EditFrom />
      </Box>
    </Box>
  );
}

export default ProfileEditPage;
