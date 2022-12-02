import React from 'react';

import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  EmailOutlined,
} from '@mui/icons-material';
import { Box, Typography, Divider, useTheme } from '@mui/material';
import UserImage from '../../../components/userProfilePIcture.jsx';
import FlexBetween from '../../../components/FlexBetween';
import WidgetWrapper from '../../../components/WindgetWrapper.jsx';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserWidget = ({ userId, profilePicture }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  //    fetching the user data

  const getUserDetails = async () => {
    const response = await fetch(`http://localhost:3001/user/${userId}`, {
      method: 'GET',
      // headers:{Authorization: `Bearer ${token}`}
    });

    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  if (!user) {
    return null;
  }

  const { username, email, friends, location, posts, phone } = user;

  return (
    <WidgetWrapper>
      {/* first row */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={profilePicture} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                '&:hover': {
                  color: palette.primary.light,
                  cursor: 'pointer',
                },
              }}
            >
              {username}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />

      {/* need to add a anoter row with badges */}

      {/* second */}

      <Box p="1rem 0">

{
    location && 
     <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
}
       

        <Box display="flex" alignItems="center" gap="1rem">
          <EmailOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{email}</Typography>
        </Box>



      </Box>

      <Divider />

      {/* Third */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Total Posts</Typography>
          <Typography color={main} fontWeight="500">
            {posts ? posts.length : 0}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* fourth */}

      {/* <Box p="1rem 0">
      <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
        Social Profiles
      </Typography>

      <FlexBetween gap="1rem" mb="0.5rem">
        <FlexBetween gap="1rem">
          <img src="../assets/twitter.png" alt="twitter" />
          <Box>
            <Typography color={main} fontWeight="500">
              Twitter
            </Typography>
            <Typography color={medium}>Social Network</Typography>
          </Box>
        </FlexBetween>
        <EditOutlined sx={{ color: main }} />
      </FlexBetween>

      <FlexBetween gap="1rem">
        <FlexBetween gap="1rem">
          <img src="../assets/linkedin.png" alt="linkedin" />
          <Box>
            <Typography color={main} fontWeight="500">
              Linkedin
            </Typography>
            <Typography color={medium}>Network Platform</Typography>
          </Box>
        </FlexBetween>
        <EditOutlined sx={{ color: main }} />
      </FlexBetween>
    </Box>
 */}
    </WidgetWrapper>
  );
};

export default UserWidget;
