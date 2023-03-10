import { Avatar } from '@mui/material';
import { baseUrl } from '../../../constants/constants';
// import { baseUrl } from '../constants/constants';
// eslint-disable-next-line react/prop-types, no-unused-vars
function UserImage({ imagePath, size = '60px' }) {
  return (
    <Avatar
      sx={{ width: `${size}`, height: `${size}` }}
      alt=""
      src={`${imagePath}`}
    />
  );
}

export default UserImage;
