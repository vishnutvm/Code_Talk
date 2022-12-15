import React from 'react';
import styled from 'styled-components';
import { themeColor } from '../../adminTheme';

const Div = styled.span`
  padding: 0.3rem 1rem;
  border-radius: 1rem;
  font-weight: 500;
  color: white;
  background-color: ${themeColor};
  cursor: pointer;
`;
function Logout() {
  return <Div>Logout</Div>;
}

export default Logout;
