/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';
import { RiHomeLine } from 'react-icons/ri';
import { HiOutlineUsers } from 'react-icons/hi';
import { BiTask } from 'react-icons/bi';
import { AiOutlinePieChart } from 'react-icons/ai';
import Logout from './Logout';
import AdminProfilePhoto from '../../assets/adminIcon.jpg';
import { darkThemeColor } from '../../adminTheme';
// import { Link } from 'react-router-dom';
// styles
const Container = styled.div`
  margin: 10px;
  width: 20%;
  height: 100% !important;
  border-radius: 2rem;
  background-color: #091322;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 100%;
    height: max-content !important;
  }
`;

const Avatar = styled.img`
  height: 7rem;
  border-radius: 6rem;
  margin-top: 20%;
`;
const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Admin = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0.8rem 0 0.5rem 0;
`;
const LinksContainer = styled.div`
  background-color: ${darkThemeColor};
  height: 100%;
  width: 100%;
  border-radius: 2rem;
`;

const Links = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  height: 60%;
  gap: 1rem;
`;

const Link = styled.li`
  margin-left: 25%;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  color: #e4e4e4;
  cursor: pointer;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
   margin-left:40%;
  }
  h3 {
    font-weight: 300;
  }
  svg {
    font-size: 1.1rem;
    margin-top: 3%;
  }
`;

function Sidebar() {
  return (
    <Container>
      <ProfileContainer>
        <Avatar src={AdminProfilePhoto} />
        <Admin>Admin</Admin>
        <Logout />
      </ProfileContainer>
      <LinksContainer>
        <Links>
          <Link>
            <RiHomeLine />
            <h3>Dashboard</h3>
          </Link>
          <Link>
            <HiOutlineUsers />
            <h3>Users</h3>
          </Link>
          <Link>
            <BiTask />
            <h3>Quiz</h3>
          </Link>
          <Link>
            <AiOutlinePieChart />
            <h3>Reports</h3>
          </Link>
        </Links>
      </LinksContainer>
    </Container>
  );
}

export default Sidebar;
