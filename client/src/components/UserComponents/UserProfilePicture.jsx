import { Avatar } from '@mui/material';
import { baseUrl } from '../../constants/constants';
// import { baseUrl } from '../constants/constants';
// eslint-disable-next-line react/prop-types, no-unused-vars
function UserImage({ imagePath, size = '60px' }) {
  console.log(imagePath);
  return (
    <Avatar
      sx={{ width: `${size}`, height: `${size}` }}
      alt=""
      src={`${baseUrl}/assets/${imagePath}`}
    />
  );
}

export default UserImage;
