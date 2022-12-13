import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMediaQuery, Box } from '@mui/material';
import Navbar from '../navbar';
import FriendsListWidgest from '../widgets/FriendsListWidgest';
import CreatePost from '../widgets/CreatePost';
import PostsWidget from '../widgets/PostsWidget';
import UserWidget from '../widgets/UserWidget';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.user.token);

  const isNotMobileScreen = useMediaQuery('(min-width:1000px)');

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/user/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
    console.log('user posts', data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNotMobileScreen ? 'flex' : 'block'}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNotMobileScreen ? '26%' : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendsListWidgest userId={userId} isProfile />
        </Box>
        <Box
          flexBasis={isNotMobileScreen ? '42%' : undefined}
          mt={isNotMobileScreen ? undefined : '2rem'}
        >
          <CreatePost picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
}

export default ProfilePage;
