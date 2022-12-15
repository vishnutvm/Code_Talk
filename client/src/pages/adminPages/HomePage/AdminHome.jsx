/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';
import styled from 'styled-components';
import MainContent from '../../../components/adminComponents/MainContent';
import Sidebar from '../../../components/adminComponents/Sidebar';

const Container = styled.div`
  display: flex;
  height: 97vh;
  background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
  border-radius: 2rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
  }
`;

const AdminHome = () => {
  return (
    <Container>
      <Sidebar />
      <MainContent />
    </Container>
  );
};

export default AdminHome;
