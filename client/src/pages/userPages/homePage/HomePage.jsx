/* eslint-disable react/prop-types */
import { Box, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../navbar';
import UserWidget from '../../../components/UserComponents/UserComponent/User';
import CreatePost from '../../../components/UserComponents/CreatePostComponent/CreatePost';
import PostsWidget from '../../../components/UserComponents/PostsComponent/PostsWidget';
import FriendsListWidgest from '../../../components/UserComponents/FriendsListComponent/FriendsListWidgest';
import QuizWidget from '../../../components/UserComponents/QuizWidget/QuizWidget';
import LoadingPage from '../../LoadingPage/LoadingPage';

// test
function HomePage({ socket }) {
  const isNotMobileScreen = useMediaQuery('(min-width:1000px)');
  const [loading, setloading] = useState(false);
  const { _id, profilePicture } = useSelector((state) => state.user.user);

  useEffect(() => {
    // setting online users to socket
    const userId = _id;
    if (socket && socket.current) {
      socket.current.emit('add-user', userId);
    }
  }, [socket]);

  return (
    <Box>
      <Navbar socket={socket} />
      {loading ? (
        <LoadingPage />
      ) : (
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
            <CreatePost
              profilePicture={profilePicture}
              setloading={setloading}
            />
            <PostsWidget socket={socket} userId={_id} setloading={setloading} />
          </Box>

          {isNotMobileScreen && (
            <Box className="mb-3 w-1/5">
              <Box flexBasis="26%" className="mb-3">
                <QuizWidget />
              </Box>

              <Box flexBasis="26%">
                <FriendsListWidgest userId={_id} />
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default HomePage;
