/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../FlexBetweenHelperComponent/FlexBetween';
import WidgetWrapper from '../WidgetWrapperHelperComponent/WindgetWrapper';

function QuizWidget() {
  const { palette } = useTheme();
  const { dark } = palette.neutral;
  const { main } = palette.neutral;
  const { medium } = palette.neutral;
  const navigate = useNavigate();
  return (
    <div className="div" onClick={() => navigate('/quiz')}>
      <WidgetWrapper>
        <FlexBetween>
          <Typography color={dark} variant="h5" fontWeight="500">
            Quiz
          </Typography>
        </FlexBetween>
        <img
          width="100%"
          height="auto"
          alt="advert"
          src="https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/06/09204138/Online-Test.jpg"
          style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
        />
        <FlexBetween>
          <Typography color={main}>Online Test</Typography>
        </FlexBetween>
        <Typography color={medium} m="0.5rem 0">
          Online quiz test based on various technologies.Attend the test and
          earn the badge ...
        </Typography>
      </WidgetWrapper>
    </div>
  );
}

export default QuizWidget;
