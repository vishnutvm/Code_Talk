/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react';
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

function Navbar({ turnoffDark, socket = null }) {
  const [search, setsearch] = useState(null);
  const [isMobile, setIsmobile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [open, setopen] = useState(false);
  const [notifications, setNotifications] = useState(new Set());
  const [isOpenNotification, setOpenNotification] = useState(false);
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

  const addNotification = (notification) => {
    console.log('bugfoud', notifications);
    setNotifications((prev) => new Set([...prev, notification]));
  };

  // const removeNotification = (notification) => {
  //   setNotifications(new Set(notifications).delete(notification));
  // };
  // useeffect for notification
  useEffect(() => {
    console.log(socket);
    // socket.on()
    if (socket && socket.current) {
      socket.current.on('getNotification', (data) => {
        console.log(data);
        // checking what type of notification

        addNotification(data);
      });
    }
  }, []);
  console.log(notifications);
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
            {/* <IconButton onClick={() => navigate('/video')}>
              <Badge color="warning">
                {theme.palette.mode === 'dark' ? (
                  <VideocamRounded
                    sx={{ fontsize: '30px', color: 'primary' }}
                  />
                ) : (
                  <VideocamRounded sx={{ fontsize: '30px', color: 'black' }} />
                )}
              </Badge>
            </IconButton> */}

            <IconButton onClick={() => navigate('/chat')}>
              <Badge color="warning">
                {theme.palette.mode === 'dark' ? (
                  <TextsmsRounded sx={{ fontsize: '25px', color: 'primary' }} />
                ) : (
                  <TextsmsRounded sx={{ fontsize: '25px', color: 'black' }} />
                )}
              </Badge>
            </IconButton>
            <div className="div ">
              <IconButton
                onClick={() => setOpenNotification(!isOpenNotification)}
              >
                <Badge badgeContent={notifications.size} color="warning">
                  {theme.palette.mode === 'dark' ? (
                    <Notifications
                      sx={{ fontsize: '25px', color: 'primary' }}
                    />
                  ) : (
                    <Notifications sx={{ fontsize: '25px', color: 'black' }} />
                  )}
                </Badge>
              </IconButton>

              {/* notification container */}
              {true && (
                <div className="notificationDropDown absolute right-20 z-40">
                  <div
                    id="toast-notification"
                    className="w-full max-w-xs p-4 text-gray-900 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-300"
                    role="alert"
                  >
                    <div className="flex items-center mb-3">
                      <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                        New notifications
                      </span>
                      <button
                        onClick={() => setOpenNotification(false)}
                        type="button"
                        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                        data-dismiss-target="#toast-notification"
                        aria-label="Close"
                      >
                        <span className="sr-only">Close</span>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="notifications flex flex-col gap-2">
                      {/* loop throught the notification */}

                      {[...notifications].map((data, index) => (
                        <div className="flex items-center" key={index}>
                          <div className="relative inline-block shrink-0">
                            <img
                              className="w-12 h-12 rounded-full"
                              src="https://codtalk.s3.ap-northeast-1.amazonaws.com/png-clipart-computer-icons-user-profile-female-symbol-miscellaneous-purple.png"
                              alt="Jese Leos "
                            />
                            <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
                              <svg
                                aria-hidden="true"
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="sr-only">Message icon</span>
                            </span>
                          </div>
                          <div className="ml-3 text-sm font-normal">
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {data?.senderName}
                            </div>
                            <div className="text-sm font-normal">
                              {data?.msg}
                            </div>
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-500">
                              a few seconds ago
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

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
              {/* <IconButton onClick={() => navigate('/video')}>
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
              </IconButton> */}

              {/* <Badge badgeContent={4} color="warning"> */}
              <Badge color="warning">
                <TextsmsRounded
                  onClick={() => navigate('/chat')}
                  sx={{ fontsize: '25px' }}
                />
              </Badge>
              <div className="div">
                <IconButton
                  onClick={() => setOpenNotification(!isOpenNotification)}
                >
                  <Badge badgeContent={notifications.size} color="warning">
                    {theme.palette.mode === 'dark' ? (
                      <Notifications
                        sx={{ fontsize: '25px', color: 'primary' }}
                      />
                    ) : (
                      <Notifications
                        sx={{ fontsize: '25px', color: 'black' }}
                      />
                    )}
                  </Badge>
                </IconButton>

                {/* notification container */}
              </div>

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
