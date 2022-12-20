import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { themeColor } from '../../../adminTheme';
import { setLogout } from '../../../redux/adminState';

const Div = styled.span`
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  font-weight: 500;
  color: white;
  background-color: ${themeColor};
  cursor: pointer;
`;
function Logout() {
  const dispatch = useDispatch();
  return <Div onClick={() => dispatch(setLogout())}>Logout</Div>;
}

export default Logout;
