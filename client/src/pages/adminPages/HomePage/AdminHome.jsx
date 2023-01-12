/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import MainContent from '../../../components/adminComponents/MainContentComponent/MainContent';
import Sidebar from '../../../components/adminComponents/AdmnSideBarComponent/Sidebar';
import UserManagement from '../UserManagement/UserManagement';
import QuizManagementPage from '../QuizManagement/QuizManagementPage';
import QuizAddingPage from '../QuizAddingPage/QuizAddingPage';
import ReportPage from '../ReportPage/ReportPage';

const Container = styled.div`
  display: flex;
  height: 99vh;
  background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
  border-radius: 2rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    /* margin:0 0 3rem 0; */
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
      {page === 'quiz' && <QuizManagementPage />}
      {page === 'quizadding' && <QuizAddingPage />}
      {page === 'report' && <ReportPage />}
    </Container>
  );
};

export default AdminHome;
