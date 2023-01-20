/* eslint-disable react/prop-types */
import { React, useState } from 'react';
// import VideoChatOutlinedIcon from '@mui/icons-material/VideoChatOutlined';
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  MenuItem,
  useTheme,
  useMediaQuery,
  Badge,
  Avatar,
  Menu,
} from '@mui/material';
import {
  Search,
  DarkMode,
  LightMode,
  Notifications,
  Close,
  VideocamRounded,
  TextsmsRounded,
  Menu as MenuIcon,
} from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { setMode } from '../../../redux/modeState';
import { setLogout } from '../../../redux/userState';
import FlexBetween from '../../../components/UserComponents/FlexBetweenHelperComponent/FlexBetween';
import { baseUrl } from '../../../constants/constants';
import 'react-toastify/dist/ReactToastify.css';

function Navbar({ turnoffDark }) {
  const [search, setsearch] = useState(null);
  const [isMobile, setIsmobile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [open, setopen] = useState(false);

  // console.log(user);
  const isNotMobileScreen = useMediaQuery('(min-width:1000px)');
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const { dark } = theme.palette.neutral;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const { alt } = theme.palette.background;
  const { username, profilePicture, _id } = user;
  const ErrNotify = (message) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
    });
  };

  const getUserProfile = () => {
    // const formData = new FormData();
    // formData.append('username', username);
    console.log(search);

    axios({
      method: 'POST',
      url: `${baseUrl}/user/searchuser`,
      data: {
        username: search,
      },
    })
      .then((data) => {
        console.log(data.data);

        navigate(`/profile/${data.data._id}`);
      })
      .catch((err) => {
        ErrNotify('User not found');
        console.log(err);
      });
  };
  // managing error

  return (
    <>
      {' '}
      <ToastContainer />
      <FlexBetween padding="1rem 2rem" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem,2rem,2.25rem)"
            color="primary"
            onClick={() => navigate('/home')}
            sx={{
              '&:hover': {
                color: primaryLight,
                cursor: 'pointer',
              },
            }}
          >
            CodeTalk
          </Typography>
          {isNotMobileScreen && (
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
            >
              <InputBase
                onChange={(e) => setsearch(e.target.value)}
                value={search}
                placeholder="Search profile ..."
              />
              <IconButton>
                <Search onClick={() => getUserProfile()} />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>

        {/* Desktop */}

        {isNotMobileScreen ? (
          <FlexBetween gap="2rem">
            <IconButton onClick={() => navigate('/video')}>
              <Badge color="warning">
                {theme.palette.mode === 'dark' ? (
                  <VideocamRounded
                    sx={{ fontsize: '30px', color: 'primary' }}
                  />
                ) : (
                  <VideocamRounded sx={{ fontsize: '30px', color: 'black' }} />
                )}
              </Badge>
            </IconButton>

            <IconButton onClick={() => navigate('/chat')}>
              <Badge color="warning">
                {theme.palette.mode === 'dark' ? (
                  <TextsmsRounded sx={{ fontsize: '25px', color: 'primary' }} />
                ) : (
                  <TextsmsRounded sx={{ fontsize: '25px', color: 'black' }} />
                )}
              </Badge>
            </IconButton>

            {/* <Badge color="warning">
              <Notifications sx={{ fontSize: '25px' }} />
            </Badge> */}
            {!turnoffDark && (
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === 'dark' ? (
                  <DarkMode sx={{ fontsize: '25px' }} />
                ) : (
                  <LightMode sx={{ color: dark, fontsize: '25px' }} />
                )}
              </IconButton>
            )}

            <Avatar
              sx={{ width: 45, height: 45 }}
              alt={username}
              src={`${profilePicture}`}
              onClick={() => setopen(true)}
            />

            {
              <Menu
                sx={{ marginTop: '50px', marginRight: '30px' }}
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                open={open}
                onClose={() => setopen(false)}
                // onClose={setopen(false)}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem
                  onClick={() => navigate(`/profile/${_id}`)}
                  sx={{ fontWeight: '600', textAlign: 'center' }}
                >
                  {username}
                </MenuItem>
                <MenuItem onClick={() => navigate('/editProfile')}>
                  Edit Profile
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Logout
                </MenuItem>
              </Menu>
            }
          </FlexBetween>
        ) : (
          <IconButton onClick={() => setIsmobile(!isMobile)}>
            <MenuIcon />
          </IconButton>
        )}
        {/* mobile view */}

        {!isNotMobileScreen && isMobile && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}
          >
            {/* close icon */}

            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton onClick={() => setIsmobile(!isMobile)}>
                <Close />
              </IconButton>
            </Box>

            {/* menu items */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <IconButton onClick={() => navigate('/video')}>
                <Badge color="warning">
                  {theme.palette.mode === 'dark' ? (
                    <VideocamRounded
                      sx={{ fontsize: '30px', color: 'primary' }}
                    />
                  ) : (
                    <VideocamRounded
                      sx={{ fontsize: '30px', color: 'black' }}
                    />
                  )}
                </Badge>
              </IconButton>

              {/* <Badge badgeContent={4} color="warning"> */}
              <Badge color="warning">
                <TextsmsRounded
                  onClick={() => navigate('/chat')}
                  sx={{ fontsize: '25px' }}
                />
              </Badge>
              {/* <Badge color="warning">
                <Notifications sx={{ fontSize: '25px' }} />
              </Badge> */}

              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === 'dark' ? (
                  <DarkMode sx={{ fontsize: '25px' }} />
                ) : (
                  <LightMode sx={{ color: dark, fontsize: '25px' }} />
                )}
              </IconButton>

              <div>
                <Avatar
                  sx={{ width: 45, height: 45 }}
                  alt={username}
                  src={profilePicture}
                  onClick={() => setopen(true)}
                />

                {
                  <Box>
                    <Menu
                      sx={{ top: '40%' }}
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      open={open}
                      onClose={() => setopen(false)}
                      // onClose={setopen(false)}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        horizontal: 'left',
                      }}
                    >
                      <MenuItem
                        onClick={() => navigate(`/profile/${_id}`)}
                        sx={{ fontWeight: '600', textAlign: 'center' }}
                      >
                        {username}
                      </MenuItem>
                      <MenuItem onClick={() => navigate('/editProfile')}>
                        Edit Profile
                      </MenuItem>
                      <MenuItem onClick={() => dispatch(setLogout())}>
                        Logout
                      </MenuItem>
                    </Menu>
                  </Box>
                }
              </div>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    </>
  );
}

export default Navbar;
