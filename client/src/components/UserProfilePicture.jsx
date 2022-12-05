import { Box } from '@mui/material';

// eslint-disable-next-line react/prop-types, no-unused-vars
function UserImage({ image, size = '60px' }) {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        alt="user"
        // presetting the user image
        // src={`http://localhost:3001/assets/${image}`}
        src="https://res.cloudinary.com/demo/image/twitter_name/BillClinton.jpg"
      />
    </Box>
  );
}

export default UserImage;
