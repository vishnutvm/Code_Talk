/* eslint-disable no-unused-vars */
import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  EmailOutlined,
  PersonRemoveOutlined,
  PersonAddOutlined,
} from '@mui/icons-material';
import { Box, Typography, Divider, useTheme, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserImage from '../../../components/UserProfilePicture';
import FlexBetween from '../../../components/FlexBetween';
import WidgetWrapper from '../../../components/WindgetWrapper';
import { setFriends } from '../../../redux/userState';
// eslint-disable-next-line react/prop-types
function UserWidget({ userId, profilePicture }) {
  console.log(profilePicture);
  // eslint-disable-next-line prefer-const
  let [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const { dark } = palette.neutral;
  const { medium } = palette.neutral;
  const { main } = palette.neutral;
  const { _id } = useSelector((state) => state.user.user);
  const currentUser = useSelector((state) => state.user.user);
  const currentUserFriendList = useSelector((state) => state.user.user.friends);
  const dispatch = useDispatch();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const isFriend = currentUserFriendList.find(
    (friend) => friend._id === userId,
  );

  //    fetching the user data

  const getUserDetails = async () => {
    const response = await fetch(`http://localhost:3001/user/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setUser(data);
  };

  // useEffect(() => {
  //   getUserDetails();
  // }, []);

  useEffect(() => {
    if (_id !== userId) {
      getUserDetails();
    }
  }, []);

  if (_id === userId) {
    user = currentUser;
  }
  if (!user) {
    return null;
  }

  const {
    // eslint-disable-next-line no-unused-vars
    username,
    email,
    friends,
    location,
    posts,
    phone,
  } = user;

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/user/${_id}/${userId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <WidgetWrapper>
      {/* first row */}
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <UserImage imagePath={profilePicture} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                '&:hover': {
                  color: palette.primary.dark,
                  cursor: 'pointer',
                },
              }}
              onClick={() => navigate(`/profile/${userId}`)}
            >
              {username}
            </Typography>
            <Typography color={medium}>
              {friends.length}
              {' '}
              friends
            </Typography>
          </Box>
        </FlexBetween>
        {_id === userId && (
          <IconButton onClick={() => navigate('/editProfile')}>
            <ManageAccountsOutlined />
          </IconButton>
        )}

        {_id !== userId && (
          <IconButton
            onClick={() => patchFriend()}
            sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
          >
            {isFriend ? (
              <PersonRemoveOutlined sx={{ color: primaryDark }} />
            ) : (
              <PersonAddOutlined sx={{ color: primaryDark }} />
            )}
          </IconButton>
        )}
      </FlexBetween>
      <Divider />

      {/* need to add a anoter row with badges */}

      {/* second */}

      <Box p="1rem 0">
        {location && (
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
        )}

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
}

export default UserWidget;
