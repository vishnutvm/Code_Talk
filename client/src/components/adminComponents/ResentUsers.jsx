import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';
// import ProjectImageone from '../../assets/Images/project1.jpeg';
import {
  cardShadow,
  hoverEffect,
} from '../../adminTheme';

const ResentUsersWrap = styled.div`
  width: 30rem;
  border-radius: 1rem;
  margin-top: 1rem;
  background-color: white;
  height: 100%;
  box-shadow: ${cardShadow};
  transition: 0.4s ease-in-out;
  display: flex;
  flex-direction: column;
  alight-item: center;
  justify-content: center;
  &:hover {
    box-shadow: ${hoverEffect};
  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CardContent = styled.div`
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    margin: 2rem 0;
  }
`;
const Users = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0.4rem;
  padding-top: 0.6rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    gap: 1rem;

    text-align: center;
  }
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  gap:1rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    width: 100%;
    text-align: center;
  }
`;

const Title = styled.h4`
  font-weight: 600;
  display
`;

const Active = styled.div`
  color: green;
`;
const Offline = styled.div`
  color: red;
`;

const Container = styled.div`
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 100%;
    flex-direction: column;
    gap: 0.6rem;
  }
`;

function ResentUsers() {
  return (
    <ResentUsersWrap>
      <CardContent>
        <Users>
          <Info>
            {/* <Avatar>
              <img src={AvatarImage} alt="" />
            </Avatar> */}
            <Avatar />

            <Title>Vishnu</Title>
          </Info>
          <Container>
            {/* <Badge content="Paid" paid /> */}
            <Active>Active</Active>
          </Container>
        </Users>
        <Users>
          <Info>
            <Avatar />
            {/* <Avatar>
              <img src={AvatarImage2} alt="" />
            </Avatar> */}

            <Title>John Philips</Title>
          </Info>
          <Container>
            {/* <Badge content="Late" late /> */}
            <Offline>Offline</Offline>
          </Container>
        </Users>
      </CardContent>
    </ResentUsersWrap>
  );
}

export default ResentUsers;
