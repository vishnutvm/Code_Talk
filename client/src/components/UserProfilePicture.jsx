import { Avatar } from '@mui/material';

// eslint-disable-next-line react/prop-types, no-unused-vars
function UserImage({ imagePath, size = '60px' }) {
  return (
    <Avatar
      sx={{ width: `${size}`, height: `${size}` }}
      alt="Remy Sharp"
      src={imagePath && imagePath}
    />
  );
}

export default UserImage;
