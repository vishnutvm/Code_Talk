import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../navbar';
import UserWidget from '../widgets/UserWidget';
import CreatePost from  '../widgets/CreatePost'
import PostsWidget from '../widgets/PostsWidget';
const HomePage = () => {
  const isNotMobileScreen = useMediaQuery('(min-width:1000px)');
  // const {_id,picturePath} = useSelector((state)=>state.user)
  const { _id } = useSelector((state) => state.user);

  // presetting the user image
  const picturePath =
    'https://res.cloudinary.com/demo/image/twitter_name/BillClinton.jpg';

  return (
    <>
      <Box>
        <Navbar />
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNotMobileScreen ? 'flex' : 'block'}
          gap="0.5rem"
          justifyContent="space-between"
        >
          
          <Box flexBasis={isNotMobileScreen ? '26px' : undefined}>
            <UserWidget userId={_id} picturePath={picturePath} />
          </Box>

          <Box
            flexBasis={isNotMobileScreen ? '42%' : undefined}
            mt={isNotMobileScreen ? undefined : '2rem'}
          >
            <CreatePost picturePath={picturePath} />
          <PostsWidget userId={_id} />
          </Box>
          {isNotMobileScreen && (
            <Box flexBasis="26%">
              {/* <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} /> */}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
