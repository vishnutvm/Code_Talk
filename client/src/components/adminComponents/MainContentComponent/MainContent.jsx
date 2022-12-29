import React from 'react';
import styled from 'styled-components';
import WishHeader from '../WelcomeComponent/wishHeader';
// Groth section mayuse in future
// import Groth from './Groth';
// import Info from '../InfoComponent/Info';
import QuizSection from '../QuizSectionHome/QuizSectionHome';
import ResentUsers from '../ResentUsersComponent/ResentUsers';
import Groth from '../GrothComponent/Groth';
// styles
const Container = styled.div`
  width: 75%;
  background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
  border-radius: 2rem;
  margin: 1rem 1rem 1rem 2rem;
  padding: 1rem;

  @media screen and (min-width: 320px) and (max-width: 1080px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 1rem 0 0 0;
  }
`;

const SubContainer = styled.div`
  margin: 0.5rem 0;
  /* height: 80%; */
  width: 100%;
  display: flex;
  margin: auto;
  flex-direction: column;
  gap: 3rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    height: 100%;
  }
`;
const FirstSection = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40%;
  gap: 3rem;
  width: 100%;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    align-items: center;
    height: max-content;
  }
`;
const FirstSectionCol1 = styled.div`
  display: flex;
  gap: 3rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
  }
`;

const FirstSectionCol2 = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 1rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    height: max-content;
    justify-content: center;
    align-items: center;
  }
`;

const TitleText = styled.h1`
  height: 20%;
  font-weight: 700;
  font-size: 16px;
`;

const SecondSection = styled.div`
  display: flex;
  gap: 2rem;
  height: 26vh;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    height: max-content;
    width: 100%;
  }
`;
const SecondSectionCol1 = styled.div`
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
`;
const ResentUsersWrapper = styled.div`
  height: 60%;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    height: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
  //
`;

// const SecondSectionCol2 = styled.div`
//   @media screen and (min-width: 320px) and (max-width: 1190px) {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//   }
// `;

function MainContent() {
  return (
    <Container>
      <WishHeader />
      <SubContainer>
        <FirstSection>
          <FirstSectionCol1>
            <Groth />
            {/* <Info /> */}
          </FirstSectionCol1>
          <FirstSectionCol2>
            <QuizSection />
          </FirstSectionCol2>
        </FirstSection>
        <SecondSection>
          <SecondSectionCol1>
            <ResentUsersWrapper>
              <TitleText>Recent Users</TitleText>
              <ResentUsers />
            </ResentUsersWrapper>
          </SecondSectionCol1>
        </SecondSection>
      </SubContainer>
    </Container>
  );
}

export default MainContent;
