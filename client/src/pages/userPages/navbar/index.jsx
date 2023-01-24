/* eslint-disable max-len */
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
    setNotifications((prev) => new Set([notification, ...prev]));
  };

  const clearNotification = () => {
    console.log('clear call');
    axios({
      method: 'PATCH',
      url: `${baseUrl}/user/clearNotification`,
      data: {
        userId: _id,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // clear the state and change the read bool in db

    setNotifications(new Set());
  };
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

  const getNotification = () => {
    console.log('getting notification');
    axios({
      method: 'POST',
      url: `${baseUrl}/user/getNotification`,
      data: {
        userId: _id,
      },
    }).then((res) => {
      console.log(notifications);
      if (res.data[0]) {
        setNotifications(() => new Set([...res.data[0].message]));
        console.log(res.data[0].message);
      }
    });
  };

  useEffect(() => {
    getNotification();
  }, []);

  console.log(notifications);
  const getUserProfile = () => {
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
              {isOpenNotification && notifications.size > 0 && (
                <div className="notificationDropDown absolute right-20 z-40  ">
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
                        onClick={() => {
                          setOpenNotification(false);
                          clearNotification();
                        }}
                        type="button"
                        className=" ml-auto py-1.5 px-5 mr-2 mb-2 text-xm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="notifications flex flex-col gap-2  max-h-[30vh]	overflow-scroll	 ">
                      {/* loop throught the notification */}

                      {[...notifications].map((data, index) => (
                        <div className="flex items-center  " key={index}>
                          <div className="relative inline-block shrink-0">
                            <img
                              className="w-12 h-12 rounded-full"
                              src={data.senderImage}
                              alt="profile "
                            />
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
                      <Notifications
                        sx={{ fontsize: '25px', color: 'black' }}
                      />
                    )}
                  </Badge>
                </IconButton>

                {/* notification container */}
                {isOpenNotification && notifications.size > 0 && (
                  <div className="notificationDropDown absolute right-2 left-2 z-40">
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
                          onClick={() => {
                            setOpenNotification(false);
                            clearNotification();
                          }}
                          type="button"
                          className=" ml-auto py-1.5 px-5 mr-2 mb-2 text-xm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="notifications flex flex-col gap-2  max-h-[30vh]	overflow-scroll">
                        {/* loop throught the notification */}

                        {[...notifications].map((data, index) => (
                          <div className="flex items-center  " key={index}>
                            <div className="relative inline-block shrink-0">
                              <img
                                className="w-12 h-12 rounded-full"
                                src={data.senderImage}
                                alt="profile "
                              />
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
