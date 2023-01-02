import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useMediaQuery, Box } from '@mui/material';
import Navbar from '../navbar';
import FriendsListWidgest from '../../../components/UserComponents/FriendsListComponent/FriendsListWidgest';
import CreatePost from '../../../components/UserComponents/CreatePostComponent/CreatePost';
import PostsWidget from '../../../components/UserComponents/PostsComponent/PostsWidget';
import UserWidget from '../../../components/UserComponents/UserComponent/User';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  const isNotMobileScreen = useMediaQuery('(min-width:1000px)');

  const getUser = async () => {
    fetch(`http://localhost:3001/user/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          navigate('*');
          console.log('error found');
        } else {
          setUser(data);
        }
        console.log('user posts', data);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <UserWidget userId={userId} profilePicture={user.profilePicture} />
          <Box m="2rem 0" />
          <FriendsListWidgest userId={userId} isProfile />
        </Box>
        <Box
          flexBasis={isNotMobileScreen ? '42%' : undefined}
          mt={isNotMobileScreen ? undefined : '2rem'}
        >
          <CreatePost profilePicture={user.profilePicture} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
}

export default ProfilePage;
