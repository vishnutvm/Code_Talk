import { Box } from '@mui/material';

// eslint-disable-next-line react/prop-types, no-unused-vars
function UserImage({ imagePath, size = '60px' }) {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        alt="user"
        // presetting the user image
        // src={`http://localhost:3001/assets/${image}`}
        src={imagePath}
      />
    </Box>
  );
}

export default UserImage;
