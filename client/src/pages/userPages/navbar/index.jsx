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
import { setMode } from '../../../redux/modeState';
import { setLogout } from '../../../redux/userState';
import FlexBetween from '../../../components/UserComponents/FlexBetweenHelperComponent/FlexBetween';
import { baseUrl } from '../../../constants/constants';
function Navbar({ turnoffDark }) {
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

  // managing error
  const { username, profilePicture, _id } = user;
  //  let username = "vishnu"
  // console.log(username);
  // console.log(user);
  return (
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
            <InputBase placeholder="Search profile ..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* Desktop */}

      {isNotMobileScreen ? (
        <FlexBetween gap="2rem">
          <VideocamRounded sx={{ fontSize: '25px' }} />
          <IconButton onClick={() => navigate('/chat')}>
            <Badge badgeContent={4} color="warning">
              {theme.palette.mode === 'dark' ? (
                <TextsmsRounded sx={{ fontsize: '25px', color: 'primary' }} />
              ) : (
                <TextsmsRounded sx={{ fontsize: '25px', color: 'black' }} />
              )}
            </Badge>
          </IconButton>

          {/* <Message sx={{ fontSize: '25px' }} /> */}
          {/* <Notifications sx={{ fontSize: '25px' }} /> */}

          <Badge badgeContent={1} color="warning">
            <Notifications sx={{ fontSize: '25px' }} />
          </Badge>
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
            src={`${baseUrl}/assets/${profilePicture}`}
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
              <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
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
            <VideocamRounded sx={{ fontSize: '25px' }} />
            <Badge badgeContent={4} color="warning">
              <TextsmsRounded
                onClick={() => navigate('/chat')}
                sx={{ fontsize: '25px' }}
              />
            </Badge>
            <Badge badgeContent={1} color="warning">
              <Notifications sx={{ fontSize: '25px' }} />
            </Badge>

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
  );
}

export default Navbar;
