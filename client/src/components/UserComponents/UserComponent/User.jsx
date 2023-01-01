/* eslint-disable no-unused-vars */
import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  EmailOutlined,
  PersonRemoveOutlined,
  PersonAddOutlined,
  EditOutlined,
  CallOutlined,
} from '@mui/icons-material';
import { Box, Typography, Divider, useTheme, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { headers } from '../../../constants/constants';
import { AiFillLinkedin, AiOutlineGithub } from 'react-icons/ai';

import UserImage from '../UserProfileComponent/UserProfilePicture';
import FlexBetween from '../FlexBetweenHelperComponent/FlexBetween';
import WidgetWrapper from '../WidgetWrapperHelperComponent/WindgetWrapper';
import { setFriends } from '../../../redux/userState';
// axios
import axios from '../../../utils/axios';
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
  // hearder with token
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get(`/user/${userId}`, headers);
      setUser(response.data);
      console.log(response);
      console.log('going to get user detals');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (_id !== userId) {
      getUserDetails();
    }
  }, []);

  if (_id === userId) {
    user = currentUser;
  }

  if (!user) {
    console.log('no user');
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
    linkdin,
    github,
    badges,
  } = user;
  const allBadges = badges.filter((item, i) => badges.indexOf(item) === i);
  console.log(allBadges);
  console.log(user);
  const patchFriend = async () => {
    try {
      const response = await axios.patch(`/user/${_id}/${userId}`, headers);

      // const data = await response.json();

      dispatch(setFriends({ friends: response.data }));
    } catch (error) {
      console.log(error);
    }
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

      {allBadges && allBadges.length !== 0 && (
        <div className="div">
          <Divider />

          <div className="flex flex-col text-center">
            <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
              Badges
            </Typography>

            <div className="pb-3 flex flex-wrap gap-2 justify-center">
              {allBadges.map((bdg, i) => (
                <span
                  key={`${bdg + i}`}
                  className="  rounded-lg bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5  dark:bg-gray-700 dark:text-gray-300"
                >
                  {bdg}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* second */}
      <Divider />
      <Box p="1rem 0" display="flex" flexDirection="column" gap="1rem">
        {location && (
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
        )}

        {email && (
          <Box display="flex" alignItems="center" gap="1rem">
            <EmailOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{email}</Typography>
          </Box>
        )}

        {phone && (
          <Box display="flex" alignItems="center" gap="1rem">
            <CallOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{phone}</Typography>
          </Box>
        )}
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

      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        {github && (
          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <AiOutlineGithub size="30px" />

              {/* <img src={githubImg} alt="twitter" /> */}
              <Box>
                <a href={github} target="_black">
                  <Typography color={main} fontWeight="500">
                    Github
                  </Typography>
                </a>

                <Typography color={medium}>{username}</Typography>
              </Box>
            </FlexBetween>

            {/* <EditOutlined sx={{ color: main }} /> */}
          </FlexBetween>
        )}

        {linkdin && (
          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">
              <AiFillLinkedin size="30px" />
              {/* <img src={linkdinImg} alt="linkedin" /> */}
              <Box>
                <a href={linkdin} target="_black">
                  <Typography color={main} fontWeight="500">
                    Linkdin
                  </Typography>
                </a>

                <Typography color={medium}>{username}</Typography>
              </Box>
            </FlexBetween>
            {/* <EditOutlined sx={{ color: main }} /> */}
          </FlexBetween>
        )}
      </Box>
    </WidgetWrapper>
  );
}

export default UserWidget;
