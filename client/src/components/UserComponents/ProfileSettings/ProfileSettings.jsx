import React, { useEffect } from 'react';
import { Divider, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
// import { useTheme } from 'styled-components';
import { useDispatch } from 'react-redux';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { useNavigate } from 'react-router-dom';
import WidgetWrapper from '../WidgetWrapperHelperComponent/WindgetWrapper';
import { setLogout } from '../../../redux/userState';

function ProfileSettings() {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <WidgetWrapper>
      <Box display="flex" flexDirection="column">
        <Box
          display="flex"
          gap="1rem"
          justifyContent="space-between"
          className="cursor-pointer"
          onClick={() => navigate('/editPassword')}
        >
          <Typography
            color={palette.neutral.dark}
            variant="h5"
            fontWeight="500"
            sx={{ mb: '1.5rem' }}
          >
            Change Password
          </Typography>
          <LockOpenOutlinedIcon />
        </Box>

        <Box
          display="flex"
          gap="1rem"
          justifyContent="space-between"
          className="cursor-pointer"
          onClick={() => navigate('/editProfile')}
        >
          <Typography
            color={palette.neutral.dark}
            variant="h5"
            fontWeight="500"
            sx={{ mb: '1.5rem' }}
          >
            Edit Profile
          </Typography>
          <ModeEditOutlineOutlinedIcon />
        </Box>
        <Box
          display="flex"
          gap="1rem"
          justifyContent="space-between"
          className="cursor-pointer"
          onClick={() => dispatch(setLogout())}
        >
          <Typography
            color={palette.neutral.dark}
            variant="h5"
            fontWeight="500"
            sx={{ mb: '1.5rem' }}
          >
            Logout
          </Typography>
          <LogoutOutlinedIcon />
        </Box>
      </Box>
    </WidgetWrapper>
  );
}

export default ProfileSettings;
