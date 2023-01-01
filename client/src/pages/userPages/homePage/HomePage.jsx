import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../navbar';
import UserWidget from '../../../components/UserComponents/UserComponent/User';
import CreatePost from '../../../components/UserComponents/CreatePostComponent/CreatePost';
import PostsWidget from '../../../components/UserComponents/PostsComponent/PostsWidget';
import FriendsListWidgest from '../../../components/UserComponents/FriendsListComponent/FriendsListWidgest';
import QuizWidget from '../../../components/UserComponents/QuizWidget/QuizWidget';

function HomePage() {
  const isNotMobileScreen = useMediaQuery('(min-width:1000px)');
  // const { username, profilePicture, _id } = user;
  const { _id, profilePicture } = useSelector((state) => state.user.user);
  console.log(profilePicture);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNotMobileScreen ? 'flex' : 'block'}
        gap="1rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNotMobileScreen ? '26px' : undefined}>
          <UserWidget userId={_id} profilePicture={profilePicture} />
        </Box>
        {!isNotMobileScreen && (
          <Box gap="0.5rem">
            <Box flexBasis="26%" className="my-3">
              <FriendsListWidgest userId={_id} />
            </Box>

            <Box flexBasis="26%">
              <QuizWidget />
            </Box>
          </Box>
        )}

        <Box
          flexBasis={isNotMobileScreen ? '42%' : undefined}
          mt={isNotMobileScreen ? undefined : '2rem'}
        >
          <CreatePost profilePicture={profilePicture} />
          <PostsWidget userId={_id} />
        </Box>

        {isNotMobileScreen && (
          <Box className="mb-3 w-1/5">
            <Box flexBasis="26%" className="mb-3" >
              <QuizWidget />
            </Box>

            <Box flexBasis="26%">
              <FriendsListWidgest userId={_id} />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default HomePage;
