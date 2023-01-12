import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useMediaQuery, Box } from '@mui/material';
import Navbar from '../navbar';
import FriendsListWidgest from '../../../components/UserComponents/FriendsListComponent/FriendsListWidgest';
import CreatePost from '../../../components/UserComponents/CreatePostComponent/CreatePost';
import PostsWidget from '../../../components/UserComponents/PostsComponent/PostsWidget';
import UserWidget from '../../../components/UserComponents/UserComponent/User';
import ProfileSettings from '../../../components/UserComponents/ProfileSettings/ProfileSettings';
import { baseUrl } from '../../../constants/constants';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.user.token);
  const { _id, isgoogle = false } = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);

  const isNotMobileScreen = useMediaQuery('(min-width:1000px)');

  const getUser = async () => {
    fetch(`${baseUrl}/user/${userId}`, {
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
  setTimeout(() => {
    setloading(false);
  }, 500);
  if (!user) {
    return null;
  }

  return (
    <Box>
      <Navbar />

      {loading ? (
        <div role="status" className="max-w-md animate-pulse m-auto">
          <img src="https://i.stack.imgur.com/hzk6C.gif" alt="" />
        </div>
      ) : (
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
            {!isNotMobileScreen && userId === _id && (
              <Box m="2rem 0">
                <ProfileSettings />
              </Box>
            )}
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
          {isNotMobileScreen && userId === _id && !isgoogle && (
            <Box>
              <ProfileSettings />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default ProfilePage;
