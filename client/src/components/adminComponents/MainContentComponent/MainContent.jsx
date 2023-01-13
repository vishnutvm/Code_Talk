import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import WishHeader from '../WelcomeComponent/wishHeader';

import QuizSection from '../QuizSectionHome/QuizSectionHome';
import ResentUsers from '../ResentUsersComponent/ResentUsers';
import Groth from '../GrothComponent/Groth';
import axios from '../../../utils/axios';
import { changePage } from '../../../redux/adminState';
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

function MainContent() {
  const [users, setusers] = useState('');
  const [today, setToday] = useState('');
  const [resentUsers, setresentUsers] = useState('');
  const [quizList, setQuizList] = useState([]);
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  const getUsers = async () => {
    await axios
      .get('/admin/getusersReport')
      .then((response) => {
        console.log(response);
        setusers(response.data.users);
        setToday(response.data.sorted);
        setresentUsers(
          response.data.users.length > 2
            ? response.data.users.slice(-2).reverse()
            : response.data.users
        );
        setTimeout(() => {
          setloading(false);
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getQuiz = async () => {
    const data = await (await axios.get('/quiz/getAllquiz'))?.data;
    setQuizList(data);
    console.log(data);
  };

  useEffect(() => {
    console.log(users);
    getUsers();
    getQuiz();
  }, []);

  return (
    <Container>
      <WishHeader />
      {loading ? (
        <div role="status" className="max-w-md animate-pulse m-auto">
          <img src="https://i.stack.imgur.com/hzk6C.gif" alt="" />
        </div>
      ) : (
        <SubContainer>
          <FirstSection>
            <FirstSectionCol1>
              <Groth users={users} today={today} />
              {/* <Info /> */}
            </FirstSectionCol1>
            <FirstSectionCol2>
              <QuizSection quizList={quizList} />
            </FirstSectionCol2>
          </FirstSection>
          <SecondSection>
            <SecondSectionCol1>
              <ResentUsersWrapper onClick={() => dispatch(changePage('users'))}>
                <TitleText>Recent Users</TitleText>
                <ResentUsers users={resentUsers} />
              </ResentUsersWrapper>
            </SecondSectionCol1>
          </SecondSection>
        </SubContainer>
      )}
    </Container>
  );
}

export default MainContent;
