/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import MainContent from '../../../components/adminComponents/MainContentComponent/MainContent';
import Sidebar from '../../../components/adminComponents/AdmnSideBarComponent/Sidebar';
import UserManagement from '../UserManagement/UserManagement';

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
  // set the page to show
  const page = useSelector((state) => state.admin.currentPage);

  return (
    <Container>
      <Sidebar />
      {page === 'dashbord' && <MainContent />}
      {page === 'users' && <UserManagement />}
    </Container>
  );
};

export default AdminHome;
